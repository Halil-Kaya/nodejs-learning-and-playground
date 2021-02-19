const express = require('express')
require('./db/dbConnection')

//Routes
const userRouter = require('./router/userRouter')
const hataMiddleware = require('./middleware/hataMiddleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/users', userRouter)

app.use(hataMiddleware)


app.get('/', (req, res) => {
    res.status(200).json({ 'mesaj': 'first step' })
})

app.listen(3000, () => {
    console.log('3000 portundan server baslatildi');
})