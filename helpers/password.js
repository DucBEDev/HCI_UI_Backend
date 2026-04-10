const crypto = require("crypto");

function toBase64Buffer(value) {
    if (!value) {
        return Buffer.alloc(0);
    }

    const normalized = String(value).replace(/-/g, "+").replace(/_/g, "/");
    const paddingLength = (4 - (normalized.length % 4)) % 4;
    const padded = normalized + "=".repeat(paddingLength);
    return Buffer.from(padded, "base64");
}

function toDigestBuffer(value) {
    if (!value) {
        return Buffer.alloc(0);
    }

    const normalized = String(value).trim();
    if (/^[a-f0-9]+$/i.test(normalized) && normalized.length % 2 === 0) {
        return Buffer.from(normalized, "hex");
    }

    return toBase64Buffer(normalized);
}

function safeEqual(a, b) {
    if (!a || !b || a.length !== b.length) {
        return false;
    }
    return crypto.timingSafeEqual(a, b);
}

function verifyWerkzeugScrypt(password, methodPart, salt, encodedHash) {
    const params = methodPart.split(":");
    if (params.length !== 4) {
        return false;
    }

    const n = Number(params[1]);
    const r = Number(params[2]);
    const p = Number(params[3]);
    if (!Number.isFinite(n) || !Number.isFinite(r) || !Number.isFinite(p)) {
        return false;
    }

    const expected = toDigestBuffer(encodedHash);
    if (!expected.length) {
        return false;
    }

    const derived = crypto.scryptSync(password, salt, expected.length, {
        N: n,
        r,
        p,
        maxmem: 132 * n * r * p,
    });

    return safeEqual(derived, expected);
}

function verifyWerkzeugPbkdf2(password, methodPart, salt, encodedHash) {
    const params = methodPart.split(":");
    if (params.length !== 3) {
        return false;
    }

    const digest = params[1];
    const iterations = Number(params[2]);
    if (!Number.isFinite(iterations)) {
        return false;
    }

    const expected = toDigestBuffer(encodedHash);
    if (!expected.length) {
        return false;
    }

    const derived = crypto.pbkdf2Sync(password, salt, iterations, expected.length, digest);
    return safeEqual(derived, expected);
}

function verifyWerkzeugPasswordHash(rawPassword, storedHash) {
    if (!rawPassword || !storedHash || typeof storedHash !== "string") {
        return false;
    }

    const parts = storedHash.split("$");
    if (parts.length < 3) {
        return false;
    }

    const [methodPart, salt, encodedHash] = parts;

    if (methodPart.startsWith("scrypt:")) {
        return verifyWerkzeugScrypt(rawPassword, methodPart, salt, encodedHash);
    }

    if (methodPart.startsWith("pbkdf2:")) {
        return verifyWerkzeugPbkdf2(rawPassword, methodPart, salt, encodedHash);
    }

    return false;
}

module.exports = {
    verifyWerkzeugPasswordHash,
};
