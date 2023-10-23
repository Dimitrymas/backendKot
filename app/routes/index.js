const Router = require('express')
const productRouter = require('./productRouter')
const fileRouter = require('./fileRouter')
const adminRouter = require('./adminRouter')


const router = new Router()

router.use('/product', productRouter)
router.use('/file', fileRouter)
router.use('/admin', adminRouter)

module.exports = router