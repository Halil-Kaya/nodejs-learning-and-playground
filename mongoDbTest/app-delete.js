const { MongoClient, ObjectID } = require('mongodb')


const databaseURL = "mongodb://localhost:27017"
const databaseName = 'node-dersleri'

MongoClient.connect(databaseURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {

        console.log('database baglandi islem basarili!');

        const db = result.db(databaseName)


        //yaptigi islem belli aslinda parametre olarak girilen sorgudakileri siliyor
        db.collection('users').deleteMany({
            ad: 'halo'
        }).then(result => {
            console.log(result);
        })


        //birde deleteOne var onun gorevi ise ilk buldugu elemani siliyor ve islemi bitiriyor


    })
    .catch(err => console.log(err))