const mongoose = require("mongoose")

const attendanceSchema = mongoose.Schema({
    employee:String,
    status:String,
    permission:String,
    leave:String,
    Indate:String,
    intime:String,
    outdate:String,
    outtime:String,
    comments:String

})
module.exports = mongoose.model("student_attendance",attendanceSchema)