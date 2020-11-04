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

// CREATE route for users creation
app.post('/users',async (req,res)=>{
    //instance of user model
    //req.body is json setup at postman i.e user document to be stored in db
    const user = new User(req.body);
    //modifying the code using async and await
    try{ 
        await user.save()
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e);

    }
    
    //saving the user instance created
    // user.save().then(()=>{
    //     //explicitly setting status code to 201- which means created
    //     res.status(201)
    //     res.send(user);
    // }).catch((e)=>{
    //     //setting the status code to 400 - bad request from the client side(i.e here if the body is incorrect) 
    //      res.status(400);
    //      res.send(e);
    // })
     
});

//CREATE route for tasks creation
app.post('/tasks', async (req,res)=>{
    const task = new Task(req.body);
        //modifying the code using async and await
        try{
            await task.save()
            res.status(201).send(task);
        }
        catch(e){
            res.status(400).send(e);
        }
        
    // task.save().then((task)=>{
    //     //explicitly setting status code to 201- which means created
    //     res.status(201)
    //    res.send(task)
    // }).catch((error)=>{
    //     //setting the status code to 400 - bad request from the client side(i.e here if the body is incorrect) 
    //     res.status(400);
    //     res.send(error)
    // })
})


//READING all the tasks-- route
app.get('/tasks', async (req,res)=>{
    //modifying the code using async and await
    try{
        const task = await Task.find({})
        res.status(200).send(task);
    }
    catch(e){
        res.status(500).send(e);
    }

    //using promises ..the above mpdified code using async/await
    // Task.find({}).then((task)=>{
    //     res.status(200)
    //     res.send(task);
    // }).catch((e)=>{
    //    res.status(500).send();
    // });
    
});

//READING A task based on given task id-- route
// :name is the dynamic parameter to be sent to the end point, 
// req.params is used to 
app.get('/tasks/:name', async(req,res)=>{
    try{      
        const task = await Task.find(req.params);
        if(task.length==0){
            console.log("No tasks found with this task name");
            return res.status(404).send();
        }
        res.status(200).send(task)
    }
    catch(e){
        console.log('Error',e);
        res.status(500).send();
    }

    //using promises ..the above mpdified code using async/await
    //    Task.find(req.params).then((task)=>{
    //        if(task.length==0){
    //            console.log("No tasks found with this task name");
    //            return res.status(404).send();
    //        }
    //       res.send(task);
    //    }).catch((e)=>{
    //        console.log('Error',e);
    //       res.status(500).send();
    //    })
       //req.params outputs as an object in the format dynamic parameter 
       //name given in end point in this case name and the value sent in url
    //    console.log(req.params);
});

//listening to the port
app.listen(port,()=>{
    console.log('Server is up running at ', port);
})


