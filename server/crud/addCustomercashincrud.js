const addCustomercashinSchema = require("../controllers/addCustomercashincontroller")

const createCustomercashin = async(req,res)=>{
            console.log(req.body);
    const savedata = await addCustomercashinSchema.create({
        ...req.body
    })
    const data = await savedata.save()
    res.json(data)

}

const getCustomercashin = async(req,res)=>{
    const CustomercashinDetails = await addCustomercashinSchema.find()
    res.json(CustomercashinDetails)
}

const updateCustomercashin = async(req,res)=>{
    /* const {_id,clientname,address,contactnumber,date,state,invoice,gstin} = req.body
    console.log(_id);
    try{
    const updateDeatils = await addCustomercashinSchema.findOneAndUpdate({_id:_id},{clientname,address,contactnumber,date,state,invoice,gstin},{new:true})
    res.json({status:"ok",updatedData:updateDeatils})
    console.log(updateDeatils);
    }
    catch(err){
        console.log(err);
        res.json(err)
    } */
    
}

const deleteCustomercashin = async(req,res)=>{
     const {id} = req.params
     console.log(req.params);
    try{
    const deleteCustomercashin = await addCustomercashinSchema.findOneAndDelete({_id:id})
    console.log(deleteCustomercashin);
    res.json(deleteCustomercashin)
     }
     catch(err){
        console.log(err);
        res.json(err)
     }
}

module.exports = {createCustomercashin,getCustomercashin,updateCustomercashin,deleteCustomercashin}