const {validationResult} = require('express-validator')
const User = require('../models/user_model')
const passport = require('passport')
require('../config/passport_local')(passport)


const loginFormunuGoster = (req,res,next) => {

    res.render('login',{layout : './layout/auth_layout'})

}

const login = (req,res,next) => {


    const errors = validationResult(req)

    if(!errors.isEmpty()){

        req.flash('validation_errors',errors.array())
        
        return res.redirect('/login')
    }

    req.flash('email',req.body.email)
    req.flash('sifre',req.body.sifre)

    passport.authenticate('local', { 
    successRedirect: '/yonetim',
    failureRedirect: '/login',
    failureFlash: true })(req,res,next)

}

const registerFormunuGoster = (req,res,next) => {

    res.render('register',{layout : './layout/auth_layout'})

}

const register =  async(req,res,next) => {

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
    }else{
        
        try{

            const _user = await User.findOne({email:req.body.email})

            if(_user){
                
                req.flash('validation_errors',[{msg : 'Bu mailden zaten var!'}])           
                req.flash('email',req.body.email)
                req.flash('ad',req.body.ad)
                req.flash('soyad',req.body.soyad)
                req.flash('sifre',req.body.sifre)
                req.flash('resifre',req.body.resifre)
             
                return res.redirect('/register') 

            }

            const newUser = new User({
                email : req.body.email,
                ad : req.body.ad,
                soyad : req.body.soyad,
                sifre : req.body.sifre,
            })

            await newUser.save()
            
            req.flash('success_message',[{msg:'Giris yapabilirsiniz'}])
            return res.redirect('/login')

        }catch(err){

            return res.redirect('/register') 

        }
    
    }


}


const forgetPasswordFormunuGoster = (req,res,next) => {

    res.render('forget_password',{layout : './layout/auth_layout'})

}

const forgetPassword = (req,res,next) => {
    console.log(req.body);
    res.render('forget_password',{layout : './layout/auth_layout'})

}

const logout = (req,res,next) => {
    req.logout()
    req.session.destroy((err) => {
        res.clearCookie('connect.sid')
        return res.redirect('/login')
    })

}

module.exports = {
    loginFormunuGoster,
    login,
    registerFormunuGoster,
    register,
    forgetPasswordFormunuGoster,
    forgetPassword,
    logout
}