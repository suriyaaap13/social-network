const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timeStamps: true
});
const Post = mongoose.model('Post',postSchema);
module.exports = Post;