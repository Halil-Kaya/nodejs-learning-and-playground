const oturumAcilmis = function(req,res,next){

    if(req.isAuthenticated()){
        return next()
    }


    req.flash('error',['Oturum Acınız1'])
    res.redirect('/login')

}

const oturumAcilmamis = function(req,res,next){

    if(!req.isAuthenticated()){
        return next()
    }


    return res.redirect('/yonetim')


}

module.exports = {
    oturumAcilmis,
    oturumAcilmamis
}