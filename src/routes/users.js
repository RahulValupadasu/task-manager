const express = require('express');
const router = new express.Router();
const User = require('../models/user');

// CREATE route for users creation
router.post('/users',async (req,res)=>{
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

//Reading User
router.get('/users', async (req,res)=>{
    try{
        const user = await User.find({});
        res.status(200).send(user);
    }
    catch(e){
        res.status(500).send(e)
    }
     
})



//UPDATEING  a user 
router.patch('/users/:id', async (req,res)=>{
    // logic and code for which fields are allowed to be updated 
    // here we are allowed to update name , age ,email, password
    const updates = Object.keys(req.body)  // conerts body object into array of keys
    const allowedUpdates = ['name','age','email'];
    const isValidUpdate = updates.every((update)=>{
        return allowedUpdates.includes(update);
    });
  
    if(!isValidUpdate){
        return res.status(404).send({'ERROR':"Invalid updates!"});
    };
  
    try{
          //runValidators runs the valiation of the respective model before updating
          const user = await User.findOneAndUpdate({_id:req.params.id},req.body,{ new:true, runValidators: true});
          console.log("Entered try block",user);
          res.status(200).send(user);
        }
    catch(e){
          res.status(500).send(e);
        }
  });

  //Deleting user by Id
  router.delete('/users/:id', async (req,res)=>{
      try{
          const deletedUser = await User.findByIdAndDelete(req.params.id);
          if(!deletedUser){
              return res.status(404).send({"ERROR":"0 documents found with the given id"})
          }
          res.status(200).send(deletedUser)
      }
      catch(e){
          res.status(500).send(e);
      }
  })


module.exports = router