/**
 * @summary                         Check if given string is a valid email-address
 * @param   {String}    string      String to be validated
 * @returns {Boolean}               Returns true if valid, else false
 */
const isEmail = (string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(String(string).toLowerCase());
};

/**
 * @summary                         Check if given string is a valid username
 * @param   {String}    string      String to be validated
 * @returns {Boolean}               Returns true if valid, else false
 */
const goodUsername = (string) => {
    const regex = /^(?=.{4,})/;

    return regex.test(String(string));
}

/**
 * @summary                         Check if given string is a valid password
 * @param   {String}    string      String to be validated
 * @returns {Boolean}               Returns true if valid, else false
 */
const goodPassword = (string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    return regex.test(String(string));
}

/**
 * @summary                         Check if given object is empty
 * @param   {Object}    object      Object to be validated
 * @returns {Boolean}               Returns true if valid, else false
 */
const isObjectEmpty = (object) => {
    for (let i in object) return false;
    return true;
}

module.exports = {
    IsEmail: isEmail,
    IsObjectEmpty: isObjectEmpty,
    GoodPassword: goodPassword,
    GoodUsername: goodUsername,
};