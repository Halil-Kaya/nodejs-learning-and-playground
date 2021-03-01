const {validationResult} = require('express-validator')


const loginFormunuGoster = (req,res,next) => {

    res.render('login',{layout : './layout/auth_layout'})

}

const login = (req,res,next) => {

    console.log(req.body);
    res.render('login',{layout : './layout/auth_layout'})

}

const registerFormunuGoster = (req,res,next) => {

    res.render('register',{layout : './layout/auth_layout'})

}

const register = (req,res,next) => {

    const errors = validationResult(req)
    //console.log(errors);
    if(!errors.isEmpty()){
        console.log(errors.array());
        
        req.flash('validation_errors',errors.array())
        req.flash('email',req.body.email)
        req.flash('ad',req.body.ad)
        req.flash('soyad',req.body.soyad)
        req.flash('sifre',req.body.sifre)
        req.flash('resifre',req.body.resifre)
        res.redirect('/register') 

        //res.render('register',{layout : './layout/auth_layout',errors : errors.array()})
    }


}


const forgetPasswordFormunuGoster = (req,res,next) => {

    res.render('forget_password',{layout : './layout/auth_layout'})

}

const forgetPassword = (req,res,next) => {
    console.log(req.body);
    res.render('forget_password',{layout : './layout/auth_layout'})

}

module.exports = {
    loginFormunuGoster,
    login,
    registerFormunuGoster,
    register,
    forgetPasswordFormunuGoster,
    forgetPassword
}