# Server



## Running server

Run `npm start` for starting server. Navigate to `http://localhost:8080/`.

## API

GET `http://localhost:8080/api/user/:username`
Require Authentication.

POST `http://localhost:8080/api/user/available/`
JSON `{username?: string, email_address?: string}`

POST `http://localhost:8080/api/user/`
JSON `{username: string, email_address: string, password: string}`

PATCH `http://localhost:8080/api/user/:username`
JSON `{newUsername?: string, newPassword?: string}`
Require Authentication.

DELETE `http://localhost:8080/api/user/:username`
Require Authentication.