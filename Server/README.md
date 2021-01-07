# Server

This server is running as a cluster managed by package [Cluster](https://www.npmjs.com/package/cluster).  
It uses [Express](https://www.npmjs.com/package/express) to manage an API and serve a website build by [Angular](https://www.npmjs.com/package/@angular/cli).  
It also uses [Socket.io](https://www.npmjs.com/package/socket.io) to manage the multiplayer server for the game.

Run `npm install` to install dependencies.

Make a copy of `.env.template` and rename to `.env`.  
```
MONGO_DB_URI=mongodb+srv://<user>:<password>@cluster0.tbnrr.mongodb.net/<dbname>?retryWrites=true&w=majority
WORKERS=2
REDIS_HOST=localhost
REDIS_PORT=6379
SALT_LENGTH=6
ACCESS_TOKEN=<secret_key>
PORT=8080
```  
Change `<user>`, `<password>`, `<dbname>` and `<secret_key>`.

Run `npm start` for starting server.

## Redis server

To make [Socket.io](https://www.npmjs.com/package/socket.io) run with [Cluster](https://www.npmjs.com/package/cluster), will we be using [ioredis](https://www.npmjs.com/package/ioredis) and [socket.io-redis](https://www.npmjs.com/package/socket.io-redis) to handle the server cache.  
This is needed becourse when we fork the service out in a cluster, then they will need a commen place to store there cache.

## API Service

| Method | Type | Path | JSON | RETURN | ERROR | Authentication |
|:------:|:----:| ---- | ---- | ------ | ----- |:--------------:|
|Authenticate|POST|`/api/token/`|username<br>password|token||False|
|Encrypt|POST|`/api/encrypt/`|string<br>salt?|cypher<br>salt||False|
|User Available|POST|`/api/user/available/`|email_address?<br>username?|available: {<br>&nbsp;&nbsp;&nbsp;&nbsp;email_address?<br>&nbsp;&nbsp;&nbsp;&nbsp;username?<br>}|error: {<br>&nbsp;&nbsp;&nbsp;&nbsp;email_address?<br>&nbsp;&nbsp;&nbsp;&nbsp;username?<br>}|False|
|Get User|GET|`/api/user/:username`||_id<br>email_address<br>username<br>password<br>password_salt<br>created_on<br>last_sign_on||True|
|Create User|POST|`/api/user/`|email_address<br>username<br>password|_id<br>email_address<br>username<br>password<br>password_salt<br>created_on<br>last_sign_on|error: {<br>&nbsp;&nbsp;&nbsp;&nbsp;email_address?<br>&nbsp;&nbsp;&nbsp;&nbsp;username?<br>&nbsp;&nbsp;&nbsp;&nbsp;password?<br>}|False|
|Update User|PATCH|`/api/user/:username`|newUsername?<br>newPassword?|updated|error: {<br>&nbsp;&nbsp;&nbsp;&nbsp;username?<br>&nbsp;&nbsp;&nbsp;&nbsp;password?<br>}|True|
|Delete User|DELETE|`/api/user/:username`||deleted||True|
