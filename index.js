const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')


app.use(express.static('assets'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScript',true);
//use express router
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log("Error int running the server:",err);
    }
    console.log("The server is up and running in the port",port);
});
