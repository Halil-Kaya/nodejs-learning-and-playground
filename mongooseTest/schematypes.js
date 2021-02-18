const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('database e baglanildi');
    })
    .catch((err) => console.log('baglantida hata oldu ' + err))

const schema = new Schema({ name: String })
console.log(schema.path('name') instanceof mongoose.SchemaType); //true
console.log(schema.path('name') instanceof mongoose.Schema.Types.String); //true
console.log(schema.path('name').instance); //string


//#########################################################################################################

const numberSchema = new Schema({
    integerOnly: {
        type: Number,
        get: v => {
            console.log('getter tetiklendi v: ' + v);
            return Math.round(v)
        },
        set: v => {
            console.log('setter tetiklendi v: ' + v);
            return Math.round(v)
        },
        alias: 'i'
    }
})

const Numara = mongoose.model('Numara', numberSchema)

let doc = new Numara()
doc.integerOnly = 2.015 //2
console.log(doc.integerOnly); //2
console.log(doc.i); //2



//#########################################################################################################


const metinSchema = new Schema({
    metin: {
        type: Schema.Types.String,
        required: true, // kesin olacak
        trim: true, //sol ve sag bosluklari sil
        lowercase: true, // kucuk harve donustur
        minlength: 4, //en az 4 harf
        maxlength: 50, // max 50 harf
        enum: ['emre', 'hasan', 'ayse', 'can'], // bu degerlerden biri olacak
        validate: { //kendi validate imi de yazabilirim burda basit olarak uzunlugu 2 den buyuk olacak dedim
            validator: function(v) {
                return v.length > 2
            },
            message: 'burada takildi' //eger validate hatali olursa hata olarak ekrana bunu basacak
        }
    }
})

const Metin = new mongoose.model('Metin', metinSchema)
const m1 = Metin({ metin: 'hasan' })

//save diyince veri tabanina kaydediyorum
m1.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    })

//#########################################################################################################

const oyuncakSchema = new Schema({
    adi: String
})

const oyuncakKutusuSchema = new Schema({
    oyuncaklar: {
        type: [oyuncakSchema],
        default: undefined
    },
    oyuncakRenkleri: [String]
})

const OyuncakKutusu = mongoose.model('OyuncakKutu', oyuncakKutusuSchema)

const oyuncakKutum = new OyuncakKutusu()
oyuncakKutum.oyuncaklar = [{ adi: 'deneme' }, { adi: 'deneme2' }]
oyuncakKutum.oyuncakRenkleri = ['mavi', 'yesil']
console.log(oyuncakKutum.oyuncaklar);
console.log(oyuncakKutum);

oyuncakKutum.save()


//#########################################################################################################
//burasi baya iyi

const root = 'https://s3.amazonaws.com/mybucket'

const userSchema = new Schema({
    name: String,
    picture: {
        type: String,
        get: v => `${root}${v}`
    }
})

const User = mongoose.model('User', userSchema)
const doc = new User({ name: 'Val', picture: '/123.png' }) //picture kismina /123.png olarak ekliyorum

console.log(doc.picture); //https://s3.amazonaws.com/mybucket/123.png // datayi getirirken bu sekilde getiriyor
console.log(doc.toObject({ getters: false })); // bunun anlami butun objeyi getir ama getters kismini kapat
console.log(doc.toObject({ getters: false }).picture); // getters i kapattigim icin /123.png donecek