const express = require("express")
const addCustomercashinRouter = express.Router()
const {createCustomercashin,getCustomercashin,updateCustomercashin,deleteCustomercashin} = require("../crud/addCustomercashincrud")

addCustomercashinRouter.post("/addcashin",createCustomercashin)
addCustomercashinRouter.get("/getcashin",getCustomercashin)
addCustomercashinRouter.put("/updatecashin",updateCustomercashin)
addCustomercashinRouter.delete("/deletecashin/:id",deleteCustomercashin)

module.exports = addCustomercashinRouter