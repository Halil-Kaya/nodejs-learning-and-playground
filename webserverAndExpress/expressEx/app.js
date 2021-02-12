const express = require('express')
const Joi = require('@hapi/joi')

const app = express()

//req.body deki kısımları kullanmak icin bu satiri yazmak
app.use(express.json())

const kullanicilar = [
    { id: 1, ad: 'halil', yas: 21 },
    { id: 2, ad: 'fatih', yas: 23 },
    { id: 3, ad: 'murat', yas: 24 },
    { id: 4, ad: 'hasan', yas: 22 },
]


app.get('/', (req, res) => {

    console.log('ana sayfaya gidildi');
    res.send('merhaba from index')
})

app.get('/users', (req, res) => {
    console.log('users sayfasina gidildi');
    console.log(req.query);

    if (req.query.ters) res.send([...kullanicilar].reverse())
    else res.send(kullanicilar)

});

app.get('/users/:id', (req, res) => {
    const user = kullanicilar.find((item) => item.id == req.params.id)
    if (user) res.send(user)
    else res.status(404).send(req.params.id + ' id li bir kullanici yok')
});

app.post('/users', (req, res) => {

    //donen sonucun sadece error kismini aliyorum eger bir hata varsa error gelicek yoksa error un ici bos olucak
    const { error } = kullaniciBilgileriKontrol(req.body)

    if (error) {

        res.status(400).send(error.details[0].message)

    } else {

        const newUser = {
            id: kullanicilar.length + 1,
            ...req.body
        }

        kullanicilar.push(newUser)
        res.send(newUser)

    }

})

app.put('/users/:id', (req, res) => {
    const findingUser = kullanicilar.find((item) => item.id == req.params.id)

    if (!findingUser) {
        return res.status(404).send(`${req.params.id} id li kullanici bulunamadi `)
    }

    //donen sonucun sadece error kismini aliyorum eger bir hata varsa error gelicek yoksa error un ici bos olucak
    const { error } = kullaniciBilgileriKontrol(req.body)

    if (error) {

        return res.status(400).send(error.details[0].message)

    } else {

        findingUser.ad = req.body.ad
        findingUser.yas = req.body.yas
        res.send(findingUser)

    }

})

app.delete('/users/:id', (req, res) => {
    const user = kullanicilar.find(item => item.id == req.params.id)

    if (user) {
        let index = kullanicilar.indexOf(user)
        kullanicilar.splice(index, 1)
        res.send(user)
    } else {
        res.status(404).send(req.params.id + ' id li bir kullanici yok')
    }



})

const kullaniciBilgileriKontrol = (user) => {
    const schema = Joi.object({
        ad: Joi.string().min(3).max(30).required(),
        yas: Joi.number().integer().min(10).max(99).required()
    })
    return schema.validate(req.body)
}

app.listen(3000, () => {
    console.log('server 3000 portunu dinliyor');
})