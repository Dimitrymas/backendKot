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

    async createProduct(name, code, info, link, description, filename) {
        const product = await ProductModel.create({
            name,
            code,
            info,
            link,
            description,
            position: await ProductModel.countDocuments(),
            filename,
        })
        try {
            await product.save()
            return ApiSuccess.success({'message': 'Product created'})
        } catch (e) {
            throw ApiError.internal('Error while creating product')
        }
    }

    async changeProductPosition(id, id2) {
        const product1 = await ProductModel.findOne({_id: id})
        const product2 = await ProductModel.findOne({_id: id2})
        if (!product1 || !product2) {
            throw ApiError.badRequest('Product not found')
        }
        const position1 = product1.position
        const position2 = product2.position
        product1.position = position2
        product2.position = position1
        try {
            await product1.save()
            await product2.save()
            return ApiSuccess.success({'message': 'Product position changed'})
        } catch (e) {
            throw ApiError.internal('Error while changing product position')
        }
    }
}

module.exports = new AdminService()