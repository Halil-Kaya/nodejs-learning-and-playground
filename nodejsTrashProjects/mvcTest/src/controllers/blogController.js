const axios = require('axios')

const tumMakaleleriGetir = async(req, res, next) => {

    console.log('tumMakaleleriGetir calisti');

    try {

        const blogAPI = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts')
    } catch (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
        res.json({
            message: err.response.data
        })
    }

    res.render('./makaleler/index.ejs')

}

const tekMakaleGetir = async(req, res, next) => {

    console.log('tekMakaleGetir calisti');

    const makaleId = req.params.makaleId

    try {

        const tekMakale = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts/' + makaleId)
        console.log('+');

    } catch (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
        return res.json({
            message: err.response.data
        })
    }

    res.render('./makaleler/makale.ejs')


}


module.exports = {
    tumMakaleleriGetir,
    tekMakaleGetir
}