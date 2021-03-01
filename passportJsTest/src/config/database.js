const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{useUnifiedTopology : true,useNewUrlParser : true,useCreateIndex : true,useFindAndModify : true})
    .then(() => console.log('veri tabanina baglanildi'))
    .catch(err => console.log('error : ' + err))