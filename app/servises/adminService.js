const {UserModel, ProductModel} = require('../database/model')
const bcrypt = require('bcrypt')
const ApiError = require("../api_response/ApiError");
const ApiSuccess = require("../api_response/ApiSuccess");
const Utils = require("../utils");

class AdminService {
    async login(username, password) {
        const candidate = await UserModel.findOne({username})
        if (!candidate) {
            throw ApiError.badRequest('User not found')
        } else {
            const validPassword = await bcrypt.compare(password, candidate.password)
            if (!validPassword) {
                throw ApiError.badRequest('Invalid password')
            } else {
                return {jwt: Utils.generateJWT()}
            }
        }
    }



    async deleteProduct(id) {
        const candidate = await ProductModel.findOne({_id: id})
        if (!candidate) {
            throw ApiError.badRequest('Product not found')
        } else {
            await ProductModel.deleteOne({_id: id})
            return ApiSuccess.success({'message': 'Product deleted'})
        }
    }

    async createProduct(name, info, link, description, filename) {
        const product = await ProductModel.create({
            name,
            info,
            link,
            description,
            filename,
        })
        try {
            await product.save()
            return ApiSuccess.success({'message': 'Product created'})
        } catch (e) {
            return ApiError.internal('Error while creating product')
        }


    }
}

module.exports = new AdminService()