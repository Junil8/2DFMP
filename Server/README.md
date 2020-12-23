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
JSON `{username?: string, email_address?: string}`
ERROR `{error: string}` | `{error: { username?: string, email_address?: string }}`

POST `http://localhost:8080/api/user/`
JSON `{username: string, email_address: string, password: string}`

PATCH `http://localhost:8080/api/user/:username`
JSON `{newUsername?: string, newPassword?: string}`
Require Authentication.

DELETE `http://localhost:8080/api/user/:username`
Require Authentication.