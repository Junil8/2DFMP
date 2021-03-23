const Express = require('express');
const RedisAdapter = require('socket.io-redis');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const { SocketEventHandler } = require('./event_handlers/socketEventHandler');

// Setup application
const app = Express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socketEventHandler = new SocketEventHandler();

// Connect database
Mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {});

// Import routes
const userRoute = require('./routes/user');
const tokenRoute = require('./routes/token');

// Apply middlewares
app.use(BodyParser.json());
app.use(cors());

// Apply routes
app.use('/', Express.static('public'));
app.use('/api/user', userRoute);
app.use('/api/token', tokenRoute);

// Connect IO to redis server
io.adapter(RedisAdapter({ host: process.env.REDIS_HOST || 'localhost', port: process.env.REDIS_PORT || 6379 }));

// Apply handles to IO
io.on('connection', socket => socketEventHandler.handleConnect(socket));

// Apply port to listen to
http.listen(process.env.PORT || 8080, () => {});