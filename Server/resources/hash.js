const Crypto = require('crypto');

/**
 * @summary                         Create a random salt of given length
 * @param   {Number}    length      Length of the slat
 * @returns {String}                Returns the salt as a string
 */
const salt = function(length){
    return Crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

/**
 * @summary                         Hash with SHA256
 * @param   {String}    string      String to be hashed
 * @param   {String}    salt        Salt to use in hashing
 * @returns {Object}                Returns the hash { salt, cypher }
 */
const sha256 = function(string, salt) {
    let hash = Crypto.createHmac('sha256', salt);

    hash.update(string);
    let cypher = hash.digest('hex');

    return {
        salt: salt,
        cypher: cypher
    };
};

module.exports = {
    SHA256: sha256, 
    Salt: salt
};