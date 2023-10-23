const AdminService = require("../servises/adminService");
const ApiSuccess = require("../api_response/ApiSuccess");


class AdminController {

    async login(req, res, next) {
        const username = req.body.username
        const password = req.body.password
        try {
            const resp = await AdminService.login(username, password)
            next(ApiSuccess.success(resp))
        } catch (e) {
            next(e)
        }

    }

    async deleteProduct(req, res, next) {
        const id = req.body.id
        try {
            const resp = await AdminService.deleteProduct(id)
            next(ApiSuccess.success(resp))
        } catch (e) {
            next(e)
        }
    }

    async createProduct(req, res, next) {
        const body = req.body
        const name = body.name
        const info = body.info
        const link = body.link
        const description = body.description
        const filename = req.file
        try {
            const resp = await AdminService.createProduct(name, info, link, description, filename)
            next(ApiSuccess.success(resp))
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new AdminController()