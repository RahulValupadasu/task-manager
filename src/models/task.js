const mongoose = require('mongoose');
const User = require('../models/user');
const validator = require('validator');




//TASK Schema
const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,

    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    }
});
//creating a tasks model
const Task = mongoose.model('Task',taskSchema);



module.exports = mongoose.model('Task', taskSchema);;