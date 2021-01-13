const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next)=>{
    try{
      const token = req.header('Authorization').replace('Bearer ','');
      console.log("token",token)
      const decode = jwt.verify(token,'thisisnodecourse');
    //   console.log("decode",decode);
      const user = await User.findOne({_id:decode._id,'tokens.token':token});
    //   console.log("auth: ", user)
      if(!user){
          throw new Error();
      }
    //   console.log(token)
      req.token = token
      req.user = user;
      console.log("Authenticated properly");
      next();
    }catch(e){
        res.status(401).send({"Error":"Authentication fail"})
    }
}

module.exports = auth;