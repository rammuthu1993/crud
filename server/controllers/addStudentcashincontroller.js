const mongoose = require("mongoose")

const addStudentcashinSchema =  mongoose.Schema({
    name:String,
    currentbalance:String,
    paidamount:String,
    remainingamount:String,
    paymenttype:String,
    comments:String,
    date:String
})

module.exports = mongoose.model("studentcashin_details",addStudentcashinSchema)