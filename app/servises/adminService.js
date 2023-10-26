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

    async createProduct(name, code, info, type, link, description, filename) {
        const product = await ProductModel.create({
            name,
            code,
            info,
            link,
            type,
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

    async changeProductsPosition(products) {
        const findAndChangeCandidatePosition = async (id, position) => {
            const dBProduct = await ProductModel.findById(id)
            if (!dBProduct) {
                throw ApiError.badRequest('Product not found')
            }
            dBProduct.position = position
            try {
                await dBProduct.save()
            } catch (e) {
                throw ApiError.internal('Error while changing product position')
            }
        }

        const tasks = []
        for (const product of products) {
            tasks.push(findAndChangeCandidatePosition(product.id, product.position))
        }
        await Promise.all(tasks)
        return ApiSuccess.success({'message': 'Products position changed'})
    }
}

module
    .exports = new AdminService()