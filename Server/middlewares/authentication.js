const { VerifyToken } = require('../resources/auth');
const UserModel = require('../models/User');

const authentication = async (request, response, next) => {
    let authorization = request.headers.authorization;

    if (authorization) {
        let token = VerifyToken(authorization.split(' ')[1]);

        let user = await UserModel.findOne({ username: token.username });

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