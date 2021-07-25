const Comment = require('../models/comment');
const Post = require('../models/post');
// const passport = require('passport');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comments){
                post.comments.push(comments);
                post.save();
                return res.redirect('/');
            });
        }else{
            return res.redirect('/');
        }
    });
}

//to delete a comment from a post
module.exports.destroy = function(req,res){

    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            let postId = comment.post;
            // console.log(comment.post);
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}},function(err,post){
                return res.redirect('back');
            });
        // }else if(comment.post==req.user.id){
        //     console.log(comment.post);
        //     let postId = comment.post;
        //     comment.remove();
        //     Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}},function(err,post){
        //         return res.redirect('back');
        //     });
        }else{
            // if(postId.user.id==req.user.id){
            //     console.log('works'+comment.post);
            //     let postId = comment.post;
            //     comment.remove();
            //     Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}},function(err,post){
            //         return res.redirect('back');
            //     });
            // }
            console.log(comment.post);
            return res.redirect('back');
        }

        
    });
}
