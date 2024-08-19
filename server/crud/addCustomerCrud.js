const addCustomerSchema = require("../controllers/addCustomerController")

const createCustomer = async(req,res)=>{
            console.log(req.body);
    const savedata = await addCustomerSchema.create({
        ...req.body
    })
    const data = await savedata.save()
    res.json(data)

}

const getCustomer = async(req,res)=>{
    const CustomerDetails = await addCustomerSchema.find()
    res.json(CustomerDetails)
}

const updateCustomer = async(req,res)=>{
    const {_id,clientname,address,contactnumber,date,state,invoice,gstin} = req.body
    console.log(_id);
    try{
    const updateDeatils = await addCustomerSchema.findOneAndUpdate({_id:_id},{clientname,address,contactnumber,date,state,invoice,gstin},{new:true})
    res.json({status:"ok",updatedData:updateDeatils})
    console.log(updateDeatils);
    }
    catch(err){
        console.log(err);
        res.json(err)
    }
    
}

const deleteCustomer = async(req,res)=>{
     const {id} = req.params
     console.log(req.params);
    try{
    const deleteCustomer = await addCustomerSchema.findOneAndDelete({_id:id})
    console.log(deleteCustomer);
    res.json(deleteCustomer)
     }
     catch(err){
        console.log(err);
        res.json(err)
     }
}

module.exports = {createCustomer,getCustomer,updateCustomer,deleteCustomer}