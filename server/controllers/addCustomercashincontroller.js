const mongoose = require("mongoose")

const addCustomercashinSchema =  mongoose.Schema({
    name:String,
    currentbalance:String,
    paidamount:String,
    remainingamount:String,
    paymenttype:String,
    comments:String,
    date:String
})

module.exports = mongoose.model("customerscashin_details",addCustomercashinSchema)