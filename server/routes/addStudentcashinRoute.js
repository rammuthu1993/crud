const express = require("express")
const addStudentcashinRouter = express.Router()
const {createStudentcashin,getStudentcashin,updateStudentcashin,deleteStudentcashin} = require("../crud/addStudentcashincrud")

addStudentcashinRouter.post("/addcashin",createStudentcashin)
addStudentcashinRouter.get("/getcashin",getStudentcashin)
addStudentcashinRouter.put("/updatecashin",updateStudentcashin)
addStudentcashinRouter.delete("/deletecashin/:id",deleteStudentcashin)

module.exports = addStudentcashinRouter