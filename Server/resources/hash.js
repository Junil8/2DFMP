const Crypto = require('crypto');
require('dotenv/config');

const salt_length = process.env.SALT_LENGTH || 6;
const encrypt_algorithm = process.env.ENCRYPT_ALGORITHM || 'sha256';

/**
 * @summary                         Create a random salt of given length
 * @param   {Number}    length      Length of the slat
 * @returns {String}                Returns the salt as a string
 */
const salt = function(){
    return Crypto.randomBytes(Math.ceil(salt_length / 2)).toString('hex').slice(0, salt_length);
};

/**
 * @summary                         Hash with SHA256
 * @param   {String}    string      String to be hashed
 * @param   {String}    salt        Salt to use in hashing
 * @returns {Object}                Returns the hash { salt, cypher }
 */
const encrypt = function(string, salt) {
    let hash = Crypto.createHmac(encrypt_algorithm, salt);

    hash.update(string);
    let cypher = hash.digest('hex');

    return {
        salt: salt,
        cypher: cypher
    };
};

module.exports = {
    Encrypt: encrypt, 
    Salt: salt
};