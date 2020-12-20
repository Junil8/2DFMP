const Express = require('express');
require('dotenv/config');

const { SignToken } = require('../resources/auth');
const { SHA256 } = require('../resources/hash');
const UserModel = require('../models/User');

const router = Express.Router();

router.post('/', async (request, response) => {
    let user = await UserModel.findOne({ username: request.body.username });
    let hash = SHA256(request.body.password, user.password_salt);

    if (hash.cypher === user.password) {
        let token = SignToken(user.username, user.email_address);

        await UserModel.updateOne({ username: user.username }, { $set: { last_sign_on: Date.now() } });
    
        response.status(200).json({token: token});
    } else {
        response.status(401).json(`Unauthorized.`);
    }
});

module.exports = router;