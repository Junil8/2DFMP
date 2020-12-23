# Server



## Running server

Run `npm start` for starting server. Navigate to `http://localhost:8080/`.

## API

POST `http://localhost:8080/api/token/`
JSON `{username: string, password: string}`
RETURN `{token: string}`
ERROR `{error: string}`

POST `http://localhost:8080/api/encrypt/`
JSON `{string: string, salt?: string}`
RETURN `{cypher: string, salt: string}`
ERROR `{error: string}`

GET `http://localhost:8080/api/user/:username`
Require Authentication.
ERROR `{error: string}`

POST `http://localhost:8080/api/user/available/`
JSON `{email_address?: string, username?: string}`
RETURN `{available: {email_address?: boolean, username?: string}}`
ERROR `{error: string}` | `{error: {email_address?: string, username?: string}}`

POST `http://localhost:8080/api/user/`
JSON `{email_address: string, username: string, password: string}`
RETURN `{_id: string, email_address: string, username: string, password: string, password_salt: string, created_on: date, last_sign_on: date}`
ERROR `{error: string}` | `{error: {email_address?: string, username?: string, password?: string }}`

PATCH `http://localhost:8080/api/user/:username`
JSON `{newUsername?: string, newPassword?: string}`
Require Authentication.
RETURN `{updated: boolean}`
ERROR `{error: string}` | `{error: {username?: string, password?: string }}`

DELETE `http://localhost:8080/api/user/:username`
Require Authentication.
RETURN `{deleted: boolean}`
ERROR `{error: string}`