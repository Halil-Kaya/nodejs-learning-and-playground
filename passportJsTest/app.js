const dotenv = require('dotenv').config()
const express = require('express')

const session = require('express-session')
const flash = require('connect-flash')

//db baglantisi
require('./src/config/database')
const MongoDBStore = require('connect-mongodb-session')(session)

//routers 
const authRouter = require('./src/routers/auth_router')

const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')

const path = require('path')

const app = express()

const sessionStore = new MongoDBStore({
    uri:process.env.MONGODB_CONNECTION_STRING,
    collection : 'mySessions'
})

//session ve flash message
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000 * 60 * 60 * 24
    },
    store : sessionStore
}))

app.use(flash())

app.use((req,res,next) => {
    res.locals.validation_errors = req.flash('validation_errors')
    res.locals.email = req.flash('email')
    res.locals.ad = req.flash('ad')
    res.locals.soyad = req.flash('soyad')
    res.locals.sifre = req.flash('sifre')
    res.locals.resifre = req.flash('resifre')

    next()
})

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(expressLayouts)
app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views',path.resolve(__dirname,'./src/views'))


app.get('/',(req,res) => {

    if(req.session.sayac){
        req.session.sayac++
    }else{
        req.session.sayac = 1
    }
    console.log(req.session);
    res.json({sayac : req.session.sayac})

})

app.use('/',authRouter)


app.listen(process.env.PORT,() => {
    console.log(`server ${process.env.PORT} portundan ayaga kalkti`);
})