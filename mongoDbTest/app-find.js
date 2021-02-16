const { MongoClient, ObjectID } = require('mongodb')


const databaseURL = "mongodb://localhost:27017"
const databaseName = 'node-dersleri'

MongoClient.connect(databaseURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {

        console.log('database baglandi islem basarili!');

        const db = result.db(databaseName)

        //find 'in ilk parametresi sorgu, 2. parametresi ise ozellikler burda limit: 6 dedim yani 6 tane getir
        db.collection('users').find({ ad: 'halil' }, { limit: 6 }).toArray()
            .then(response => {
                console.log(response);
            })

        //2. parametredeki limiti bu sekilde de yazabilirim!
        db.collection('users').find({ ad: 'halil' }).limit(6).toArray()
            .then(response => {
                console.log(response);
            })


        //sorgumun sonucunda kac tane data var onu buluyorum
        db.collection('users').find({ ad: 'halil' }).count()
            .then(result => {
                console.log(result)
            })

        //ilk buldugu elemani getiriyor eger kisi yoksa null donuyor
        db.collection('users').findOne({ ad: 'halil' })
            .then(response => {
                console.log(response);
            })

        //id sine gore getiriyorum id si database te string olarak degil bir obje olarak tutuluyor o yüzden obje olusturup karsilastirarak buluyorum
        db.collection('users').findOne({ _id: new ObjectID('602b047b74d50e515aadf384') })
            .then(response => {
                console.log(response);
            })



    })
    .catch(err => console.log(err))