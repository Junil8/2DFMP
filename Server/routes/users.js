const Express = require('express');
require('dotenv/config');

const UserModel = require('../models/User');

const router = Express.Router();

router.get('/', async (request, response) => {
    try {
        let users = await UserModel.find();
        response.status(200).json(users);
    } catch(error) {
        console.log(`Process ${process.pid}: ${error}`);
        response.status(500).json({error: `Internal Server Error.`});
    }
});

module.exports = router;