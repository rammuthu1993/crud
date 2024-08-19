const mongoose = require("mongoose")

const addStudentSchema =  mongoose.Schema({
    id:String,
    firstname:String,
    lastname:String,
    mothername:String,
    fathername:String,
    dateofbirth:String,
    email:String,
    address:String,
    contactnumber:String,
    alternatenumber:String,
    gender:String,
    maritialstate:String,
    qualification:String,
    experiance:String,
    course:String,
    totalamount:String,
    remaining:String,
    mentor:String,
    dateofjoining:String,
    studentstatus:String,
    image:String,
    imagename:String,
    remarks:String
})

module.exports = mongoose.model("students_details",addStudentSchema)