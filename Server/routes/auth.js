const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const hash = require('../resources/hash');
const UserModel = require('../models/User');
require('dotenv/config');

const sha256 = hash.sha256;

router.post('/', async (request, response) => {
    let user = await UserModel.findOne({ username: request.body.username });
    let hash = sha256(request.body.password, user.password_salt);

    if (hash.cypher === user.password) {
        let token = jwt.sign({ username: user.username, email_address: user.email_address }, process.env.ACCESS_TOKEN);

        await UserModel.updateOne({ username: user.username }, { $set: { last_sign_on: Date.now() } });
    
        response.status(200).json({token: token});
    } else {
        response.status(401).json(`Unauthorized.`);
    }
});

module.exports = router;