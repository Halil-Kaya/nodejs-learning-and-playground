const router = require('express').Router()

const userController = require('../controllers/userController')

const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')


//tum kullanicilari sadece admin listeleyebilir
router.get('/', [authMiddleware, adminMiddleware], userController.tumUserlariListele)

//oturum acan user bilgilerini listeler
router.get('/me', authMiddleware, userController.oturumAcanKullaniciBilgileri)

//oturum acan user guncelleme islemleri
router.patch('/me', authMiddleware, userController.oturumAcanKullaniciGuncelleme)


router.post('/', userController.yeniKullaniciOlustur)


router.post('/giris', userController.girisYap)


router.patch('/:id', userController.adminUserGuncelleme)


router.delete('/deleteAll', [authMiddleware, adminMiddleware], userController.tumKullanicilariSil)


router.delete('/me', authMiddleware, userController.kullaniciKendiniSiler)


router.delete('/:id', userController.yoneticiKullaniciSil)



module.exports = router