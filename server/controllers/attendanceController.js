const { time } = require("console")
const mongoose = require("mongoose")

const attendanceSchema = mongoose.Schema({
    emp_name:String,
    workStatus:String,
    inTime:String,
    outTime:String,
    date:String,
    image:String

})
module.exports = mongoose.model("student_attendance",attendanceSchema)