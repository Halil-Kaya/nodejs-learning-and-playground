const User = require('../models/userModel')

const adminCheck = (req, res, next) => {


    try {

        const result = User.isAdmin(req._id)

        if (!result) return res.status(401).json({ message: 'yetkin yok' })

        next()

    } catch (err) {

        next(err)

    }


}

module.exports = adminCheck