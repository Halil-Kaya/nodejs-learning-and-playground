const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('database e baglanildi');
    })
    .catch((err) => console.log('baglantida hata oldu ' + err))


//datalari internetten aldim o kisimda id kismi string olarak geliyor o yuzden schema ma bunu belirtiyorum
const userSchema = new Schema({ _id: String }, { collection: 'user' })
const User = mongoose.model('user', userSchema)


/* 
    Find metodu soyle ilk parametre sorgu,2.parametre hangi kisimlari gelsin yani select kismi,
    3. kisim ise gelen data hakkinda (limit,skip islemleri)
*/

User.find().then(tumUserlar => {
    console.log(tumUserlar);
})


//####################################################################################################

User.find({ age: 23 }).then(tumUserlar => {
    console.log(tumUserlar);
})

//####################################################################################################

User.find({ age: 23 }).countDocuments().then(result => {
    console.log("tane kullanci var: " + result);
})

//####################################################################################################

//gelmesini istediklerime 1 yaziyorum NOT id yinede geliyor eger id nin gelmesini istemiyorsam _id:0 yazmam yeterli
//eger sadece gelmeyeceklerini soylersen yani { name: 0, company: 0 } yazsaydim name ve company disinda hepsi gelirdi 
User.find({ age: 23 }, { name: 1, company: 1 }).then(tumUserlar => {
    console.log(tumUserlar);
})

//####################################################################################################

//3 tane eleman gelsin ve 1 tane ileri gitsin
User.find({ age: 23 }, { _id: 0, address: 1, name: 1 }, { skip: 1, limit: 3 }).then(tumUserlar => {
    console.log(tumUserlar);
})


//####################################################################################################
//BURASI COK IYI BUNLARI SU SEKILDE KULLANABILIRSIN
//eger sort kisminda name : -1 dersem tam tersi siraliyacak
User.find({ age: 23 }).limit(3).skip(1).sort({ name: 1 }).select({ name: 1, address: 1 })
    .then(r => {
        console.log(r);
    })


//####################################################################################################
//id ye gore bulma NOT : BURDA ID KISI STRING OLARAK TUTULUYOR SCHEMA KISMINDA ID NINDE STRING OLDUGUNU BELIRTTIM
User.findById('602e8391d32eee06a2987b31')
    .then(r => {
        console.log(r);
    })
    //####################################################################################################
    //kullanicilar tablomda datalarin id kismi Object Id
let kullaniciSchema = new Schema({}, { collection: 'kullanici' })
let kullanici = mongoose.model('kullanici', kullaniciSchema)

kullanici.findById('602e8accef40898948e4137f')
    .then(r => {
        console.log(r);
    })


//####################################################################################################

//ilk buldugunu getir ve sadece age ve name kisimlarini getir
kullanici.findOne({ age: 23 }, { age: 1, name: 1 })
    .then(user => {
        console.log(user);
    })

//####################################################################################################
//karsilastirma oporetorleri

//eq : esitlik
//nq : esit olmayan
//gt : buyuk olan
//gte : buyuk ve esit olan
//lt : az olan
//lte : az ve esit olan
//in : icinde olan
//nin : icinde olmayan

//burda yasi 25 ve 35 arasindakileri [25 ve 35 dahil] getiriyorum
kullanici.find({ age: { $gte: 25, $lte: 35 } }, { name: 1, age: 1 })
    .then(r => {
        console.log(r);
    })

//yasi 25 olanlari getir
kullanici.find({ age: { $eq: 25 } }, { name: 1, age: 1 })
    .then(r => {
        console.log(r);
    })

//yasi 25 olmayanlari getir
kullanici.find({ age: { $ne: 25 } }, { name: 1, age: 1 })
    .then(r => {
        console.log(r);
    })

//yasi 23, 25 veya 32 olanlari getir
kullanici.find({ age: { $in: [23, 25, 32] } }, { name: 1, age: 1 })
    .then(r => {
        console.log(r);
    })

//yasi 23, 25 veya 32 olmayanlari getir
kullanici.find({ age: { $nin: [23, 25, 32] } }, { name: 1, age: 1 })
    .then(r => {
        console.log(r);
    })

//####################################################################################################

//Mantiksal and ve or sorgulari

//and kullanimi
kullanici.find().and([{ age: 36 }, { eyeColor: 'brown' }])
    .then(r => {
        console.log(r);
    })

//or kullanimi
kullanici.find().or([{ age: 36 }, { eyeColor: 'brown' }])
    .then(r => {
        console.log(r);
    })

//hem and hemde or kullanimi
kullanici.find().select({ name: 1, eyeColor: 1, age: 1, isActive: 1 })
    .and([{ age: { $gte: 28 } }, { isActive: true }])
    .or([{ age: 36 }, { eyeColor: 'brown' }])
    .limit(5)
    .then(r => {
        console.log(r);
    })

//####################################################################################################
//sayfalama yaparken

const sayfaNumarasi = 2
const sayfaBasinaGonderi = 10
kullanici
    .find({})
    .select({ email: 1 })
    .skip((sayfaNumarasi - 1) * sayfaBasinaGonderi)
    .limit(sayfaBasinaGonderi)
    .then(r => {
        console.log(r);
    })


//####################################################################################################
//GUNCELLEME YAPIYORUM
//burda onemli olan kisim su suan bu islem calismiyacak cunku schema kisminda age tanimli degil o yuzden kullanici schemami guncelliyorum ve age i ekliyorum

kullaniciSchema = new Schema({ age: Number, eyeColor: String }, { collection: 'kullanici' })
kullanici.schema = kullaniciSchema


//bu bana guncellenmis halini degil onceki halini doner
kullanici
    .findByIdAndUpdate('602e8accef40898948e41385', { age: 40 })
    .then(r => {
        console.log(r);
    })

//girdigim parametre sayesinde bu bana guncellenmis halini doner
kullanici
    .findByIdAndUpdate('602e8accef40898948e41385', { age: 40 }, { new: true })
    .then(r => {
        console.log(r);
    })


//!! overwrite cok tehlikeli veriyi komple silip ustune yazar yani artik sonuc sadece age olur diger kisimlar silinir
kullanici
    .findByIdAndUpdate('602e8accef40898948e41385', { age: 40 }, { overwrite: true })
    .then(r => {
        console.log(r);
    })

//updateMany de ayni mantik
//deleteOne ve deleteMany de ayni mantik