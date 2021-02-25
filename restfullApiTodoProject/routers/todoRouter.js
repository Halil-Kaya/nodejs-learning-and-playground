const router = require('express').Router()

const todoController = require('../controllers/todosController')

//middlewares
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')


//butun todolari getirir parametreye gore de kullaniciyla beraber getirir
router.get('/', [authMiddleware, adminMiddleware], todoController.getAllTodos)





module.exports = router