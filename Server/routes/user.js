const express = require('express');
const router = express.Router();
const hash = require('../resources/hash');
const validate = require('../resources/validate');
const authenticate = require('../middlewares/authenticate');
const UserModel = require('../models/User');
require('dotenv/config');

const validateEmail = validate.email;
const salt = hash.salt;
const sha256 = hash.sha256;

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
    let hash = sha256(request.body.password, salt(process.env.SALT_LENGTH));

    let usernameExist = await UserModel.findOne({username: request.body.username});
    let emailExist = await UserModel.findOne({email_address: request.body.email_address});
    let emailProber = validateEmail(request.body.email_address);

    if (usernameExist) {
        response.status(409).json({error: `The username ${request.body.username} is already taken.`});
        return;
    }

    if (emailExist) {
        response.status(409).json({error: `The email ${request.body.email_address} is already in use.`});
        return;
    }

    if (!emailProber) {
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

router.patch('/:username', authenticate, async (request, response) => {
    if (request.user.username === request.params.username) {
        try {
            if (request.body.password) {
                let hash = sha256(request.body.password, salt(process.env.SALT_LENGTH));
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

router.delete('/:username', authenticate, async (request, response) => {
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