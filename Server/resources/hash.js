const crypto = require('crypto');

const salt = function(length){
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

const sha256 = function(string, salt) {
    let hash = crypto.createHmac('sha256', salt);

    hash.update(string);
    let cypher = hash.digest('hex');

    return {
        salt: salt,
        cypher: cypher
    };
};

module.exports = {
    sha256: sha256, 
    salt: salt
};