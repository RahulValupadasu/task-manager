//running the mongoose.js file to set up connection with mongodb db
require('../src/db/mongoose.js');
const Task = require('../src/models/task');
const { ConnectionStates } = require('mongoose');

// Task.find({name:'task-1'}).then((tasks)=>{
//     console.log(tasks)

//     return tasks.update({completed:true})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e);
// });


// Task.findOneAndUpdate({name:'task-1'},{completed:true}).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e);
// });


//