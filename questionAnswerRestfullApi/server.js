const express = require('express')
const dotenv = require('dotenv')
const connectDatabase = require('./helpers/database/connectDatabase')
const routers = require('./routers/index')

//Environment Variables
dotenv.config({
    path:"./config/env/config.env"
})


//mongo db connection
connectDatabase()

const app = express()

//Routers Middleware

app.use("/api",routers)


const PORT = process.env.PORT

app.listen(PORT,() => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
})
