const {ProductModel} = require("../database/model");

class ProductService {
    constructor() {
    }

    async getProducts() {
        return {products: await ProductModel.find()}
    }
}

module.exports = new ProductService()