const mongoose = require('mongoose');
const Task = require('../models/task');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//User Schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type:Number,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error('Please a enter a valid email');
            }
        }
    },
    password:{
        type:String,
        required:true,
        min:7,
        trim:true,
        },
    //array of user tokens generated
    tokens:[{
        token:{
           type:String,
           required:true
    }
         }]
    });

    userSchema.virtual('user_tasks',{
        ref:'Task',
        localField:'_id',
        foreignField:'owner'
    })


    //attaches the method for the schema level, because we have used "statics"
    userSchema.statics.findByCredentials = async (email,password)=>{
        const user = await User.findOne({email});
        if(!user){
            console.log("no user with the given email");
            throw new Error('Unable to login');
        }
        const isValid = await bcrypt.compare(password,user.password);
        
        console.log(isValid);
        if(!isValid)
        {
            console.log("password not matching");
            throw new Error('Unable to login');   
        }
        return user;
  }
    
    //attaches method to the instance of the schema i.e document not the schema level, because we used "methods",
    //here don't use arrow function as it doesn't bind "this" binding
    userSchema.methods.generateAuthenticationTokens = async function(){
        const user = this
        const token = jwt.sign({_id: user._id.toString()},'thisisnodecourse');
        user.tokens = user.tokens.concat({token});
        await user.save();
        return token;

    } 

    userSchema.methods.toJSON = function(){
        const user = this;
        const userObject = user.toObject();
        delete userObject.password;
        delete userObject.tokens;

        return userObject;
    }

    //HASH the plain text password using bycript
    //Middleware pre save function for userSchema
    //here we use normal function rather than arrow function because there is no 'this' binding in arrow functions
    //'this'  refers to the document instance 
    userSchema.pre('save',async function(next){
        const user = this;
        //updating user.password with the hash password
        if(user.isModified('password'))
        {
        user.password = await bcrypt.hash(user.password, 8);
        }
        //next will call next pre save middleware function if avaliable.
        //if you have multiple pre-save middleware functions, next will call a function that will call the 
        //next pre-save middleware or on error, will pass  the error back to your save callback.
        //Pre middleware functions are executed one after another, when each middleware calls next.
        next();
         
    });

    userSchema.pre('remove',async function(next){
        const user = this;
        await Task.deleteMany({owner: user._id})
        next();
    })

    //creating a user model
    const User = mongoose.model('User',userSchema);

module.exports = mongoose.model('User', userSchema);