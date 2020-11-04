require('../src/db/mongoose.js');
const Task = require('../src/models/task');
const { ConnectionStates } = require('mongoose');

//async wait - replacemnt for pomises chaining - better syntax - to aysnc multiple operations- my understanding same as call back functions
// Requirement -> find all tha tasks with the name 'task-1' and upate them completed by setting 'true'
// const Update_Many = async (name)=>{
//     const task1 = await Task.updateMany({name},{completed:true},(update_documnets)=>{
//         console.log(update_documnets);
//     });
//     console.log(task1)
// }

// Update_Many('task-2').then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e);
// });


// deleting task and finding count of incompleted tasks
const deleteTaskByIdAndCount = async (name)=>{
     const deleteTask = await Task.deleteOne({name});
     console.log(deleteTask);
     return deleteTask;
   
};

deleteTaskByIdAndCount('task-6').then((result)=>{
       console.log(result);
}).catch((e)=>{
       console.log(e);
})