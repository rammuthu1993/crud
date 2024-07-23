const loginSchema = require("../controllers/loginControl")

const loginUser = async(req,res)=>{
    const {name,password} = req.body
      const user = await loginSchema.findOne({name:name})
      console.log(user);
      if(user){   
        if(name===user.name && password===user.password){

            res.json({status:"ok",role:"admin"})
        }
        else {
          res.json("rejected")}
       }
       else{
        res.json("rejected")
       }
    }
    


module.exports = loginUser