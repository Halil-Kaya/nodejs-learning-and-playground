const router = require('express').Router()

const userController = require('../controllers/usersController')

//middlewares
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

router.get('/', [authMiddleware, adminMiddleware], userController.getAllUsers)

router.put('/', [authMiddleware], userController.updateUser)

router.get('/me', [authMiddleware], userController.getUserProfile)

router.get('/todo', authMiddleware, userController.getTodosOfUser)

router.get('/:id', [authMiddleware, adminMiddleware], userController.getUserById)

router.post('/create', userController.createUser)

router.post('/createTodo', [authMiddleware], userController.createTodo)

router.post('/login', userController.userLogin)

router.delete('/todo/:id', [authMiddleware], userController.deleteTodoOfUser)


module.exports = router