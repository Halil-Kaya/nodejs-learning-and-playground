const router = require('express').Router()

const blogController = require('../controllers/blogController')

router.get('/', blogController.tumMakaleleriGetir)


router.get('/:makaleId', blogController.tekMakaleGetir)

module.exports = router