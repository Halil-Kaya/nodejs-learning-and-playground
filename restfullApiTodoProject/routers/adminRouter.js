const router = require('express').Router()

const adminController = require('../controllers/adminController')

//middlewares
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')


//butun adminleri getirir
router.get('/', [authMiddleware, adminMiddleware], adminController.getAllAdmins)

//kisiyi siler
router.delete('/', [authMiddleware, adminMiddleware], adminController.deleteUser)

//kisiyi engeller
router.post('/blockUser', [authMiddleware, adminMiddleware], adminController.blockUser)

//kisinin engelini kaldirir
router.get('/unblockUser', [authMiddleware, adminMiddleware], adminController.unblockUser)

//adminin profilini getirir
router.get('/me', [authMiddleware, adminMiddleware], adminController.getAdminProfile)

//kisiyi admin yapar
router.get('/makeAdmin', [authMiddleware, adminMiddleware], adminController.makeAdmin)




module.exports = router