const Router = require('express')
const fileRouter = require('../controllers/fileController')

const router = new Router()

router.get('/:filename', fileRouter.get)


module.exports = router
