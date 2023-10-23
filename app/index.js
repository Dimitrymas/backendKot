const express = require("express");
const http = require("http");
const cors = require('cors')
const {UserModel} = require('./database/model/')
const bcrypt = require('bcrypt')
require('dotenv').config()

const indexRouter = require('./routes/index')
const ResponseHandlingMiddleware = require('./middlewares/ResponseHandlingMiddleware')
const openConnection = require('./database')


class App {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
    }

    async createAdmin() {
        const candidate = await UserModel.findOne({username: process.env.ADMIN_USERNAME})
        if (!candidate) {
            const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 3)
            const user = await UserModel.create({
                username: process.env.ADMIN_USERNAME,
                password: password
            })
            await user.save()
            console.log('Admin created')
        } else {
            console.log('Admin already exists')
        }
    }

    useDependencies() {
        this.app.use(cors())
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use('/api', indexRouter)
        this.app.use(ResponseHandlingMiddleware)
    }


    async run(port) {
        await openConnection()
        await this.createAdmin()
        this.server.listen(port, () => {
            console.log('Server is running on port 8080')
        })
    }
}


module.exports = new App()