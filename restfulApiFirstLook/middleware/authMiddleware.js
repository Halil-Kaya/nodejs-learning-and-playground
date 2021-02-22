const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


//requestin icinden id yi aliyorum eger requestin icinde token yoksa veya token gecersiz ise hata veriyor
const auth = async(req, res, next) => {



    try {

        if (!req.header('Authorization')) {

            throw new Error('Giris Yap! bana bir token ver')

        }

        const token = req.header('Authorization').replace('Bearer ', '')
        const result = jwt.verify(token, 'secretKey')
        const foundedUser = await User.findById(result._id)

        if (!foundedUser) {

            throw new Error('Boyle bir kullanici yok')

        }

        req.user = foundedUser

        next()

    } catch (err) {

        next(err)

    }


}


module.exports = auth