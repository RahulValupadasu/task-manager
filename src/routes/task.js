const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

//CREATE route for tasks creation
router.post('/tasks', async (req,res)=>{
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
router.get('/tasks', async (req,res)=>{
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

//READING task based on given task id-- route
// :name is the dynamic parameter to be sent to the end point, 
// req.params is used to 
router.get('/tasks/:name', async(req,res)=>{
    try{      
        const task = await Task.find({name:req.params.name});
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



//Updating  Tasks
router.patch('/tasks/:id', async (req,res)=>{
      const updates = Object.keys(req.body);
      const allowUpdates = ['completed','name','description'];
      const isValidUPdate = updates.every((update)=>{
                 return allowUpdates.includes(update)
      })
      if(!isValidUPdate){
          return res.send({"error":"Invalid Update!!"});
      }
      try{
           const task = await Task.findOneAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
           res.status(200).send(task);
      }catch{
          res.status(500).send(e);
      }

});

//Deleting task
router.delete('/tasks/:id',async (req,res)=>{
    try{
        const deletedTask = Task.findByIdAndDelete(req.params.id);
        if(!deletedTask){
            return res.status(404).send({"ERROR":"0 documents found by this id"});
        }
        res.status(200).send(deletedTask);
    }
    catch(e){
        res.status(500).send(e);
    }
});

module.exports = router 
