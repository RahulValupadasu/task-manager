const mongoose = require('mongoose');
const validator = require('validator');


//creating a tasks model
const task = mongoose.model('task',{
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    completed:{
        type:Boolean,
        default:false
    }
});

module.exports = task