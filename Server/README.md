# Server



## Running server

Run `npm start` for starting server. Navigate to `http://localhost:8080/`.

## API

**AUTHENTICATE**

POST `http://localhost:8080/api/token/`
JSON `{username: string, password: string}`
RETURN `{token: string}`
ERROR `{error: string}`

**ENCRYPT**

POST `http://localhost:8080/api/encrypt/`
JSON `{string: string, salt?: string}`
RETURN `{cypher: string, salt: string}`
ERROR `{error: string}`

**USER AVAILABLE**

POST `http://localhost:8080/api/user/available/`
JSON `{email_address?: string, username?: string}`
RETURN `{available: {email_address?: boolean, username?: string}}`
ERROR `{error: string}` | `{error: {email_address?: string, username?: string}}`

**CREATE USER**

POST `http://localhost:8080/api/user/`
JSON `{email_address: string, username: string, password: string}`
RETURN `{_id: string, email_address: string, username: string, password: string, password_salt: string, created_on: date, last_sign_on: date}`
ERROR `{error: string}` | `{error: {email_address?: string, username?: string, password?: string }}`

**GET USER**

GET `http://localhost:8080/api/user/:username`
ERROR `{error: string}`
Require Authentication.

**UPDATE USER**

PATCH `http://localhost:8080/api/user/:username`
JSON `{newUsername?: string, newPassword?: string}`
RETURN `{updated: boolean}`
ERROR `{error: string}` | `{error: {username?: string, password?: string }}`
Require Authentication.

**DELETE USER**

DELETE `http://localhost:8080/api/user/:username`
RETURN `{deleted: boolean}`
ERROR `{error: string}`
Require Authentication.