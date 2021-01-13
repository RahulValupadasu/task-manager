const express = require('express');
//running the mongoose.js file to set up connection with mongodb db
require('./db/mongoose.js');

const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routes/users');
const taskRouter = require('./routes/task');

const app = express();
const port = process.env.PORT || 3000;

//app.use -> to cutsomise our server
//using middleware to setup for maintancecode

// app.use((req,res,next)=>{
//       res.status(503).send("Site under maintaince, please vist us back later in few minutes, thanks")
// });

app.use('/tasks',(req,res,next)=>{
    
    
    next()
})

//express.json()-> parses incoming JSON to javscript OBJECT automatically
app.use(express.json());
//app.use(userRouter) is use to use userRouter exported from user router
app.use(userRouter);
app.use(taskRouter);

//listening to the port
app.listen(port,()=>{
    console.log('Server is up running at ', port);
})


