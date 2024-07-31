const jwt = require('jsonwebtoken');

let generateToken = (id) => {
    return jwt.sign({ id },
        process.env.SECRET_KEY,
        { expiresIn: '1d' })
}

module.exports = generateToken;