const {body} = require('express-validator')

const validateNewUser = () => {
    return [
        body('email')
            .trim()    
            .isEmail().withMessage('Gecerli Bir Mail Giriniz'),
        body('sifre')
            .trim()
            .isLength({min:6}).withMessage('Sifre en az 6 karakter olmali')
            .isLength({max : 20}).withMessage('Sifre en fazla 20 karakter olmali'),
        body('ad')
            .trim()
            .isLength({min:2}).withMessage('isim en az 2 karakter olmali')
            .isLength({max : 30}).withMessage('isim en fazla 30 karakter olmali'),
        body('soyad')
            .trim()
            .isLength({min:2}).withMessage('Soyisim en az 2 karakter olmali')
            .isLength({max : 30}).withMessage('Soyisim en fazla 30 karakter olmali'),
        body('resifre').trim().custom((value,{req}) => {
            if(value !== req.body.sifre) throw new Error('Sifreler Ayni Degil')
            return true
        })

        ]
}

const validateLogin = () => {
    return [

        body('email')
            .trim()    
            .isEmail().withMessage('Gecerli Bir Mail Giriniz'),
        body('sifre')
            .trim()
            .isLength({min:6}).withMessage('Sifre en az 6 karakter olmali')
            .isLength({max : 20}).withMessage('Sifre en fazla 20 karakter olmali'),

    ]

}

module.exports = {
    validateNewUser,
    validateLogin
}