# Alarm + Timer API Contract

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

## Timer APIs

Base URL: `/api/timers/:userId`

## 5) Get All Timers
- Method: `GET`
- Endpoint: `/api/timers/:userId`
- Description: Lay danh sach timer cua 1 user.

Success response:
- Status: `200`
- Body: danh sach timer cua user.

Error responses:
- `404`: user khong ton tai.

## 6) Create Timer
- Method: `POST`
- Endpoint: `/api/timers/:userId`
- Description: Tao timer khi user bam Start.

Request body:
```json
{
  "label": "an com",
  "duration_seconds": 120,
  "started_at": "2026-04-04T15:30:00.000Z",
  "active": true
}
```

Ghi chu:
- Co the gui them `user_id` trong body, nhung neu co thi phai trung voi `:userId`.
- `started_at` co the bo qua, server se tu gan thoi gian hien tai.

Success response:
- Status: `201`
- Body: timer object vua tao.

Error responses:
- `400`: thieu `label`, `duration_seconds` hoac gia tri khong hop le.
- `404`: user khong ton tai.

## 7) Update Timer Status
- Method: `PATCH`
- Endpoint: `/api/timers/:userId/:id/status`
- Description: Cap nhat trang thai timer (vi du timer chay xong -> `active=false`).

Request body:
```json
{
  "active": false
}
```

Success response:
- Status: `200`
- Body: timer object sau khi cap nhat.

Error responses:
- `400`: `active` khong phai boolean.
- `404`: timer khong ton tai hoac khong thuoc user.

## 8) Get Timer Detail
- Method: `GET`
- Endpoint: `/api/timers/:userId/:id`
- Description: Lay chi tiet 1 timer cua dung user.

Success response:
- Status: `200`
- Body: timer object.

Error responses:
- `404`: timer khong ton tai hoac khong thuoc user.

## Notes & Lists APIs

Base URL: `/api/lists/:userId`

## 9) Get All Lists (include notes)
- Method: `GET`
- Endpoint: `/api/lists/:userId`
- Description: Lay tat ca list cua user, moi list tra kem toan bo note con (`items`) de render UI notes & lists.

Success response:
- Status: `200`
- Body: danh sach list, moi list co mang `items`.

Error responses:
- `404`: user khong ton tai.

## 10) Create List
- Method: `POST`
- Endpoint: `/api/lists/:userId`
- Description: Tao moi 1 list cua user.

Request body:
```json
{
  "list_name": "Ghi chu"
}
```

Ghi chu:
- Co the gui them `user_id` trong body, nhung neu co thi phai trung voi `:userId`.

Success response:
- Status: `201`
- Body: list object vua tao.

Error responses:
- `400`: thieu `list_name` hoac `user_id` body khong khop `:userId`.
- `404`: user khong ton tai.

## 11) Delete List
- Method: `DELETE`
- Endpoint: `/api/lists/:userId/:listId`
- Description: Xoa 1 list cua dung user.

Success response:
- Status: `200`
- Body:
```json
{
  "message": "List deleted successfully"
}
```

Error responses:
- `404`: list khong ton tai hoac khong thuoc user.

## 12) Add Note
- Method: `POST`
- Endpoint: `/api/lists/:userId/:listId/notes`
- Description: Them 1 note vao list cua dung user.

Request body:
```json
{
  "content": "Mat khau WiFi: aura2024",
  "completed": false
}
```

Success response:
- Status: `201`
- Body: note object vua tao.

Error responses:
- `400`: thieu `content`.
- `404`: list khong ton tai hoac khong thuoc user.

## 13) Update Note Completed
- Method: `PATCH`
- Endpoint: `/api/lists/:userId/:listId/notes/:itemId/completed`
- Description: Cap nhat trang thai `completed` cua note.

Request body:
```json
{
  "completed": true
}
```

Success response:
- Status: `200`
- Body: note object sau khi cap nhat.

Error responses:
- `400`: `completed` khong phai boolean.
- `404`: list hoac note khong ton tai trong user/list tuong ung.

## 14) Delete Note
- Method: `DELETE`
- Endpoint: `/api/lists/:userId/:listId/notes/:itemId`
- Description: Xoa note trong list cua dung user.

Success response:
- Status: `200`
- Body:
```json
{
  "message": "Note deleted successfully"
}
```

Error responses:
- `404`: list hoac note khong ton tai trong user/list tuong ung.
