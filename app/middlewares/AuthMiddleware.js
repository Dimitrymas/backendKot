const jwt = require('jsonwebtoken')
const ApiError = require("../api_response/ApiError");
require('dotenv').config()

module.exports = function (req, res, next) {
    if (req.method === "OPTION") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return next(ApiError.badAuthentication())
        }
        jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (e) {
        console.log(e)
        return next(ApiError.badAuthentication())
    }
}