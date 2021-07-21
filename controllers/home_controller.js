const User = require('../models/user');
console.log("Hello there!!");
module.exports.home = function(req,res){
    return res.render('home',{
        title: "Home"
    });
}