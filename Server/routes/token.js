const Express = require('express');
require('dotenv/config');

const { SignToken } = require('../resources/auth');
const { Encrypt } = require('../resources/hash');
const UserModel = require('../models/User');

const router = Express.Router();

router.post('/', async (request, response) => {
    let user = await UserModel.findOne({ email_address: request.body.email_address });

    if (user) {
        let hash = Encrypt(request.body.password, user.password_salt);
    
        if (hash.cypher === user.password) {
            let token = SignToken(user.username, user.email_address);

            await UserModel.updateOne({ email_address: user.email_address }, { $set: { last_sign_on: new Date().toISOString() } });
        
            return response.status(200).json({token: token});
        }
    }
    
    return response.status(401).json({error: `Unauthorized.`});
});

module.exports = router;