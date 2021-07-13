const User = require('../models/user');

//render the profile page
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: "User Profile"
    })
}

//render the sign-in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "SocNet | Sign In"
    });
}


//render the sign-up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "SocNet | Sign Up"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

     User.findOne({email: req.body.email},function(err,user){
         if(err){
             console.log('Error in finding the user');
             return;
         }
         if(!user){
             User.create(req.body,function(err,user){
                 if(err){
                     console.log('Error in creating the user');
                 }
                 return res.redirect('/users/sign-in');
             })
         }else{
             return res.redirect('back');
         }

     })

}

//get the sign-in data and create-session for the user
module.exports.createSession = function(req,res){
    //TODO Later
}