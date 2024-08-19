const addStudentcashinSchema = require("../controllers/addStudentcashincontroller")

const createStudentcashin = async(req,res)=>{
            console.log(req.body);
    const savedata = await addStudentcashinSchema.create({
        ...req.body
    })
    const data = await savedata.save()
    res.json(data)

}

const getStudentcashin = async(req,res)=>{
    const StudentcashinDetails = await addStudentcashinSchema.find()
    res.json(StudentcashinDetails)
}

const updateStudentcashin = async(req,res)=>{
    /* const {_id,clientname,address,contactnumber,date,state,invoice,gstin} = req.body
    console.log(_id);
    try{
    const updateDeatils = await addStudentcashinSchema.findOneAndUpdate({_id:_id},{clientname,address,contactnumber,date,state,invoice,gstin},{new:true})
    res.json({status:"ok",updatedData:updateDeatils})
    console.log(updateDeatils);
    }
    catch(err){
        console.log(err);
        res.json(err)
    } */
    
}

const deleteStudentcashin = async(req,res)=>{
     const {id} = req.params
     console.log(req.params);
    try{
    const deleteStudentcashin = await addStudentcashinSchema.findOneAndDelete({_id:id})
    console.log(deleteStudentcashin);
    res.json(deleteStudentcashin)
     }
     catch(err){
        console.log(err);
        res.json(err)
     }
}

module.exports = {createStudentcashin,getStudentcashin,updateStudentcashin,deleteStudentcashin}