const addLeadsSchema = require("../controllers/addLeadsController")

const createLeads = async(req,res)=>{
            console.log(req.body);
    const savedata = await addLeadsSchema.create({
        ...req.body
    })
    const data = await savedata.save()
    res.json(data)

}

const getLeads = async(req,res)=>{
    const LeadsDetails = await addLeadsSchema.find()
    res.json(LeadsDetails)
}

const updateLeads = async(req,res)=>{
    /* const {_id,clientname,address,contactnumber,date,state,invoice,gstin} = req.body
    console.log(_id);
    try{
    const updateDeatils = await addLeadsSchema.findOneAndUpdate({_id:_id},{clientname,address,contactnumber,date,state,invoice,gstin},{new:true})
    res.json({status:"ok",updatedData:updateDeatils})
    console.log(updateDeatils);
    }
    catch(err){
        console.log(err);
        res.json(err)
    } */
    
}

const deleteLeads = async(req,res)=>{
     const {id} = req.params
     console.log(req.params);
    try{
    const deleteLeads = await addLeadsSchema.findOneAndDelete({_id:id})
    console.log(deleteLeads);
    res.json(deleteLeads)
     }
     catch(err){
        console.log(err);
        res.json(err)
     }
}

module.exports = {createLeads,getLeads,updateLeads,deleteLeads}