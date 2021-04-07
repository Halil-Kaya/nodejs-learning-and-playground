const mongoose = require('mongoose')

const connectDatabase = () => {

    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true ,useFindAndModify : false,useCreateIndex : true,useUnifiedTopology : true})
    .then(() => {
        console.log("mongo db connection successful");
    })
    .catch((err) => {
        console.error(err);
    })

}

module.exports = connectDatabase