//burasi authMiddleware den sonra calisiyor burasi eger kisi admin ise devam ediyor admin degilse kisi engelleniyor
const admin = (req, res, next) => {

    if (req.user && !req.user.isAdmin) {

        return res.status(403).json({
            mesaj: 'Erisim engellendi sen admin degilsin'
        })

    }

    next()

}

module.exports = admin