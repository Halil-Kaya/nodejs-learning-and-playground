const express = require('express')
require('./db/dbConnection')
const jwt = require('jsonwebtoken')


//Routes
const userRouter = require('./router/userRouter')
const hataMiddleware = require('./middleware/hataMiddleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/users', userRouter)

app.use(hataMiddleware)

function testAuth(params) {
    const token = jwt.sign({ _userID: 'yeniKullaniciIdsi', isAdmin: true, aktif: true }, 'SecretKeyafWQCF', { expiresIn: '2h' })

    console.log(token);
    let decoded = jwt.verify(token, 'SecretKeyafWQCF')
    console.log(decoded);
}

testAuth()


app.listen(3000, () => {
    console.log('3000 portundan server baslatildi');
})