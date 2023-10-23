const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')
const upload = require('../middlewares/DownloadPhotoMiddleware')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.post('/auth/login/', adminController.login)

router.post('/product/', AuthMiddleware, upload.single('file'), adminController.createProduct)
router.delete('/product/', AuthMiddleware, adminController.deleteProduct)


module.exports = router