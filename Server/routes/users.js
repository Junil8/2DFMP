const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

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