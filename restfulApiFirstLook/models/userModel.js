const mongoose = require('mongoose')
const router = require('../router/userRouter')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    isim: {
        type: String,
        require: true,
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
        trim: true,
    }
}, { collection: 'kullanicilar', timestamps: true })

const user = mongoose.model('Users', UserSchema)

module.exports = user