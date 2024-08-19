const express = require("express")
const addStudentRouter = express.Router()
const {createStudent,upload,getStudents,updateStudent,deletestudent} = require("../crud/addStudentcrud")

addStudentRouter.post("/addStudent",upload.single("image"),createStudent)
addStudentRouter.get("/getstudent",getStudents)
addStudentRouter.put("/updatestudent",upload.single("image"),updateStudent)
addStudentRouter.delete("/deletestudent/:id",deletestudent)

module.exports = addStudentRouter