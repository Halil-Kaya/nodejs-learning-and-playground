const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/restful_api', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('database baglanildi'))
    .catch((err) => console.log('hata! : ' + err))