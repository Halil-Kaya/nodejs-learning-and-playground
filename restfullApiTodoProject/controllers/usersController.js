const User = require('../models/userModel')


//tum kullanicilari sadece admin getirebilir parametreye gorede todolariyla gelicek
const getAllUsers = async(req, res, next) => {

    try {

        if (req.params.w == 'todos') {

            const usersWithTodos = await User.getAllUsersWithTodos()
            return res.json(usersWithTodos)

        }


        const users = await User.getAllUsers()
        return res.json(users)

    } catch (err) {
        next(err)
    }

}

//gonderilen tokenden kisiyi bulacak
const getUserProfile = async(req, res, next) => {

    try {

        const user = await User.getUserProfile(req._id)
        return res.json(user)

    } catch (err) {
        next(err)
    }


}

//abc.com/api/users/:id
//id ye gore kullaniciyi getiriyor bunu yapmaya sadece adminin yetkisi var
const getUserById = async(req, res, next) => {

    try {

        const user = await User.getUserById(req.params.id)
        return res.json(user)

    } catch (err) {
        next(err)
    }

}

//kisi olusturuyor
const createUser = async(req, res, next) => {

    try {

        const result = await User.createUser(req.body)

        return res.json(result)

    } catch (err) {
        next(err)
    }

}

//kisiye todo ekleniyor
const createTodo = async(req, res, next) => {

    try {

        const user = await User.getUserById(req._id)

        await user.createTodo(req.body.todo)

        return res.json({ message: `${req._id} id li kisiye ${req.body.todo} todosu eklendi ` })

    } catch (err) {
        next(err)
    }

}

//kisi guncelleniyor
const updateUser = async(req, res, next) => {

    try {

        const user = await User.getUserById(req._id)

        await user.updateUser(req.body)

    } catch (err) {
        next(err)
    }

}

//kisi giris yapiyor
const userLogin = async(req, res, next) => {

    try {

        const user = await User.logIn(req.body.email, req.body.password)
        const userToken = await user.generateToken()
        return res.json(userToken)

    } catch (err) {
        next(err)
    }

}

//kisinin todosu siliniyor
const deleteTodoOfUser = async(req, res, next) => {

    try {

        const user = await User.getUserById(req._id)
        await user.deleteTodos(req.body.todo)

        return res.json({ message: 'todo silindi' })

    } catch (err) {
        next(err)
    }

}

//kisinin sadece todolarini getiriyor
const getTodosOfUser = async(req, res, next) => {
    try {
        const todos = await User.getTodosOfUser(req._id)
        return res.json(todos)

    } catch (err) {
        next(err)
    }

}

module.exports = {
    getAllUsers,
    getUserProfile,
    getUserById,
    createUser,
    createTodo,
    updateUser,
    userLogin,
    deleteTodoOfUser,
    getTodosOfUser
}