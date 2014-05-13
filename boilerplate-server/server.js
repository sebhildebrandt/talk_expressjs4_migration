/**
 * ====================================================================
 * application server boilerplate
 * ====================================================================
 * (c) 2014 Sebastian Hildebrandt
 * Version  1.0
 * Date:    13.05.2014
 * ====================================================================
 */

/**
 * ==================================================
 * Module Dependencies
 * ==================================================
 */

var express         = require('express')
  , bodyParser      = require('body-parser')
  , favicon         = require('serve-favicon')
  , methodOverride  = require('method-override')  
  , cookieParser    = require('cookie-parser')
  , session         = require('express-session')  
  , sessionStore    = new session.MemoryStore

  , morgan        = require('morgan')
  , path          = require('path')
  , fs            = require('fs')
  , crypt         = require('crypto')
  , passport      = require('passport')
  ;

var token = crypt.randomBytes(48).toString('hex');
var app = module.exports = express();

/**
 * ==================================================
 * Catch Exeptions
 * ==================================================
 */

process.on('uncaughtException', function (err) {
    console.log(err);
});

/**
 * ==================================================
 * Server - Configuration
 * ==================================================
 */

// Express settings

app.set('views', path.join(__dirname, '/your/view/path'));    // view path
app.engine('.html', require('ejs').renderFile);               // view engine - link .html to ejs
app.set('view engine', 'html');                               // .html not longer requires
app.set('x-powered-by', false);                               // remove express signature
app.use(bodyParser());                                        // pull information from html in POST
app.use(cookieParser())                                       // required before session.
app.use(session({ 
    secret: token
  , key: 'sid'
  , proxy: false
  , cookie: { path: '/', secure: true,  httpOnly: false, maxAge: null}
  , store: sessionStore}));
app.use(methodOverride());          // simulate DELETE and PUT
app.use(express.static(path.join(__dirname, '/your/static/path')));
app.use(favicon(path.join(__dirname, '/your/static/path/favicon.png')));

// Development / production
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.use(morgan('dev'));
}

app.listen(8080);

/**
 * ==================================================
 * Routing
 * ==================================================
 */
