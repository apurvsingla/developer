// express
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;
// sass
const sassMiddleware = require('node-sass-middleware');
//layouts
const expressLayouts = require('express-ejs-layouts');
//db
const db = require('./config/mongoose');
const client = require('./config/mongo');
//passport
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth-strategy');
const passportFacebook = require('./config/passport-facebook-strategy');

//using sass middleware
app.use(sassMiddleware({
    /* Options */
    src: './assets/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'extended',
    prefix: 'css'
}));

// accessing form data and setting the static files like css
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./assets'));

//assign cookie parser
app.use(cookieParser());
//using and setting layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'Social',

    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }),
    function(err) {
        console.log(err || 'connect-mongodb setup ok');
    }
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


//using routes folder
app.use('/', require('./routes'));


//running port
app.listen(port, (err) => {
    if (err) {
        console.log('Error in running port', port);
        return;
    }
    console.log('Server running on Port: ', port);
});