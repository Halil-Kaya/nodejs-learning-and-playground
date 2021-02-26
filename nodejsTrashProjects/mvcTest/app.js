const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const ejs = require('ejs')
const path = require('path')

const app = express()

const blogRouter = require('./src/routers/blogRouter')

app.use(express.static('public'))
app.use(expressLayouts)
app.set('view engine', 'ejs')

//views klosurum src altinda oldugunu soyluyorum
app.set('views', path.resolve(__dirname, 'src/views'))

//app.use('/', blogRouter)
app.use('/blog', blogRouter)


app.listen(3000, () => {
    console.log('server is up');
})