const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const User = require('./models/user');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// const { Store } = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


app.use(express.urlencoded());
app.use(cookieParser());



// app.use(express.static('assets'));
app.use(express.static(path.join(__dirname, '/assets')));

//make the uploads path avaliable to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(expressLayouts);



app.set('layout extractStyles',true);
app.set('layout extractScript',true);

//set up the view engine

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));



//using express-session
app.use(session({
    name: 'social_network',
    secret: 'ganesh',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    //using mongo-store to store the session cookie in the db
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err||'connect-mongodb setup completed');
        }
    )

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use flash library
app.use(flash());
app.use(customMware.setFlash);


//use express router
app.use('/',require('./routes'));





app.listen(port,function(err){
    if(err){
        console.log("Error int running the server:",err);
    }
    console.log("The server is up and running in the port",port);
});
