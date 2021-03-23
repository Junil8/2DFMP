const { VerifyToken } = require('../resources/auth');
const UserModel = require('../models/User');

/**
 * Middleware used to validate if the request is legel.
 * If the request is invalid terminate the request and send an error message.
 * If the request is valid send it allonge.
 */
const authentication = async (request, response, next) => {
    let authorization = request.headers.authorization;

    if (authorization) {
        let token = VerifyToken(authorization.split(' ')[1]);

        let user = await UserModel.findOne({ username: token.username });

        if (user) {
            request.user = user;
            next();
        } else {
            return response.status(403).json({error: { authentication: `Forbidden.`}});
        }
    } else {
        response.status(401).json({error: { authentication: `Unauthorized.`}});
    }
};

module.exports = {
    Authentication: authentication
}