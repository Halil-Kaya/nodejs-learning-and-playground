const express = require('express')
const todoRouter = require('./router/todo')
const errorRouter = require('./router/error')

const app = express()

app.use(express.json())

const requests = []
app.use((req, res, next) => {

    if (req.originalUrl == '/requests') return next()

    requests.push({
        id: requests.length + 1,
        requestTime: new Date(),
        requestUrl: req.originalUrl,
        requestMethod: req.method,
        requestIp: req.connection.remoteAddress
    })
    next()
})
app.use('/todos', todoRouter)
app.get('/requests', (req, res) => {
    return res.send(requests)
})

app.use(errorRouter)

app.listen(3000, () => {
    console.log('server 3000 portunda ayaga kalkti');
})