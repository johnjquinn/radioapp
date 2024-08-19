const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');

const createToken = user => {
    let payload = {
        id: user._id,
        username: user.username,
        role: user.role
    }

    return jwt.sign(payload, SECRET_KEY, {expiresIn: "10m"});
};

module.exports = {createToken};