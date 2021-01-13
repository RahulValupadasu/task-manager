const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const Task = require('../models/task');
const auth = require('../middleware/authentication')


// CREATE route for users creation
router.post('/users',async (req,res)=>{
    //instance of user model
    //req.body is json setup at postman i.e user document to be stored in db
    const user = new User(req.body);

    //modifying the code using async and await
    try{ 
        await user.save()
        const userToken = user.generateAuthenticationTokens();
        res.status(201).send({user,userToken});
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

//Reading User, ie me
router.get('/users/me', auth, async (req,res)=>{
    res.send(req.user);
     
});

//login User authentication by comparing passwords
router.get('/users/login/', async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        // console.log(user);
        const userToken = await user.generateAuthenticationTokens();
        // console.log(userToken)
        res.status(200).send({user,userToken});
    }catch(e){
        res.status(400).send();
    }
});

//logging out , removing authentication code
router.post('/users/logout', auth, async (req,res)=>{
    try{
          const user = req.user;
          const current_device_token = req.token;
          console.log("current_device_token",current_device_token);
          user.tokens =  user.tokens.filter((token)=>{ 
              return current_device_token!==token.token;
          });
          await user.save();
          console.log(user.tokens);
          res.send({"logout":"successful"})
    }catch(e)
    {
         res.status(500).send()
    }
});


//Logging out of all.i.e logging out from all devices
router.post('/users/logoutAll',auth, async (req,res)=>{
    try{
          req.user.tokens=[];
          await req.user.save();
          res.status(200).send({"logout of all":"successful"});
    }catch(e){
        res.status(500).send(e);
    }
})



//UPDATEING  a user 
router.patch('/users/me', auth,async (req,res)=>{
    // logic and code for which fields are allowed to be updated 
    // here we are allowed to update name , age ,email, password
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','age','email','password'];
    const isValidUpdate = updates.every((update)=>{
        return allowedUpdates.includes(update);
    });
  
    if(!isValidUpdate){
        return res.status(404).send({'ERROR':"Invalid updates!"});
    };
  
    try{
          //middleware functions are not triggered when we use bulky functions in mongoose, i. e if we use
        //findOneAndUpdate or similar function middleware functions dont get triggered
          //runValidators runs the valiation of the respective model before updating
        //   const user = await User.findOneAndUpdate({_id:req.params.id},req.body,{ new:true, runValidators: true});
        const user = await User.findById({_id:req.user._id});
        updates.forEach(  (update)=>{
            user[update]=req.body[update];
        });
        await user.save();
        res.status(200).send(user);
        }
    catch(e){
          res.status(500).send(e);
        }
  });

  //Deleting user by Id
  router.delete('/users/me', auth, async (req,res)=>{
      try{
        //   const deletedUser = await User.findByIdAndDelete(req.params.id);
        //   if(!deletedUser){
        //       return res.status(404).send({"ERROR":"0 documents found with the given id"})
        //   }
        

        //before removing the user we trigger middleware userSchema.pre("remove"....) to delte all task of this user
        await req.user.remove();
        res.status(200).send(req.user)
      }
      catch(e){
          res.status(500).send(e);
      }
  });


  //getting all tasks of the user
  router.post('/users/tasks', auth, async (req,res)=>{
      const user = await User.findById({_id:req.user._id});
      //execPopulate is used when we want to populate for EXISTING Document.
      await user.populate('user_tasks').execPopulate();
    //   console.log(user.user_tasks)
      res.send(user.user_tasks);
  })


module.exports = router