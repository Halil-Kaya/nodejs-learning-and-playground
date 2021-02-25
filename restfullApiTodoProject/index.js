const express = require('express')
require('./db/dbConnection')

//Routes
const userRouter = require('./routers/userRouter')
const todoRouter = require('./routers/todoRouter')
const adminRouter = require('./routers/adminRouter')

//error Middleware
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()

//start-up middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/users', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/todos', todoRouter)

app.use((req, res, next) => {

    return res.json({ message: 'Boyle bir endpoint yok' })

})

app.use(errorMiddleware)



app.listen(3000, () => {
    console.log('server 3000 portundan ayaga kalkti');
})