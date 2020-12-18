const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

console.log(`Process ${process.pid}: Starting Web service`);

// Connect database
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(`Process ${process.pid}: Connected to database`);
});

// Import routes
const usersRoute = require('../routes/users');
const userRoute = require('../routes/user');
const authRoute = require('../routes/auth');

// Apply middlewares
app.use(bodyParser.json());

// Apply routes
app.use('/', express.static('public'));
app.use('/api/users', usersRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

console.log(`Process ${process.pid}: Listening on port ${process.env.WEB_PORT}`);
app.listen(process.env.WEB_PORT);