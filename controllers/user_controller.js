const User = require('../models/user');

//render the profile page
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err, user){
        console.log(user);
        return res.render('user_profile',{
            title: "User Profile",
            profile_user: user
        });
    });
    
}

//updating the user profile-info
module.exports.update = async function(req,res){

    if(req.user.id==req.params.id){


        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*****multer error',err);
                }
                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    user.avatar = User.avatarPath+'/'+req.file.filename;
                    
                }
                user.save();
                return res.redirect('back');

            });
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
        
    }else{
        return req.flash('error','Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

//render the sign-in page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: "SocNet | Sign In"
    });
}


//render the sign-up page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
    req.flash('success','logged in successfully');
    return res.redirect('/');
}

module.exports.signOut = function(req,res){
    req.logout();
    req.flash('success','logged out successfully');
    return res.redirect('/');
}