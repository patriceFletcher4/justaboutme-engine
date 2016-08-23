var passport = require('passport');
var LocalStrtegy = require('passport-local').Strategy;
var mongoose = require('mongoose');

passport.use(new LocalStrategy({
  usernameField: 'email'
},
 function(username, password, done){
   User.findOne({email: username}, function(err, user){
     if(err){
       return done(err);
     }
     if(!user){
       return done(null, false);
     }
     if(!user.validPassword(password)){
       return done(null, false, {
         msg: 'password or username is incorrect'
       });
     }
     return done(null, user);
   });
 }
));
