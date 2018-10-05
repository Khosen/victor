const mongoose = require('mongoose');
//create schema
var UserSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },  
   
    username:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    }
});

var User = module.exports= mongoose.model('User', UserSchema);