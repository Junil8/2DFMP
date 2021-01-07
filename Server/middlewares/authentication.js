const { VerifyToken } = require('../resources/auth');

const authentication = (request, response, next) => {
    let authorization = request.headers.authorization;

    if (authorization) {
        let token = authorization.split(' ')[1];
        let user = VerifyToken(token);

        if (user) {
            request.user = user;
            next();
        } else {
            return response.status(403).json({error: `Forbidden.`});
        }
    } else {
        response.status(401).json({error: `Unauthorized.`});
    }
};

module.exports = {
    Authentication: authentication
}