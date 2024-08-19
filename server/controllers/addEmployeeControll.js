const mongoose = require("mongoose")

const addEmployeeSchema =  mongoose.Schema({
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
    designation:String,
    salary:String,
    annualsalary:String,
    isStaff:String,
    dateofjoining:String,
    relieving:String,
    aadharnumber:String,
    pan:String,
    accountnumber:String,
    employeetype:String,
    image:String,
    imagename:String,
    remarks:String
})

module.exports = mongoose.model("employees_details",addEmployeeSchema)