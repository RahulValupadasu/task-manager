const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' // it automatically creates database with this name
MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
     if(error){
        return console.log("Error connecting the database");
     }

     const db = client.db(databaseName) // creating instance of database name

// inserting records into mongo db
//      db.collection('users').insertOne({
//         name:'Rahul Valupadasu',
//         age:27
//      });

//      db.collection('newUsers').insertMany([{
//         name:'Rakesh',
//         age:28
//      },
//      {
//         name:'Sadanandam',
//         age:56
//      }],(error,result)=>{
//         if(error){
//            return console.log("Error inserting the users into the database")
//         }

//         console.log(`inserted records count ${result.insertedCount}\n inserted record ${result.ops}`)
//         console.log(result.ops)
//      })

//      console.log("Connection to database successfull");

// READ Operations
// const userCursor = db.collection('newUsers').find({name:'Rakesh'});

// userCursor.forEach(console.log)

//UPDATE Operations

// db.collection('newUsers').updateMany({
//    name:'Rahul'
// },{
//    $set:{
//       age:26
//    }
// },{
//    upsert:true
// }).then((result)=>{
//      console.dir(result)
// }).catch((error)=>{
//    console.log(error,"Cannot update the document");
// });


//DELETE Operation

// db.collection('newUsers').deleteMany({
//    name:'Rishi'
// }).then((result)=>{
//    console.log(result)
// }).catch((error)=>{
//    console.log(error)
// });




})

