const jwt = require('jsonwebtoken')

class Utils {
    static generateJWT() {
        const jwtT = jwt.sign({role: "admin"}, process.env.SECRET_KEY);
        return jwtT
    }
}

Utils.generateJWT()

module.exports = Utils;