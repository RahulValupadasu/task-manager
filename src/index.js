const express = require('express');
//running the mongoose.js file to set up connection with mongodb db
require('./db/mongoose.js');

const User = require('./models/user');
const Task = require('./models/task');

const app = express()
const port = process.env.PORT || 3000;





//app.use -> to cutsomise our server
//express.json()-> parses incoming JSON to javscript OBJECT automatically
app.use(express.json());

app.post('/users',(req,res)=>{
    //instance of user model
    //req.body is json setup at postman i.e user document to be stored in db
    const user = new User(req.body)
    //saving the user instance created
    user.save().then(()=>{
        res.send(user);
    }).catch((e)=>{
        //setting the status code to 400 - bad request from the client side(i.e here if the body is incorrect) 
         res.status(400);
         res.send(e);
    })
     
});

app.post('/tasks',(req,res)=>{
    const task = new Task(req.body);
    task.save().then((task)=>{
       res.send(task)
    }).catch((error)=>{
        res.send(error)
    })
})

//listening to the port
app.listen(port,()=>{
    console.log('Server is up running at ', port);
})


