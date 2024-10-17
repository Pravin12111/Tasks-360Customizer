# Task 2: REST API Design

## Endpoint
- URL: `/api/users/profile`
- HTTP Method: `GET`

## Request Parameters
- `username` (required)
- Optional filters: `age`, `location`, `active_status`.

## Response Structure
```json
{
  "username": "string",
  "email": "string",
  "age": "number",
  "location": "string",
  "active_status": "boolean"
}
