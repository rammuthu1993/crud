const userSchema = require("../controllers/userControllers")

const createUser = async(req,res)=>{
    const {name,course,image} = req.body
        console.log(req.file);
    const user = await userSchema.create({
         ...req.body
    })
    const data = user.save()
    res.json({data:data,status:"ok"})
}

const getUser = async(req,res)=>{
    const users =await userSchema.find()
    if(users){
    res.json(users)
    }
    else{
        res.json("rejected")
    }
}

module.exports = {createUser,getUser}