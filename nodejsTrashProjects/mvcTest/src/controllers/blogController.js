const axios = require('axios')

const tumMakaleleriGetir = async(req, res, next) => {

    let sayfalama = ""
    let aktifPage = 1

    if(req.query.page){
        sayfalama = "page=" + req.query.page
        aktifPage = req.query.page
    }

    try {

        const blogAPI = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?per_page=20&'+sayfalama)
        return res.render('./makaleler/index.ejs',{makaleler : blogAPI.data,sayfalama:blogAPI.headers,aktifPage})

    } catch (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
        res.json({
            message: err.response.data
        })
    }


}

const tekMakaleGetir = async(req, res, next) => {


    const makaleId = req.params.makaleId

    try {

        const tekMakale = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts/' + makaleId)
        return res.render('./makaleler/makale.ejs',{makale:tekMakale.data})

    } catch (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
        return res.json({
            message: err.response.data
        })
    }

}

const aramaYap = async (req,res,next) => {

    const aranacakKelime = req.body.search

    let sayfalama = ""
    let aktifPage = 1

    if(req.query.page){
        sayfalama = "page=" + req.query.page
        aktifPage = req.query.page
    }

    try {

        const makaleler = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?search='+aranacakKelime)
        return res.render('./makaleler/index',{makaleler:makaleler.data,sayfalama:makaleler.headers,aktifPage})

    } catch (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
        return res.json({
            message: err.response.data
        })
    }

}

module.exports = {
    tumMakaleleriGetir,
    tekMakaleGetir,
    aramaYap
}