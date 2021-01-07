const Express = require('express');
require('dotenv/config');

const { Encrypt, Salt } = require('../resources/hash');

const router = Express.Router();

router.post('/', async (request, response) => {
    let salt = request.body.salt;
    let hash;

    if (salt)
        hash = Encrypt(request.body.string, salt);
    else
        hash = Encrypt(request.body.string, Salt());

    return response.status(201).json(hash);
});

module.exports = router;