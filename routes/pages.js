const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const nses= require('nodemailer-ses-transport');
var AWS=require('aws-sdk');
process.env.AWS_SDK_LOAD_CONFIG=2
const ses = new AWS.SES();
//const aws = require('node-ses'), 
 //client = aws.createClient({ key: process.env.SMTP_Username, secret:process.env.SMTP_Password });
require('dotenv').config();

//bring in user model

// User = require('../models/user');
//bring in categories model
//let Category = require('../models/category');
//bring in nominee model
//let Nominee = require('../models/nominee');
//register form
router.get('/register', function(req, res){
    res.render('register');
});
//form regist for admin new user
router.post('/register', function(req, res){
    const name= req.body.name;
    const username= req.body.username;
    const  password = req.body.password;
    const password2 = req.body.password2;
  
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password id required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
   
let errors = req.validationErrors();
if(errors){
res.render('register',{
errors:errors

});
console.log(req.body.name);
}  else {
let newUser = new User({
    name:name,
    username:username,
    password:password
});

bcrypt.genSalt(10, function(err,salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
            console.log(err);
        }
        newUser.password=hash;
        newUser.save(function(err){
            if(err){
                console.log(err);
                return;
            } else{
                req.flash('success', 'You are now registered and can log in');
                res.redirect('/pages/login');
            }
        });
      

    });
});
}
 
});



router.get('/winners', function(req, res){
    res.render('winners');
});



router.get('/performances', function(req, res){
    res.render('performances');
});


router.get('/sponsor', function(req, res){
    res.render('sponsor');
});

//sponsor form to send mail

router.post('/sponsor', function(req, res){
    
    var transporter = nodemailer.createTransport(ses({
        
        accessKeyId: process.env.SMTP_Username,
        secretAccessKey: process.env.SMTP_Password
    }));
    
    var mailOptions = {
      from:'abujapopmusic@gmail.com',
      to:  'kenyieko@gmail.com',
      subject: 'Message from APMA be a sponsor',
      text: `${req.body.name} \n Company: ${req.body.company} \n Email: ${req.body.email} \n Phone no: ${req.body.mobile}  \n says: ${req.body.comments}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
      //  console.log('Email sent: ' + info.response);
        req.flash('success', 'Thank you for your support');
        
       res.redirect('/pages/sponsor');
      }
    });  
});

//contact form to send mail
router.get('/contact', function(req, res){
    res.render('contact');
});

///contact form to send mail
router.post('/contact', function(req, res){
    //AWS.config.update({region:'us-east-1'});
    const params = {
        Destination: {
          ToAddresses: ['kenyieko@gmail.com']
        },
        Message: {
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data:
                  'This message body contains HTML formatting, like <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>.'
              },    
            Text: {
              Charset: 'UTF-8',
              Data:   `${req.body.name} \n Company: ${req.body.company} \n Email: ${req.body.email} \n Phone no: ${req.body.mobile}  \n says: ${req.body.comments}`
              
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Test email from code'
          }
        },
        ReturnPath: 'abujapopmusic@gmail.com',
        Source: 'abujapopmusic@.com'
      }
      
      ses.sendEmail(params, (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });
      req.flash('success', 'Thank you for contacting us');
      res.redirect('/pages/contact');

});
    
/*router.post('/contact', function(req, res){
    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
//port:465;
     // host: 'smtp.gmail.com',
      auth: {
        user:'kenyieko@gmail.com',
        pass: process.env.AUTH_PASS
      }
    }));
    
    var mailOptions = {
      from:'',
      to:  'kenyieko@gmail.com',
      subject: 'Mesage from APMA',
      text: `${req.body.name} \n email: ${req.body.email} \n City: ${req.body.city} \n State: ${req.body.state}  \n Zipcode: ${req.body.zipcode} \n Phone no: ${req.body.mobile} \n (${req.body.country})   \n says: ${req.body.message}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
      //  console.log('Email sent: ' + info.response);
        req.flash('success', 'Thank you for contacting us');
       res.redirect('/pages/contact');
      }
    });  
});*/

/*router.post('/contact', function(req, res){
    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
     // host: 'smtp.gmail.com',
      auth: {
        user:'kenyieko@gmail.com',
        pass: process.env.AUTH_PASS
      }
    }));
    
    var mailOptions = {
      from:'',
      to:  'kenyieko@gmail.com',
      subject: 'Mesage from APMA',
      text: `${req.body.name} \n email: ${req.body.email} \n City: ${req.body.city} \n State: ${req.body.state}  \n Zipcode: ${req.body.zipcode} \n Phone no: ${req.body.mobile} \n (${req.body.country})   \n says: ${req.body.message}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
      //  console.log('Email sent: ' + info.response);
        req.flash('success', 'Thank you for contacting us');
       res.redirect('/pages/contact');
      }
    });*/
    
        /*  let mailOpts, smtpTrans;
          smtpTrans = nodemailer.createTransport({
            service:'gmail',
            host: 'smtp.gmail.com',
            /*port: 465,
            secure: true,*/
         /*   auth: {
              user: 'kenyieko@gmail.com',
              pass: 'estherkalawe@118514'
            }
          });
          mailOpts = {
            from: req.body.name + ' &lt;' + req.body.email + '&gt;',
            to: 'kenyieko@gmail.com',
            subject: 'Sending Email using Node.js[nodemailer]',
            text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
          };
          smtpTrans.sendMail(mailOpts, function (error, response) {
            if (error) {
            //  res.render('education');
              console.log(error);
            }
            else {
              console.log('Email sent: ' + info.response);
              
              res.render('contactform');
            }
          });*/
      //  });

router.get('/merchandise', function(req, res){
    res.render('merchandise');
});



router.get('/ticket', function(req, res){
    res.render('ticket');
});


router.get('/login', function(req, res){
    res.render('login');
});


//login process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/pages/categoryform',
        failureRedirect: '/pages/login',
        failureFlash: true
    })(req, res, next);
   // console.log(req.user);
});


router.get('/category', function(req, res){

      Category.find({}, function(err, docs,next){
      if(err){
          console.log(err +"heree");
      }else{
          //console.log("loaded?" +docs);
          //push the awrd types to ejs view
          res.render('category', {category:docs});
      }
    
  });
   
});

router.get('/preaward', function(req, res){
    res.render('preaward');
});
router.get('/ceremony', function(req, res){
    res.render('ceremony');
});

router.get('/awardparty', function(req, res){
    res.render('awardparty');
});

router.get('/aboutus', function(req, res){
    res.render('aboutus');
});


router.get('/categoryform', function(req, res){
    res.render('categoryform');
});


//enter awards
router.post('/categoryform', function(req, res){
    const categoryname= req.body.categoryname;
    const categoryid = req.body.categoryid;

    req.checkBody('categoryname', 'Category name is required' ).notEmpty();
    req.checkBody('categoryid', 'Category id is required').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        res.render('categoryform',{
        errors:errors
        
        });
         }  else {
        let category = new Category({
            categoryName:categoryname,
            categoryId:categoryid
           
        });
        category.save(function(err){
            if(err){
                console.log(err);
                return;
            } else{
                req.flash('success', 'Data saved!!');
                
                res.redirect('categoryform');
            }
        });
        //console.log(req.body.categoryname);
        
    }
   
});

/*router.get('/form', function(req, res){
    res.render('form');
          
});*/

router.get('/form', function(req, res){
    //get award type from db to dropdown
Category.find({}, function(err, docs,next){
        if(err){
            console.log(err +"heree");
        }else{
            //console.log("loaded?" +docs);
            //push the awrd types to ejs view
            res.render('form',{category: docs});
            //console.log(docs +"error here");
        }
      
    }).sort({categoryName:1});

}); 
//the entry form
router.post('/form', function(req, res){
    let songs = req.body.songs;
   //convert song to array
   var re = /:\s|,\s/;
    let songsarray= new Array();
     songsarray = songs.split(re);
    //    let cat = new Category();
        
    //call db
    let nominee = new Nominee();
    
        //link to db
        nominee.firstname = req.body.fname;
        nominee.surname = req.body.surname;
        nominee.stagename = req.body.stagename;
        nominee.recordlabel = req.body.recordlabel;
        nominee.phone = req.body.phone;
        nominee.address = req.body.address;
        nominee.email =req.body.email;
        nominee.state = req.body.state;
        nominee.country = req.body.country;
        nominee.albumtitle = req.body.albumtitle;
        nominee.producer = req.body.producer;
        nominee.tracktitle = req.body.tracktitle;
        nominee.songwriter = req.body.songwriter;
        nominee.category = req.body.category;
        nominee.othercategory = req.body.othercategory;
        nominee.socialmedia=[{
            fb:req.body.fb,
            what:req.body.what,
            insta:req.body.insta,
            twit:req.body.twit
        }];
        nominee.songs =[songsarray
        ];
        nominee.dateofentry= new Date(Date.now()).toISOString();
        
        nominee.save(function(err,doc){
            if(err){
                console.log(err);
                //res.redirect('users/admin', {msg: 'artiste already exists!'});
               res.redirect(400, 'form');
                return;
            }else{
           
             //   console.log("saved");
             req.flash("success", "File Uploaded!");
             res.redirect('form');
             
            }
       
        });
    
});

//retrieve from db
router.get('/nominees', function(req, res){
    
        Nominee.aggregate( [{"$group":{"_id":"$category" , "stagename":{"$push": "$stagename"}}}, 
        {"$project":{"_id":1, "stagename":1}}],  function(err, docs){
            if(err){
                console.log(err);
            }else{
              //  console.log(docs);
              res.render('nominees', {nomineedata:docs});
            }
        });

        
});
//eensure login admin login authen
function ensureAuthenticated(req,res, next){
    if(req.isAuthenticated()){
        return next();

    }else{
        req.flash('danger', 'Please login');
        res.redirect('/pages/login');
    }
}
module.exports = router;