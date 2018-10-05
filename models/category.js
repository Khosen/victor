const mongoose = require('mongoose');
//create schema
const categorySchema = mongoose.Schema({
    
    categoryName:{
        type: String,
        required:true
    },
   categoryId:{
        type: Number,
        required:true
    }
});

const category = module.exports= mongoose.model('category', categorySchema);