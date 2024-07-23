const attendanceSchema = require("../controllers/attendanceController")

const createAttendance = async(req,res)=>{
            console.log(req.body);
    const savedata = await attendanceSchema.create({
        ...req.body
    })
    const data = await savedata.save()
    res.json(data)

}

const getAttendance = async(req,res)=>{
    const attendanceDetails = await attendanceSchema.find()
    res.json(attendanceDetails)
}

const updateAttendance = async(req,res)=>{
    const {id,emp_name,workStatus,inTime,outTime,date} = req.body
    console.log(id);
    try{
    const updateDeatils = await attendanceSchema.findOneAndUpdate({_id:id},{emp_name,workStatus,inTime,outTime,date},{new:true})
    res.json({status:"ok",updatedData:updateDeatils})
    console.log(updateDeatils);
    }
    catch(err){
        console.log(err);
        res.json("error")
    }
    
}

const deleteDetail = async(req,res)=>{
     const {id} = req.params
     console.log(req.params);
    try{
    const deleteDetail = await attendanceSchema.findOneAndDelete({_id:id})
    console.log(deleteDetail);
    res.json(deleteDetail)
     }
     catch(err){
        console.log(err);
        res.json("error")
     }
}

module.exports = {createAttendance,getAttendance,updateAttendance,deleteDetail}