const mongoose = require("mongoose")

const addInterviewSchema =  mongoose.Schema({
    intervieweename:String,
    investicatedDate:String,
    email:String,
    contactnumber:String,
    yearofpassing:String,
    qualification:String,
    updates:String,
    location:String,
    sheduleddate:String,
    source:String,
    image:String,
    imagename:String,
    jobrole:String
})

module.exports = mongoose.model("interviews_details",addInterviewSchema)