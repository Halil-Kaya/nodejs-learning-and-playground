const express = require('express')
const kullaniciRouter = require('./router/kullanici_router')
const mainRouter = require('./router/main_router')

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))


app.use('/users', kullaniciRouter)
app.use('/', mainRouter)


// eger /asd pathine istekte bulunursa sistem ona bunu bulamadigini soyluyor bunu kendime gore ayarlayabilirim
//bunu middleware olarak ekliyorum ama burdaki asil nokta bunun sirasinin en sonda olmasi!
//sira en sonda oldugu icin en son buna girecek
app.use((req, res) => {
    //boylece /users ve / end pointi disinda istek atilirsa buraya girecek
    res.status(404).send('girdiginiz link bulunamadi!') //gercekten cok harika bir sey!
        //hatta bu kismi da router olarak ekleyebilirsin!
})


app.listen(3000, () => {
    console.log('server 3000 portunu dinliyor');
})