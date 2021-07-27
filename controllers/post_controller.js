const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data:{
                    post: post
                },
                message: "Post Created!"
            });
        }

        req.flash('success','post created successfully');
        return res.redirect('back');
        
    }catch(err){
        req.flash('error','post failed to create')
        console.log('Error',err);
    }
    
}

//delete post function
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);


        //.id converting the object id to string
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });
            }

            req.flash('success','post deleted along with the comments');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error','you cannot delete this post');
        console.log('Error',err);
    }
    

}