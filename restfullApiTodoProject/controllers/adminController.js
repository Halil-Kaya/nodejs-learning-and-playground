const User = require('../models/userModel')

/*
Bu istekleri sadece admin yapabilir o yuzden auth ve admin middleware lerinden gecmesi lazim
*/

const getAllUsers = async(req, res, next) => {

    try {

        const allUsers = await User.getAllUsers()
        return res.json(allUsers)

    } catch (err) {
        next(err)
    }

}

const getAllAdmins = async(req, res, next) => {

    try {

        const allAdmins = await User.getAllAdmins()
        return res.json(allAdmins)

    } catch (err) {
        next(err)
    }

}

const deleteUser = async(req, res, next) => {

    try {

        const admin = await User.findById(req._id)

        await admin.addDeletedUserToAdmin(res.query.q)

        return res.json({ message: 'Kisi silindi' })

    } catch (err) {
        next(err)
    }

}

const blockUser = async(req, res, next) => {

    try {

        const admin = await User.getAdminProfile(req._id)

        await admin.addBlockedUserToAdmin(res.query.q)

        return res.json({ message: 'Kisi blocklandi' })

    } catch (err) {
        next(err)
    }
}

const unblockUser = async(req, res, next) => {

    try {

        const admin = await User.getAdminProfile(req._id)

        await admin.unblockUser(res.query.q)

        return res.json({ message: `${req._id} li kisinin engeli kaldirildi` })

    } catch (err) {
        next(err)
    }

}

const getAdminProfile = async(req, res, next) => {

    try {

        const admin = await User.getAdminProfile(req._id)

        return res.json(admin)

    } catch (err) {
        next(err)
    }

}

const makeAdmin = async(req, res, next) => {

    try {

        const admin = await User.getAdminProfile(req._id)

        await admin.makeAdmin(req.query.q)

        return res.json({ message: `${req._id} id li kisi admin yapildi` })

    } catch (err) {
        next(err)
    }

}



module.exports = {
    getAllUsers,
    getAllAdmins,
    deleteUser,
    blockUser,
    unblockUser,
    getAdminProfile,
    makeAdmin
}