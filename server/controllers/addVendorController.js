const mongoose = require("mongoose")

const addVendorSchema =  mongoose.Schema({
    vendorname:String,
    vendortype:String,
    contactnumber:String,
    email:String,
    address:String,
    paidamount:String,
    remainingamount:String,
    comments:String
})

module.exports = mongoose.model("vendors_details",addVendorSchema)