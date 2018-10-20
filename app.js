const express = require('express'),
app = express(),
 server = require('http').createServer(app);  
port = process.env.PORT || 3000;
const bodyParser = require ('body-parser');
const path = require('path');
//const config = require('./config')();
//const configdb= require('./config/database');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const passport = require('passport');
const flash= require('connect-flash');

var urlencodedParser = bodyParser.urlencoded({ extended: true });

 //database
//mongoose.connect(configdb.database)
//let db = mongoose.connection;

//check connections
//db.once('open', function(){
 // console.log('Connected to Mongodb');
//});
//check for db errors
//db.on('error', function(err){
 // console.log(err);
//});

//set template engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//require('./config/passport') (passport);



//define static path to use css files etc
app.use(logger('dev'));
//body parser and cookie parser middleware
app.use(bodyParser.urlencoded({extended: false}));
//parse application json
app.use(bodyParser.json());
//app.use(express.bodyParser({uploadDir:'./uploads'}));

app.use(cookieParser('secret'));

//define static folders u will use
app.use(express.static(path.join(__dirname, 'node_modules')));
//app.use(express.static(path.join(__dirname +'/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public')));

//express messages middleware
app.use(session({ 

  secret: 'secret',
  resave: true,
  saveUninitialized: true
   // cookie: { secure:true  }
}));
 
//express messages middleware
 app.use(require('connect-flash')());
 app.use(function (req, res, next){
   res.locals.messages = require('express-messages')(req, res);
   next();
 });
app.use(flash());

 

  //express validator middleware
  app.use(expressValidator({
    errorFormatter: function (param, msg, value){
      var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

      while(namespace.length){
        formParam  += '['+ namespace.shift() + ']';
      }
      return{
        param: formParam,
        msg: msg,
        value: value
      };
    }
  }));

//passport config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('*', function(req, res, next){
  res.locals.user = req.user||null;
 // console.log(req.user);
  next();

});


//call all the routes
let  routes= require('./routes/index');
let pages = require('./routes/pages');

//let imgupload = require('./routes/upload');
app.use('/', routes);
app.use('/pages', pages);



server.listen(port, function(req, res) {
    //console.log('todo list RESTful API server started on: ' + port);
   // console.log(new Date(Date.now()).toISOString());
   console.log("ok");
    
});

