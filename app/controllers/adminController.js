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

    async changeProductPosition(req, res, next) {
        const id = req.body.id
        const id2 = req.body.id2
        try {
            const resp = await AdminService.changeProductPosition(id, id2)
            next(ApiSuccess.success(resp))
        } catch (e) {
            next(e)
        }
    }

    async createProduct(req, res, next) {
        const body = req.body
        const name = body.name
        const code = body.code
        const info = body.info
        const link = body.link
        const type = body.type
        const description = body.description
        const filename = req.file.filename
        try {
            const resp = await AdminService.createProduct(name, code, info, type, link, description, filename)
            next(ApiSuccess.success(resp))
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new AdminController()