const mongoose = require('mongoose');

//create schema
const nomineeSchema = mongoose.Schema({

    firstname:{
        type:String,
        required:true,
        trim:true
    },
    surname:{
        type:String,
        required:true,
        trim:true
    },
    stagename:{
        type:String,
        required:true,
        trim:true
    },
    recordlabel:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String,
        required:true,
        trim:true
    },
    country:{
        type:String,
        required:true,
        trim:true
    },
    albumtitle:{
        type:String,
        required:true,
        trim:true
    },
    producer:{
        type:String,
        required:true,
        trim:true
    },
    tracktitle:{
        type:String,
        required:true,
        trim:true
    },
    songwriter:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:false,
        trim:true
    },
    othercategory:{
        type:String,
        required:false,
        trim:true
    },
    socialmedia:[{
        fb:{
            type:String,
            required:true,
            trim:true
        },
        what:{
            type: Number,
            required: true,
            trim:true
        },
        insta:{
            type: String,
            required:true,
            trim:true                                                                                                                                                                                                                      
        },
        twit:{
            type: String,
            required:true,
            trim:true
        }
      } ],
     songs:[], 
       dateofentry: { type: Date, default: Date.now,   trim:true }
       
});


const nominee = module.exports = mongoose.model('nominee', nomineeSchema);