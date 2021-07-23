const Post = require('../models/post');


//rendering the home page with posts
module.exports.home = function(req,res){
    // Post.find({},function(err,posts){
    //     if(err){
    //         console.log('Error in connecting to home controller');
    //     }
    //     return res.render('home',{
    //         title: "SocNet | Home",
    //         posts: posts
    //     });
    // });

    //populating the user of post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){
        if(err){
            console.log('Error in connecting to home controller');
        }
        return res.render('home',{
            title: "SocNet | Home",
            posts: posts
        });
    });

}