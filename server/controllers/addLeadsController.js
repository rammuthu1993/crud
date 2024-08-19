const mongoose = require("mongoose")

const addLeadsSchema =  mongoose.Schema({
    date:String,
    name:String,
    qualification:String,
    yop:String,
    phonenumber:String,
    location:String,
    updates:String,
    detailssent:String,
    assignedto:String,
    course:String,
    source:String,
    
})

module.exports = mongoose.model("leads_details",addLeadsSchema)