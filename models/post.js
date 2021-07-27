const mongoose = require('mongoose');
// const User = require('./user');
const Comment = require('./comment');
const postSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //including arrays of ids of all comments in this post schema itself
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]

},{
    timestamps: true
});
const Post = mongoose.model('Post',postSchema);
module.exports = Post;