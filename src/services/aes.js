const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const password = '123abc567efg8910hij';
let aes = {
    encrypt: function (text) {
        let cipher = crypto.createCipher(algorithm, password);
        let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt: function (text) {
        let decipher = crypto.createDecipher(algorithm, password);
        let dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
};

module.exports = aes;
