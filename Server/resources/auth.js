const JWT = require('jsonwebtoken');
require('dotenv/config');

const { IsObjectEmpty } = require('./regex');

/**
 * @summary                             Create a token with given data
 * @param   {String}    username        Name of the user
 * @param   {String}    email_address   Email-address of the user
 * @returns {String}                    Returns a token
 */
const signToken = (username, email_address) => {
    let token = JWT.sign({ username: username, email_address: email_address }, process.env.ACCESS_TOKEN);
    return token;
};

/**
 * @summary                                 Verify the given token
 * @param   {String}            token       Token
 * @returns {Object|Boolean}                Returns user {username, email_address} if valid, else false
 */
const verifyToken = (token) => {
    let user = {};

    JWT.verify(token, process.env.ACCESS_TOKEN, (error, data) => { user = data; });

    if (!IsObjectEmpty(user)) return user;
    else return false;
};

module.exports = {
    SignToken: signToken,
    VerifyToken: verifyToken
};