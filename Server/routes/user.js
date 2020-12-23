const Express = require('express');
require('dotenv/config');

const { Salt, SHA256 } = require('../resources/hash');
const { IsEmail, GoodPassword, GoodUsername } = require('../resources/regex');
const { Authentication } = require('../middlewares/authentication');
const UserModel = require('../models/User');

const router = Express.Router();

router.get('/:username', Authentication, async (request, response) => {
    if (request.user.username === request.params.username || request.user.role === 'admin') {
		try {
			let user = await UserModel.findOne({ username: request.params.username });
			response.status(200).json(user);
		} catch(error) {
			console.log(`Process ${process.pid} - ${error}`);
			response.status(500).json({error: `Internal Server Error.`});
		}
	} else {
        response.status(403).json({error: `Forbidden.`});
    }
});

router.post('/available', async (request, response) => {
    let error = {}, hasError = false;

    if (request.body.email_address && !IsEmail(request.body.email_address)) { error.email_address = `The email is not valid.`; hasError = true; }
    if (request.body.username && !GoodUsername(request.body.username)) { error.username = `The username must contain at least 4 characters long.`; hasError = true; }
 
    if (hasError) return response.status(200).json({error: error});

    try {
        let available = {};

        if (request.body.email_address) {
            let emailExist = await UserModel.findOne({email_address: request.body.email_address});
            if (emailExist) available.email_address = false;
            else available.email_address = true;
        }

        if (request.body.username) {
            let usernameExist = await UserModel.findOne({username: request.body.username});
            if (usernameExist) available.username = false;
            else available.username = true;
        }

        return response.status(200).json({available: available});
    } catch(error) {
        console.log(`Process ${process.pid} - ${error}`);
        response.status(500).json({error: `Internal Server Error.`});
    }
});

router.post('/', async (request, response) => {
    let error = {}, hasError = false;

    if (!IsEmail(request.body.email_address)) { error.email_address = `The email is not valid.`; hasError = true; }
    if (!GoodUsername(request.body.username)) { error.username = `The username must contain at least 4 characters long.`; hasError = true; }
    if (!GoodPassword(request.body.password)) { error.password = `The password must contain 1 lowercase, 1 uppercase, 1 number and be at least 8 characters long.`; hasError = true; }

    if (hasError) return response.status(200).json({error: error});

    try {
        let emailExist = await UserModel.findOne({email_address: request.body.email_address});
        let usernameExist = await UserModel.findOne({username: request.body.username});
    
        if (emailExist) { error.email_address = `The email ${request.body.email_address} is already in use.`; hasError = true; }
        if (usernameExist) { error.username = `The username ${request.body.username} is already taken.`; hasError = true; }
    
        if (hasError) return response.status(200).json({error: error});

        let hash = SHA256(request.body.password, Salt(process.env.SALT_LENGTH));
    
        const userModel = new UserModel({
            username: request.body.username,
            email_address: request.body.email_address,
            password: hash.cypher,
            password_salt: hash.salt
        });

        let user = await userModel.save();

        console.log(`Process ${process.pid} - Created user with username of ${user.username}`);

        response.status(201).json(user);
    } catch(error) {
        console.log(`Process ${process.pid} - ${error}`);

        response.status(500).json({error: `Internal Server Error.`});
    }
});

router.patch('/:username', Authentication, async (request, response) => {
    if (request.user.username !== request.params.username && request.user.role !== 'admin') {
        return response.status(403).json({error: `Forbidden.`});
    }

    let userExist = await UserModel.findOne({username: request.params.username});

    if (!userExist) return response.status(200).json({ error: `User does not exist.` });

    try {
        let values = {};
        
        if (request.body.newUsername) values.username = request.body.newUsername;
        if (request.body.newPassword) {
            let hash = SHA256(request.body.newPassword, Salt(process.env.SALT_LENGTH));
            values.password = hash.cypher;
            values.password_salt = hash.salt;
        }

        await UserModel.updateOne({ username: request.params.username }, { $set: values });

        return response.status(200).json({ updated: true });
    } catch(error) {
        console.log(`Process ${process.pid} - ${error}`);

        return response.status(500).json({error: `Internal Server Error.`});
    }
});

router.delete('/:username', Authentication, async (request, response) => {
    if (request.user.username !== request.params.username && request.user.role !== 'admin') {
        return response.status(403).json({error: `Forbidden.`});
    }

    let userExist = await UserModel.findOne({username: request.params.username});

    if (!userExist) return response.status(200).json({ error: `User does not exist.` });
    
    try {
        await UserModel.deleteOne({ username: request.params.username });

        return response.status(200).json({ deleted: true });
    } catch(error) {
        console.log(`Process ${process.pid} - ${error}`);
        response.status(500).json({error: `Internal Server Error.`});
    }
});

module.exports = router;