const express = require('express')
const path = require('path')

const app = express()

const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')


app.set('view engine', 'ejs')

app.use(expressLayouts)


app.get('/', (req, res, next) => {
    console.log(__dirname);
    //return res.sendFile(path.resolve(__dirname, "index.html"))

    const users = [
        { ad: 'halil', id: 1 },
        { ad: 'ali', id: 2 },
        { ad: 'hasan', id: 3 },
        { ad: 'faruk', id: 4 }
    ]

    const course = 'Nodejs'

    return res.render('index', {
        users,
        course
    })
})



app.listen(3000, () => {
    console.log('3000 portundan server ayaklandi');
})