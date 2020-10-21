// validtor npm package for validtions
const mongoose = require('mongoose');
const { error } = require('console');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-db',{
    useNewUrlParser:true,
    useCreateIndex:true
});



//instance of user model
// const me = new user({
//     name:'Rahul Valupadasu',
//     age:26,
//     email:'Rahul@gmail.com',
//     password:'1234'
// });



//saving the created instance
// me.save().then((me)=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error!',error)
// });




//creating a instance of task model . i.e creating a document

// const task_1 = new tasks({
//     name:'task-1',
//     description:'This is the first task'
// });

// task_1.save().then((task_1)=>{
//     console.log(task_1);
// }).catch((error)=>{
//     console.log(error,"Error inserting document into tasks collection");
// }







