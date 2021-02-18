const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('database e baglanildi');
    })
    .catch((err) => console.log('baglantida hata oldu ' + err))


const userSchema = new mongoose.Schema({
    isim: String
})

const User = mongoose.model('user', userSchema)

const emre = User({ isim: 'Halil' })


emre.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    })