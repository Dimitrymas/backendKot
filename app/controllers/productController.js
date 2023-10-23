const ProductService = require("../servises/productService");
const ApiSuccess = require("../api_response/ApiSuccess");
const ApiError = require("../api_response/ApiError");

class ProductController {
    constructor() {
    }

    async getProducts(req, res, next) {
        try {
            const resp = await ProductService.getProducts()
            next(ApiSuccess.success(resp))
        } catch (e) {
            next(ApiError.internal("Error while getting products"))
        }
    }
}

module.exports = new ProductController()