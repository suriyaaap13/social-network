const Post = require('../models/post');


//rendering the home page with posts
module.exports.home = function(req,res){
    // return res.render('home',{
    //     title: "Home"
    // });
    Post.find({},function(err,posts){
        if(err){
            console.log('Error in connecting to home controller');
        }
        return res.render('home',{
            title: "SocNet | Home",
            posts: posts
        });
    });
}