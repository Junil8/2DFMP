const Crypto = require('crypto-js');
require('dotenv/config');

const salt_length = process.env.SALT_LENGTH || 6;

/**
 * @summary                         Create a random salt of given length
 * @param   {Number}    length      Length of the slat
 * @returns {String}                Returns the salt as a string
 */
const salt = function(){
    return Crypto.lib.WordArray.random(salt_length / 2).toString(Crypto.enc.Hex);
};

/**
 * @summary                         Hash with SHA256
 * @param   {String}    string      String to be hashed
 * @param   {String}    salt        Salt to use in hashing
 * @returns {Object}                Returns the hash { salt, cypher }
 */
const encrypt = function(string, salt) {
    let cypher = Crypto.HmacSHA256(string, salt).toString(Crypto.enc.Hex);

    console.log(cypher);

    return {
        salt: salt,
        cypher: cypher
    };
};

module.exports = {
    Encrypt: encrypt, 
    Salt: salt
};