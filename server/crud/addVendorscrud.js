const addVendorSchema = require("../controllers/addVendorController")

const createVendor = async(req,res)=>{
            console.log(req.body);
    const savedata = await addVendorSchema.create({
        ...req.body
    })
    const data = await savedata.save()
    res.json(data)

}

const getVendor = async(req,res)=>{
    const VendorDetails = await addVendorSchema.find()
    res.json(VendorDetails)
}

const updateVendor = async(req,res)=>{
    /* const {_id,clientname,address,contactnumber,date,state,invoice,gstin} = req.body
    console.log(_id);
    try{
    const updateDeatils = await addVendorSchema.findOneAndUpdate({_id:_id},{clientname,address,contactnumber,date,state,invoice,gstin},{new:true})
    res.json({status:"ok",updatedData:updateDeatils})
    console.log(updateDeatils);
    }
    catch(err){
        console.log(err);
        res.json(err)
    } */
    
}

const deleteVendor = async(req,res)=>{
     const {id} = req.params
     console.log(req.params);
    try{
    const deleteVendor = await addVendorSchema.findOneAndDelete({_id:id})
    console.log(deleteVendor);
    res.json(deleteVendor)
     }
     catch(err){
        console.log(err);
        res.json(err)
     }
}

module.exports = {createVendor,getVendor,updateVendor,deleteVendor}