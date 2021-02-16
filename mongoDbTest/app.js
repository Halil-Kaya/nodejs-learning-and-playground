const mongodb = require('mongodb')


// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = mongodb


const databaseURL = "mongodb://localhost:27017"
const databaseName = 'node-dersleri'


MongoClient.connect(databaseURL, { useUnifiedTopology: true, useNewUrlParser: true }, (err, result) => {

    if (err) {
        return console.log('Db ye baglanilamadi');
    }

    console.log("Db ye baglanildi");
    const db = result.db(databaseName)


    const myID = new ObjectID()
        //id nin olusturulma tarihini verir!
    console.log(myID.getTimestamp());

    //normalde veri eklerken id sini otomatik atar ama istersen bunu kendin ekleyebilirsin

    //data eklerken kendi id me gore ekliyorum id'im benim ayrica olusturma zaman bilgisini tuttugu icin onu 
    //belki isime yarar niye ayriyetten baska yerde de tutabilirim ayni burda updatedID de oldugu gibi
    //en son ne zaman update edilmis id sinden bulabilirim
    db.collection('test').insertOne({
        _id: myID,
        ad: 'Halil',
        updatedID: myID
    }).then(result => console.log(result.ops))


    //#########################################################################################################


    //##DATA EKLEME

    db.collection('users').insertOne({
        ad: 'emre',
        yas: 15,
        isMale: true
    }, (err, result) => {
        if (err) {
            console.log('veri eklenemedi');
        } else {
            //ops eklenen datayi, insertedCount ise eklenen data sayisini veriyor!
            console.log(result.ops, result.insertedCount);
        }
    })

    //##DATA EKLEME-2

    //bunu boyle yazmak zorunda degiliz aynisini promise ile yapabiliriz
    db.collection('users').insertOne({
            ad: 'halil',
            yas: 23
        }).then(resp => console.log(resp.ops))
        .catch(err => console.log(err))


    //##COKLU DATA EKLEME
    db.collection('users').insertMany([
            { ad: 'halil', okul: 'ege' },
            { ad: 'hal', okul: 'qq' },
            { ad: 'hil', okul: 'sfw' },
            { ad: 'halil', il: 'ankara' },
        ]).then(result => console.log(result.ops))
        .catch(err => console.log(err))



})