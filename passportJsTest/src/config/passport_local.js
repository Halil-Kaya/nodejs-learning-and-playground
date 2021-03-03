const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user_model')

module.exports = function(passport){

    const options = {
        usernameField : 'email',
        passwordField : 'sifre'
    }
    passport.use(new LocalStrategy(options,async (email,sifre,done) => {

        try{

            const _user = await User.findOne({email : email})
            
            if(!_user){
                return done(null,false,{message : 'Boyle bir kullanici yok'})
            }

            if(_user.sifre !== sifre){
                return done(null,false,{message : 'Sifre Hatali'})
            }

            return done(null,_user)

        }catch(err){

            return done(err)
        
        }

    }))

    //passport ile giris yaptiktan sonra sessiona yazilan kisim
    passport.serializeUser((user,done) => {
        console.log('sessiona kaydedilen userin id si : ' + user.id);
        done(null,user.id)
    
    })

    //sessiondan okunan kisim
    passport.deserializeUser((id,done) => {
        console.log('sessiondan okunan id : ' + id);
        User.findById(id,(err,user) =>{
            console.log(user);
            
            done(err,{
                id: user.id,
                email : user.email,
                ad : user.ad,
                soyad : user.soyad
            })

        })

    })

}