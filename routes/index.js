//'use strict';

var express = require('express');
var router = express.Router();

//bring in niominee model

//let Nominee = require("../models/nominee");
//let Category = require("../models/category");

router.get('/', function(req, res){
 
  //var nominee={}; //Create Empty order Object
 // var category={}; //Create Empty product Object

 /* Category.find({}, function(err, allcategory,next){
    if(err){
        console.log(err +"heree");
    }else{
        //console.log("loaded?" +docs);
        //push the awrd types to ejs view
        category=allcategory;    
        //console.log(docs +"error here");
    }
  
}).limit(5);

  Nominee.aggregate([{$sample: {size:4}}, {$project:{_id:0, stagename:1, tracktitle:1, category:1}}], function(err, docs){
    if(err){
      console.log(err);
    }else{
      nominee=docs;
     // console.log(docs + category);
      res.render('index', {category:category, artiste:nominee});
    }
  });*/
  res.render('index');
  });
 
  
module.exports = router;
