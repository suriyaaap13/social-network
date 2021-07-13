const cookieParser = require('cookie-parser');
const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const User = require('./models/user');
const db = require('./config/mongoose')


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('assets'));
app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views','./views');

app.set('layout extractStyles',true);
app.set('layout extractScript',true);
//use express router
app.use('/',require('./routes'));

//set up the view engine



app.listen(port,function(err){
    if(err){
        console.log("Error int running the server:",err);
    }
    console.log("The server is up and running in the port",port);
});
