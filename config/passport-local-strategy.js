const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//Authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done){
        //find a user and establish the identity
        User.findOne({email: email},function(err,user){
            if(err){
                console.log('Error in Finding User->Passport');
                return done(err);
            }
            if(!user||user.password!=password){
                console.log('Invalid Username?Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));
//serializing the user to decide which key is to be in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding the user->Passport');
            return done(err);
        }
        return done(null,user);
    });
});


//setting passport functions
passport.checkAuthentication = function(req,res,next){
    //if user is signed in
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the signed in user from the sessioncookie and we are just sending this to locals for views.
        res.locals.user = req.user;
    }
    next();
}

module.export = passport;