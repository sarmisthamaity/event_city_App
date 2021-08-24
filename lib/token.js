const Jwt = require('jsonwebtoken');

module.exports.createToken = (data) => {
    return Jwt.sign(data,
        toString(),
        process.env.SERECT_KEY,
        { expiresIn: 24 * 60 * 60 }
    );
};