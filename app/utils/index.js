const jwt = require('jsonwebtoken')
require('dotenv').config()

class Utils {
    static generateJWT() {
        return jwt.sign({role: "admin"}, process.env.SECRET_KEY);
    }
}

Utils.generateJWT()

module.exports = Utils;