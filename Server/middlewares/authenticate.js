const jwt = require('jsonwebtoken');
require('dotenv/config');

const authenticate = (request, response, next) => {
    let auth = request.headers.authorization;

    if (auth) {
        let token = auth.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
            if (error) {
                response.status(403).json({error: `Forbidden.`});
                return;
            }

            request.user = user;
            next();
        });
    } else {
        response.status(401).json({error: `Unauthorized.`});
    }
};

module.exports = authenticate;