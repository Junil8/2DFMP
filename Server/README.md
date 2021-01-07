# Server

This server is running as a cluster managed by package [Cluster](https://www.npmjs.com/package/cluster).  
It uses [Express](https://www.npmjs.com/package/express) to manage an API and serve a website build by [Angular](https://www.npmjs.com/package/@angular/cli).  
It also uses [Socket.io](https://www.npmjs.com/package/socket.io) to manage the multiplayer server for the game.  
For authentication it uses [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).

### Install Dependencies

Run `npm install` to install dependencies.

### Setup Environment

Make an environment file with name of `.env`.  
In environment variables add lines.  
```
MONGO_DB_URI=mongodb+srv://<user>:<password>@cluster0.tbnrr.mongodb.net/<dbname>?retryWrites=true&w=majority
ACCESS_TOKEN=<secret_key>
```  
`<user>` the database user.  
`<password>` the database user password.  
`<dbname>` the database name.  
`<secret_key>` the given secret key to use in JSON Web Token.

### Run Server

Run `npm start` for starting server.  



## Redis Server

To make [Socket.io](https://www.npmjs.com/package/socket.io) run with [Cluster](https://www.npmjs.com/package/cluster), will we be using [ioredis](https://www.npmjs.com/package/ioredis) and [socket.io-redis](https://www.npmjs.com/package/socket.io-redis) to handle the server cache.  
This is needed becourse when we fork the service out in a cluster, then they will need a commen place to store there cache.

### Custom setup of redis server

In environment variables add lines.  
```
REDIS_HOST=<ip>
REDIS_PORT=<port>
```  
`<ip>` the IP of the redis server. Default `localhost`.  
`<port>` the given port of the redis server. Default `6379`.  



## Encryption Settings

The passwords needs to be encrypted on the database for this we use [crypto-js](https://www.npmjs.com/package/crypto-js).  
Normaly configure all there is needed to make a good encryption but it can be made to use a definded length for the salt.

### Custom setup of encryption

In environment variables add lines.  
```
SALT_LENGTH=<length>
```  
`<length>` the length of a random salt. Default `6`.  



## Cluster Service

The [Cluster](https://www.npmjs.com/package/cluster) package will fork the services of the server.  
For this it needs to know how many threads are possible. Under normal configuration will it spawn as many workers as there are threads in the hardware but it kan be configured to only use a maximum amount.

### Custom setup of cluster service

In environment variables add lines.  
```
WORKERS=<amount>
```  
`<amount>` the prefered amount of workers. Default to max possible workers.  



## Web Service

The server will normaly use port `8080` to run on but it can be set to use an other port.

### Custom setup of web service

In environment variables add lines.  
```
PORT=<port>
```  
`<port>` the port which the server should use. Default `8080`.  



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
