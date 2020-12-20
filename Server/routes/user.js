const Express = require('express');
require('dotenv/config');

const { Salt, SHA256 } = require('../resources/hash');
const { IsEmail } = require('../resources/regex');
const { Authentication } = require('../middlewares/authentication');
const UserModel = require('../models/User');

const router = Express.Router();

router.get('/:username', async (request, response) => {
    try {
        let user = await UserModel.find({ username: request.params.username });
        response.status(200).json(user);
    } catch(error) {
        console.log(`Process ${process.pid}: ${error}`);
        response.status(500).json({error: `Internal Server Error.`});
    }
});

router.post('/', async (request, response) => {
    let hash = SHA256(request.body.password, Salt(process.env.SALT_LENGTH));

    let usernameExist = await UserModel.findOne({username: request.body.username});
    let emailExist = await UserModel.findOne({email_address: request.body.email_address});

    if (usernameExist) {
        response.status(409).json({error: `The username ${request.body.username} is already taken.`});
        return;
    }

    if (emailExist) {
        response.status(409).json({error: `The email ${request.body.email_address} is already in use.`});
        return;
    }

    if (!IsEmail(request.body.email_address)) {
        response.status(400).json({error: `The email is not valid.`});
        return;
    }

    const user = new UserModel({
        username: request.body.username,
        email_address: request.body.email_address,
        password: hash.cypher,
        password_salt: hash.salt
    });

    try {
        let data = await user.save();
        console.log(`Process ${process.pid}: Created user with username of ${data.username}`);
        response.status(201).json(data);
    } catch(error) {
        console.log(`Process ${process.pid}: ${error}`);
        response.status(500).json({error: `Internal Server Error.`});
    }
});

router.patch('/:username', Authentication, async (request, response) => {
    if (request.user.username === request.params.username) {
        try {
            if (request.body.password) {
                let hash = SHA256(request.body.password, Salt(process.env.SALT_LENGTH));
                request.body.password = hash.cypher;
                request.body.password_salt = hash.salt;
            }

            let updated = await UserModel.updateOne({ username: request.user.username }, { $set: request.body });
    
            if (updated.nModified >= 1)
                response.status(200).json({message: `User is updated.`});
            else 
                response.status(404).json({message: `User dos not exist.`});
        } catch(error) {
            console.log(`Process ${process.pid}: ${error}`);
            response.status(500).json({error: `Internal Server Error.`});
        }
    } else {
        response.status(403).json({error: `Forbidden.`});
    }
});

router.delete('/:username', Authentication, async (request, response) => {
    if (request.user.username === request.params.username) {
        try {
            let removed = await UserModel.remove({ username: request.user.username });
    
            if (removed.deletedCount >= 1)
                response.status(200).json({message: `User is deleted.`});
            else 
                response.status(404).json({message: `User dos not exist.`});
        } catch(error) {
            console.log(`Process ${process.pid}: ${error}`);
            response.status(500).json({error: `Internal Server Error.`});
        }
    } else {
        response.status(403).json({error: `Forbidden.`});
    }
});

module.exports = router;