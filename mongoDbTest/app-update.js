const { MongoClient, ObjectID } = require('mongodb')


const databaseURL = "mongodb://localhost:27017"
const databaseName = 'node-dersleri'

MongoClient.connect(databaseURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {

        console.log('database baglandi islem basarili!');

        const db = result.db(databaseName)


    })
    .catch(err => console.log(err))