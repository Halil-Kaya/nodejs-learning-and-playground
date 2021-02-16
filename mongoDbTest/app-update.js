const { MongoClient, ObjectID } = require('mongodb')


const databaseURL = "mongodb://localhost:27017"
const databaseName = 'node-dersleri'

MongoClient.connect(databaseURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {

        console.log('database baglandi islem basarili!');

        const db = result.db(databaseName)

        //update yapiyorum ilk parametre sorgu 2. parametre neyi degistircem. ayrica 
        //set in icine giren kisim sadece degisiyor diger kisimlar kaybolmuyor
        db.collection('users').updateMany({ ad: 'emre' }, {
            $set: {
                ad: 'yeni isim'
            },
            $inc: { //inc fonksiyonu degeri attirmami sagliyor burda yasi var olan degerinden 50 attir demis oluyorum
                yas: 50,
            }
        }).then(result => {
            console.log(result);
        })


        //birde updateOne metodu var onun mantigi da ilk buldugunu guncellemek


    })
    .catch(err => console.log(err))