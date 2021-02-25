const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const authCheck = (req, res, next) => {

    try {

        //token gondermemis
        if (!req.header('Authorization')) throw createError(401, 'Token Gondermen gerekli')



        //token i aliyorum
        const token = req.header('Authorization').replace('Bearer ', '')

        //token i decoded ediyorum
        const decodedToken = jwt.verify(token, 'SecretKeyq')

        //requeste ekleyip sonraki middleware geciyorum
        req.userId = decodedToken._id

        next()

    } catch (err) {

        next(err)

    }

}

module.exports = authCheck