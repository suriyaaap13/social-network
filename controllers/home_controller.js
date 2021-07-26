const Post = require('../models/post');
const User = require('../models/user')


//rendering the home page with posts
module.exports.home =async function(req,res){

    try{
        //populating the user of post
        let posts =await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});
            return res.render('home',{
            title: "SocNet | Home",
            posts: posts,
            all_users: users
        });

    }catch(err){
        console.log('Error',err);
        return;

    }

    

        
        


}