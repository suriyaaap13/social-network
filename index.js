const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');


app.use(expressLayouts);
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
