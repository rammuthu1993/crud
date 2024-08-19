const mongoose = require("mongoose")

const addCustomerSchema =  mongoose.Schema({
    clientname:String,
    address:String,
    contactnumber:String,
    date:String,
    state:String,
    invoice:String,
    gstin:String,
})

module.exports = mongoose.model("customers_details",addCustomerSchema)