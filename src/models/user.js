const mongoose = require('mongoose');
const validator = require('validator');

//creating a user model
const User = mongoose.model('User',{
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error('Please a enter a valid email');
            }
        }
    },
    password:{
        type:String,
        required:true,
        min:7
        }
    });


module.exports = User;