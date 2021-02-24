const mongoose = require('mongoose')
const createError = require('http-errors')
const Joi = require('@hapi/joi')

const User = require('./userModel')

const { ObjectID } = require('mongodb')



const Schema = mongoose.Schema

const TodoSchema = new Schema({

    todoName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    userID: {
        type: String,
        required: true,
        trim: true
    }

}, { collation: 'Todos', timestamps: true })


const schema = Joi.object({
    todoName: Joi.string().min(3).max(50).trim(),
    userID: Joi.string().trim(),
    todoID: Joi.string().trim()
})

TodoSchema.statics.AddTodo = async(todoName, userID) => {

    const { error, value } = schema.required().validate({ todoName, userID })

    if (error) {

        throw createError(400, error)

    }


    const user = await User.findById(value.userID)

    if (!user) {

        throw createError(400, 'Boyle bir kullanici yok!')

    }

    const result = await Todo.find({ todoName: value.todoName, userID: value.userID })

    if (result.length > 0) {

        throw createError(400, 'Kullanici Boyle Bir Todoya Zaten Sahip')

    }

    //const newTodo = new Todo({todoName : todoName,userID : userID})
    const newTodo = new Todo({ todoName, userID })

    return await newTodo.save()
}


TodoSchema.statics.DeleteTodo = async(todoID, userID) => {


    const { error, value } = schema.validate({ userID: userID, todoID: todoID })
    if (error) {

        throw createError(400, error)

    }

    const todo = await Todo.findById(todoID)

    if (todo.userID == value.userID) {

        await Todo.findByIdAndDelete(todoID)

    }

}



TodoSchema.methods.toJSON = function() {

    const todo = this.toObject()
    delete todo.__v

    return todo
}

//kullanicinin todolarini getiriyor
TodoSchema.statics.getTodosByIdUserId = async(userId) => {
    return await Todo.find({ userID: userId }, { _id: 1, todoName: 1, createdAt: 1 })
}


const Todo = mongoose.model('Todos', TodoSchema)

module.exports = Todo