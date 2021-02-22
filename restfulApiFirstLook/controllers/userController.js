const createError = require('http-errors')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const tumUserlariListele = async(req, res) => {
    const allUsers = await User.find({})
    res.json(allUsers)
}

const oturumAcanKullaniciBilgileri = async(req, res, next) => {
    res.send(req.user)
}

const oturumAcanKullaniciGuncelleme = async(req, res, next) => {

    delete req.body.createdAt
    delete req.body.updatedAt

    if (req.body.hasOwnProperty('sifre')) {
        req.body.sifre = await bcrypt.hash(req.body.sifre, 10)
    }

    const { error, value } = User.joiValidationForUpdate(req.body)

    if (error) {

        next(createError(400, error))

    } else {

        try {

            const result = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })

            return res.json(result)

        } catch (err) {
            next(createError(err))
        }

    }

}

const yeniKullaniciOlustur = async(req, res, next) => {

    try {

        const eklenecekUser = new User(req.body)

        eklenecekUser.sifre = await bcrypt.hash(eklenecekUser.sifre, 10)


        //normalde veri tabanina gidip kontrol ediyor islem basarili mi degil mi diye
        //burda ise joi kullanarak veri tabanina gitmesine gerek kalmadan dogrulama yapiyorum
        //ondan sonra veri tabanina gidip islemi yapiyorum
        //ama yinede veri tabaninda kontrol ediyor peki neden
        //joi ile bir mailin mail olup olmadigini bulabilirim ama o mailin alinip alinmadigini veri tabaninda ogrenebilirim

        //joiValidation kismi userModel kisminda schema ma ekledigim metot sayesinde var
        const { error, value } = eklenecekUser.joiValidation(req.body)
        if (error) {

            next(error)

        } else {

            const result = await eklenecekUser.save()
            return res.send(result)

        }


    } catch (err) {
        next(err)
    }

}

const girisYap = async(req, res, next) => {

    try {

        const user = await User.girisYap(req.body.email, req.body.sifre)
        const token = await user.generateToken()
        return res.send({
            user,
            token
        })

    } catch (err) {

        next(err)

    }

}

const adminUserGuncelleme = async(req, res, next) => {

    delete req.body.createdAt
    delete req.body.updatedAt

    if (req.body.hasOwnProperty('sifre')) {
        req.body.sifre = await bcrypt.hash(req.body.sifre, 10)
    }

    const { error, value } = User.joiValidationForUpdate(req.body)

    if (error) {

        next(createError(400, error))

    } else {

        try {

            const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            if (result) {
                return res.json(result)
            } else {
                return res.status(404).send('boyle bir kullanici yok')
            }

        } catch (err) {
            next(createError(err))
        }

    }

}

const tumKullanicilariSil = async(req, res, next) => {

    try {

        const result = await User.deleteMany({ isAdmin: false })

        if (result) {
            return res.json({
                mesaj: 'tum kullanicilar silindi'
            })
        } else {
            //return res.status(404).send('boyle bir kullanici yok')
            throw createError(404, 'kullanici bulunamadi')
        }

    } catch (err) {

        next(createError(err))

    }

}

const kullaniciKendiniSiler = async(req, res, next) => {

    try {

        const result = await User.findByIdAndDelete({ _id: req.user._id })

        if (result) {
            return res.send(result)
        } else {
            //return res.status(404).send('boyle bir kullanici yok')
            throw createError(404, 'kullanici bulunamadi')
        }

    } catch (err) {

        next(createError(err))

    }

}

const yoneticiKullaniciSil = async(req, res, next) => {

    try {

        const result = await User.findByIdAndDelete({ _id: req.params.id })

        if (result) {
            return res.send(result)
        } else {
            //return res.status(404).send('boyle bir kullanici yok')
            throw createError(404, 'kullanici bulunamadi')
        }

    } catch (err) {

        next(createError(err))

    }

}

module.exports = {
    tumUserlariListele,
    oturumAcanKullaniciBilgileri,
    oturumAcanKullaniciGuncelleme,
    yeniKullaniciOlustur,
    girisYap,
    adminUserGuncelleme,
    tumKullanicilariSil,
    kullaniciKendiniSiler,
    yoneticiKullaniciSil
}