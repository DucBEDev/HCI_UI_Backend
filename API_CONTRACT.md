# Alarm API Contract

Base URL: `/api/alarms/:userId`

## 1) Get All Alarm
- Method: `GET`
- Endpoint: `/api/alarms/:userId`
- Description: Lay danh sach alarm cua 1 user.

Success response:
- Status: `200`
- Body: danh sach alarm cua user.

Error responses:
- `404`: user khong ton tai.

## 2) Create Alarm
- Method: `POST`
- Endpoint: `/api/alarms/:userId`
- Description: Tao moi alarm cho user trong path.

Request body:
```json
{
  "time": "07:00:00",
  "label": "Wake up",
  "repeat": "once",
  "repeat_days": "Mon-Fri",
  "enabled": true
}
```

Ghi chu:
- Co the gui them `user_id` trong body, nhung neu co thi phai trung voi `:userId`.

Success response:
- Status: `201`
- Body: alarm object vua tao.

Error responses:
- `400`: thieu `time`, `label` hoac `user_id` body khong khop `:userId`.
- `404`: user khong ton tai.

## 3) Update Alarm Status
- Method: `PATCH`
- Endpoint: `/api/alarms/:userId/:id/status`
- Description: Bat/tat alarm cua dung user.

Request body:
```json
{
  "enabled": false
}
```

Success response:
- Status: `200`
- Body: alarm object sau khi cap nhat.

Error responses:
- `400`: `enabled` khong phai boolean.
- `404`: alarm khong ton tai hoac khong thuoc user.

## 4) Delete Alarm
- Method: `DELETE`
- Endpoint: `/api/alarms/:userId/:id`
- Description: Xoa alarm cua dung user.

Success response:
- Status: `200`
- Body:
```json
{
  "message": "Alarm deleted successfully"
}
```

Error responses:
- `404`: alarm khong ton tai hoac khong thuoc user.
