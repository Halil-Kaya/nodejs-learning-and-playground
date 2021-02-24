const mongoose = require('mongoose')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi')

const Todo = require('./todoModel')


const Schema = mongoose.Schema


const UserSchema = new Schema({
    fullName: {
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
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    usersDeleted: {
        type: [{ _deletedUserId: String, deletedTime: { type: Date, default: Date.now } }],
    },
    usersBlocked: {
        type: [{ _blockedUserId: String, blockedTime: { type: Date, default: Date.now } }],
    }
}, { collation: 'Users', timestamps: true })


//burda required kullanmiyorum cunku bazi yerlerde sadece bazi bolgeler benim isime yariyor
const schema = Joi.object({
    fullName: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().min(3).max(50).trim(),
    password: Joi.string().min(3).trim()
})


UserSchema.methods.generateToken = async function() {

    const loggedUser = this
    const token = await jwt.sign({ _id: loggedUser._id }, 'secretKey', { expiresIn: '2h' })
    return token

}

//yeni bir user eklerken bu validationu kullaniyorum burda butun bilgiler gerekli oldugu icin required diyiyorum
UserSchema.statics.joiValidation = (userObject) => {
    schema.required()
    return schema.validate(userObject)
}

//update icin bu validationu kullaniyorum burda kisinin gonderdigi kisimlari kontrol ettigim icin required kismini koymuyorum
UserSchema.statics.joiValidationForUpdate = (userObject) => {
    return schema.validate(userObject)
}


//kullanici burda giris yapiyor
UserSchema.statics.logIn = async(email, password) => {

    const { error, value } = schema.validate({ email, sifre })

    //validate hatali ise hata donuyorum (bu metodu cagirdigim yer try catch blogu icinde)
    if (error) {

        throw createError(400, error)

    }

    //const user = await User.findOne({ email: email }) 
    const user = await User.findOne({ email }) // bu yukardakiyla ayni anlama geliyor

    //eger boyle bir kullanici yoksa hata donduruyorum
    if (!user) {

        throw createError(400, 'Girilen email/sifre hatali')

    }

    if (user.isBlocked) {

        throw createError(400, 'Kullanici Engellenmis!')

    }

    if (user.isDeleted) {

        throw createError(400, 'Kullanici Silinmis!')

    }

    const passwordCheck = await bcrypt.compare(password, user.password)

    //eger sifre gecersiz ise hata donduruyorum
    if (!passwordCheck) {

        throw createError(400, 'Girilen email/sifre hatali')

    }

    return user

}


//islemler sonucunda bana butun obje donuyor bunlarin belli basli kisimlarini dondurmek isteyebilirim
//toJSON metodu datayi dondurmeden once calisiyor buraya otomatik girip gorunmesini istemedigim kisimlarini objeden silip
//oyle datayi donuyorum burda sifre kismini kaldiriyorum
UserSchema.methods.toJSON = function() {

    const user = this.toObject()
    delete user.password

    return user
}

//benim 2 turum var biri admin biri kisi
//kisi belli basli yerleri gormeli admin belli basli seyleri gormeli o yuzden bunun icin metot ekliyorum
UserSchema.methods.previewForUser = function() {
    const user = this.toObject()
    delete user._id
    delete user.usersBlocked
    delete user.usersDeleted
    delete user.isBlocked
    delete user.isDeleted
    delete user.createdAt
    delete user.updatedAt
    delete user.__v
    return user
}

//butun kullanicilari getirir
UserSchema.statics.getAllUsers = async() => {
    return await User.find({}, { _id: 1, fullName: 1, userName: 1, email: 1, createdAt: 1 })
}

//kisinin kendisi todolariyla beraber gelicek
UserSchema.statics.getUserProfile = async(userId) => {


    const user = await User.findById(userId, { _id: 1, fullName: 1, userName: 1, email: 1, createdAt: 1 })


    if (!user) {
        throw createError(400, 'Boye bir kullanici yok')
    }

    const todos = await Todo.getTodosByIdUserId(userId)
    return {
        user,
        todos
    }
}

//butun kullanicilar todolariyla beraber gelir
UserSchema.statics.getAllUsersWithTodos = async() => {

    const users = await User.getAllUsers()
    return await Promise.all(users.map(async(user) => {
        let todos = await Todo.getTodosByIdUserId(user._id)
        return {
            user,
            todos
        }
    }))

}

UserSchema.statics.getById = async(userId) => {

    const user = await User.findById(userId)

    if (!user) {

        throw createError(400, 'Boyle Bir Kullanici Yok')

    }

    return user
}

UserSchema.statics.createUser = async(newUser) => {

    const { error, value } = User.joiValidation(newUser)

    if (error) {

        throw createError(400, 'Bilgiler Gecersiz')

    }

    value.password = await bcrypt.hash(value.password, 10)

    const user = new User(value)
    return await user.save()

}


const User = mongoose.model('Users', UserSchema)


module.exports = User