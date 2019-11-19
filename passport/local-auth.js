const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../modelos/user');



passport.serializeUser((user, done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id, done)=>{
  const user =  await User.findById(id);
    done(null,user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contraseña',
  
    passReqToCallback:true

}, async (req, usuario, contraseña, done)=>{
            const newUser= new User();
            newUser.usuario = usuario;
            newUser.contraseña = contraseña;
            await newUser.save();
            done(null, newUser);
       
        }));
       
passport.use('local-signin',new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contraseña',
    passReqToCallback:true 

}, async (req, usuario, contraseña, done) =>{
    const user = await  User.findOne({usuario:usuario, contraseña: contraseña});
    if(!user){
         return done(null, false, req.flash('signinMessage',
         'el usuario no existe'));    
    }

    done(null, user);
}));
