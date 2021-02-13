const express = require('express')
const app = express()

/*
BURDA SUNU YAPIYORUM BUTUN ISTEKLERDE ISTEGIN GELDIGI ZAMANI EKRANA YAZDIRIYORUM
*/

app.use((req, res, next) => {
    //middleware kisminda requeste zaman diye yeni property ekliyorum
    req.zaman = new Date()
    next()
})


app.get('/', (req, res) => {
    //middle ware kisminda propertyim eklendigi icin zamani gorebilecegim
    console.log(req.zaman);
    res.send(`istek atilma zamani: ${req.zaman}`)
})



app.listen(3000, () => {

    console.log('3000 port dinleniyor');

})