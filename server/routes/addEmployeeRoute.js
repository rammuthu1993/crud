const express = require("express")
const addEmployeeRouter = express.Router()
const {createEmployee,upload,getEmployee,updateEmployee,deleteEmployee} = require("../crud/addEmployeecrud")

addEmployeeRouter.post("/addemployee",upload.single("image"),createEmployee)
addEmployeeRouter.get("/getemployee",getEmployee)
addEmployeeRouter.put("/updateemployee",upload.single("image"),updateEmployee)
addEmployeeRouter.delete("/deleteemployee/:id",deleteEmployee)

module.exports = addEmployeeRouter