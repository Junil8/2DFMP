const Express = require('express');
require('dotenv/config');

const { SHA256, Salt } = require('../resources/hash');

const router = Express.Router();

router.post('/SHA256', async (request, response) => {
    let salt = request.body.salt;
    let hash;

    if (salt)
        hash = SHA256(request.body.string, salt);
    else
        hash = SHA256(request.body.string, Salt());

    return response.status(201).json(hash);
});

module.exports = router;