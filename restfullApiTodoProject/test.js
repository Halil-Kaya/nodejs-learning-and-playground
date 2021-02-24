require('./db/dbConnection')

const Todo = require('./models/todoModel')
const User = require('./models/userModel')

const Joi = require('@hapi/joi')

const express = require('express')

const app = express()

app.get('/', async(req, res) => {
    let r = await test6()
    res.send(r.previewForUser())
})

const test = async() => {
    const newUser = new User({
        fullName: 'Halil Kaya',
        userName: 'HalilKaya',
        email: 'hlk@gmail.com',
        password: 'halilkaya68'
    })

    newUser.save()
}


// const todoEkle = async(todoName) => {

//     try {
//         await Todo.AddTodo(todoName, '603441fd0bcdf73132fe829d')
//     } catch (err) {
//         console.log(err);
//     }

// }
// todoEkle('asds')


const test2 = async() => {
    console.log('silmeye hazirlaniyor');
    await Todo.DeleteTodo('6034440927981136c2b57fd1', '603441fd0bcdf73132fe829d')
    console.log('sildi');
}

//test2()


const test3 = async() => {
        let r = await Todo.getTodosByIdUserId('603441fd0bcdf73132fe829d')
        console.log(r);
    }
    //test3()

const test4 = async() => {

    let r = await User.getUserProfile('603441fd0bcdf73132fe829d')
    console.log(r);

}

//test4()

const test5 = async() => {

    let r = await User.getAllUsersWithTodos()

    console.log(r);
    return r
}

//test5()

// const test6 = async() => {

//     for (let i = 0; i < 100000; i++) {

//         const newUser = {
//             fullName: 'Halil Kayaasdf',
//             userName: 'halilkayaasdf',
//             email: 'hlk@gmaildfasdf',
//             password: 'halilkaya68asdfsdf',
//         }

//         let r = await User.createUser(newUser)
//         console.log(r);
//     }

// }

test6()




// const schema = Joi.object({
//     fullName: Joi.string().min(3).max(50).trim(),
//     userName: Joi.string().min(3).max(50).trim(),
//     email: Joi.string().min(3).max(50).trim(),
//     password: Joi.string().min(3).trim()
// })

// const r = schema.validate({
//     fullName: "Halil Kayaasdf",
//     userName: "halilkayaasdf",
//     email: "hlk@gmaildfasdf",
//     password: "halilkaya68asdfsdf"
// })

// console.log(r.value);


app.listen(3000, () => {
    console.log('server is up');
})