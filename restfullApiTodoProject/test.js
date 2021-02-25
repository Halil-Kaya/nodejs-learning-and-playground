require('./db/dbConnection')

const User = require('./models/userModel')


const express = require('express')

const app = express()

app.get('/', async(req, res) => {
    let r = await test6()
    res.send(r.previewForUser())
})

const test = async() => {

    /*     const newUser = {
            fullName: 'Halil Kaya',
            userName: 'HalislKaya',
            email: 'hdlk@gmail.com',
            password: 'hdalilkaya68'
        }
        try {

            await User.createUser(newUser)

        } catch (err) {
            console.log('_________________________________');
            console.log(err);
        }
     */

    //const user = await User.getUserById('6036ba02a43c483aae30f92f')

    //await user.addDeletedUserToAdmin('6036bb2348343e3e10e8c2d9')

    //await user.addBlockedUserToAdmin('6036bb2348343e3e10e8c2d9')
    //await user.unblockUser('6036bb2348343e3e10e8c2d9')

    //const admin = await User.getAdminProfile('6036ba02a43c483aae30f92f')

    //console.log(admin);

    //await admin.makeAdmin('6036bb2348343e3e10e8c2d9')

    //await User.getAllTodos()

    const t = await User.getAllAdmins()
    console.log(t);


    //await user.deleteTodos(['hello'])

    // user.fullName = "***************************"

    // console.log(user);
    // user.updateUser(user)

    // const todos = await User.getTodosOfUser('6036ba02a43c483aae30f92f')

    // console.log(todos);



    //await user.createTodo('caliss')

    // const admins = await User.getAdmins()

    // console.log(admins);

    //console.log(await User.checkUser('6036bb2348343e3e10e8c2d8'));
}

test()


app.listen(3000, () => {
    console.log('server is up');
})