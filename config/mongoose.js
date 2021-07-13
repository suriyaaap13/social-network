const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social_network_db');

const db = mongoose.connection;

db.on('Error',console.error.bind(console,'Error connecting db'));

db.once('open',function(){
    console.log('Connnected to the database:: mongodb');
});

module.exports = db;