const mongoose = require('mongoose')
const router = require('../router/userRouter')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    isim: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    sifre: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { collection: 'kullanicilar', timestamps: true })



const schema = Joi.object({

    isim: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    sifre: Joi.string().min(6).trim()

})

//yeni bir user icin bu validation kullanilir
UserSchema.methods.joiValidation = function(userObject) {

    schema.required()

    return schema.validate(userObject)
}


UserSchema.methods.generateToken = async function() {

    const girisYapanUser = this
    const token = await jwt.sign({ _id: girisYapanUser._id, email: girisYapanUser.email }, 'secretKey', { expiresIn: '1h' })
    return token
}


UserSchema.statics.girisYap = async(email, sifre) => {


    const { error, value } = schema.validate({ email, sifre })

    if (error) {
        throw createError(400, error)
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw createError(400, "Girilen email/sifre hatali ")
    }

    const sifreKontrol = await bcrypt.compare(sifre, user.sifre)

    if (!sifreKontrol) {
        throw createError(400, "Girilen email/sifre hatali ")
    }

    return user
}


//update icin bu validation kullanilir
UserSchema.statics.joiValidationForUpdate = function(userObject) {
    return schema.validate(userObject)
}


//islemler sonucunda bana butun obje donuyor bunlarin belli basli kisimlarini dondurmek isteyebilirim
//toJSON metodu datayi dondurmeden once calisiyor buraya otomatik girip gorunmesini istemedigim kisimlarini objeden silip
//oyle datayi donduruyorum
UserSchema.methods.toJSON = function(userObject) {

    const user = this.toObject()
    delete user._id
    delete user.createdAt
    delete user.updatedAt
    delete user.sifre
    delete user.__v

    return user

}




const User = mongoose.model('Users', UserSchema)



module.exports = User