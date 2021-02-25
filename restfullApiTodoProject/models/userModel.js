const mongoose = require('mongoose')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi')
const { func } = require('@hapi/joi')





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
    },
    todos: {
        type: [{ todoName: String, createdTime: { type: Date, default: Date.now } }]
    }
}, { collection: 'Users', timestamps: true })


//burda required kullanmiyorum cunku bazi yerlerde sadece bazi bolgeler benim isime yariyor
const schema = Joi.object({
    fullName: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().min(3).max(50).trim(),
    password: Joi.string().min(3).trim()
})


UserSchema.methods.generateToken = async function() {

    const loggedUser = this
    const token = await jwt.sign({ _id: loggedUser._id }, 'SecretKey', { expiresIn: '2h' })
    return token

}

//yeni bir user eklerken bu validationu kullaniyorum burda butun bilgiler gerekli oldugu icin required diyiyorum
UserSchema.statics.joiValidation = (userObject) => {
    return schema.required().validate(userObject)
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


    const user = await User.findById(userId, { _id: 1, fullName: 1, userName: 1, email: 1, createdAt: 1, todos: 1 })


    if (!user) {
        throw createError(400, 'Boye bir kullanici yok')
    }

    return user
}

//butun kullanicilar todolariyla beraber gelir
UserSchema.statics.getAllUsersWithTodos = async() => {

    return await User.find({}, { _id: 1, fullName: 1, userName: 1, email: 1, createdAt: 1, todos: 1 })

}

UserSchema.statics.getUserById = async(userId) => {

    const user = await User.findById(userId)

    if (!user) {

        throw createError(400, 'Boyle Bir Kullanici Yok')

    }

    return user
}

UserSchema.statics.createUser = async(newUser) => {
    console.log(newUser);
    const { error, value } = User.joiValidation(newUser)
    console.log(error);
    if (error) {

        throw createError(400, 'Bilgiler Gecersiz : ' + error)

    }

    value.password = await bcrypt.hash(value.password, 10)

    const user = new User(value)

    return await user.save()
}

UserSchema.methods.createTodo = async function(newTodo) {

    const user = this.toObject()


    let isNewTodoUnique = user.todos.every(todo => todo.todoName.toLowerCase() != newTodo.toLowerCase())

    if (isNewTodoUnique) {

        user.todos.push({ todoName: newTodo, createdTime: Date.now() })

    } else {

        throw createError(400, 'Kullanici Boyle bir todoya zaten sahip')

    }

    await User.findByIdAndUpdate(user._id, user)

}

UserSchema.statics.checkUser = async(userId) => {

    const user = await User.findById(userId)

    return user != null

}

UserSchema.methods.updateUser = async function(updatedUser) {

    updatedUser = updatedUser.toObject()

    delete updatedUser.isAdmin
    delete updatedUser._id
    delete updatedUser.isBlocked
    delete updatedUser.usersDeleted
    delete updatedUser.usersBlocked
    delete updatedUser.createdAt
    delete updatedUser.updatedAt
    delete updatedUser.isDeleted
    delete updatedUser.__v

    await User.findByIdAndUpdate(this._id, updatedUser)
}

UserSchema.statics.getTodosOfUser = async(userId) => {

    const user = await User.getUserById(userId)

    return user.todos
}

UserSchema.methods.deleteTodos = async function(todos) {

    todos = todos.map(todo => todo.toLowerCase())

    const user = this.toObject()

    user.todos = user.todos.filter(todo => {
        if (!todos.includes(todo.todoName.toLowerCase())) return true
    })

    await User.findByIdAndUpdate(this._id, user)
}

UserSchema.statics.getAdmins = async() => {
    return await User.find({ isAdmin: true })
}


UserSchema.methods.addDeletedUserToAdmin = async function(userIdToDelete) {

    const adminUser = this.toObject()

    if (!adminUser.isAdmin) {

        throw createError(400, 'Bunu yapmaya yetkin yok! sen admin degilsin')

    }

    const userToDelete = await User.findById(userIdToDelete)

    if (!userToDelete) {

        throw createError(400, 'Boyle bir kullanici yok')

    }

    userToDelete.isDeleted = true

    const isIdUnique = adminUser.usersDeleted.every(id => id._deletedUserId != userIdToDelete)

    if (isIdUnique) {
        adminUser.usersDeleted.push({ _deletedUserId: userIdToDelete, deletedTime: Date.now() })
    }

    await User.findByIdAndUpdate(adminUser._id, adminUser)

    await User.findByIdAndUpdate(userIdToDelete, userToDelete)

}

UserSchema.methods.addBlockedUserToAdmin = async function(userIdToBlock) {

    const adminUser = this.toObject()

    if (!adminUser.isAdmin) {

        throw createError(400, 'Bunu yapmaya yetkin yok! sen admin degilsin')

    }

    const userToBlock = await User.findById(userIdToBlock)

    if (!userToBlock) {

        throw createError(400, 'Boyle bir kullanici yok')

    }

    userToBlock.isBlocked = true

    const isIdUnique = adminUser.usersBlocked.every(id => id._blockedUserId != userIdToBlock)

    if (isIdUnique) {
        adminUser.usersBlocked.push({ _blockedUserId: userIdToBlock, deletedTime: Date.now() })
    }

    await User.findByIdAndUpdate(adminUser._id, adminUser)

    await User.findByIdAndUpdate(userIdToBlock, userToBlock)

}

UserSchema.methods.unblockUser = async function(blcokedUserId) {

    const adminUser = this.toObject()

    if (!adminUser.isAdmin) {

        throw createError(400, 'Bunu yapmaya yetkin yok! sen admin degilsin')

    }

    const userToUnblock = await User.findById(blcokedUserId)

    if (!userToUnblock) {

        throw createError(400, 'Boyle bir kullanici yok')

    }
    userToUnblock.isBlocked = false

    await User.findByIdAndUpdate(userToUnblock._id, userToUnblock)



    const adminWhoBlockeUser = (await User.find({ "usersBlocked._blockedUserId": blcokedUserId }))[0]

    if (!adminWhoBlockeUser) {
        return
    }


    adminWhoBlockeUser.usersBlocked = adminWhoBlockeUser.usersBlocked.filter(blockedUser => {
        if (blockedUser._blockedUserId != blcokedUserId) return true
    })

    await User.findByIdAndUpdate(adminWhoBlockeUser._id, adminWhoBlockeUser)
}


UserSchema.methods.deleteUser = async function() {
    const user = this.toObject()
    user.isDeleted = true
    await User.findByIdAndUpdate(this._id)
}

UserSchema.statics.getAdminProfile = async(adminId) => {

    const adminUser = await User.findById(adminId)

    if (!adminUser) throw createError(400, 'Boyle bir kullanici yok')


    if (!adminUser.isAdmin) throw createError(400, 'Boyle bir yetkiye sahip degilsin')

    return adminUser
}

UserSchema.methods.makeAdmin = async function(newAdminUserId) {

    const adminUser = this.toObject()

    if (!adminUser.isAdmin) throw createError(400, 'Boyle bir yetkiye sahip degilsin')

    const newAdminUser = await User.findById(newAdminUserId)

    if (!newAdminUser) throw createError(400, 'Boyle bir kullanici yok')

    newAdminUser.isAdmin = true

    await User.findByIdAndUpdate(newAdminUserId, newAdminUser)

}

UserSchema.statics.getAllTodos = async() => {

    const todosObjecArr = await User.find({}, { "_id": 0, "todos": 1, "createdTime": 1 })

    let todosArr = []
    todosObjecArr.forEach(item => {
        todosArr = todosArr.concat(item.todos)
    })

    return todosArr
}

UserSchema.statics.isAdmin = async(userId) => {
    const user = await User.findById(userId)
    if (!user) throw createError(400, 'Boyle bir kullanici yok')
    return user.isAdmin
}

UserSchema.statics.getAllAdmins = async() => {
    return await User.find({ isAdmin: true })
}

const User = mongoose.model('Users', UserSchema)


module.exports = User