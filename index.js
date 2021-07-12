const express = require('express');
const port = 8000;

const app = express();

app.use('/',require('./routes'));

app.set('view engine', 'ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log("Error int running the server:",err);
    }
    console.log("The server is up and running in the port",port);
});
