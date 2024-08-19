const express = require("express")
const addCustomerRouter = express.Router()
const {createCustomer,getCustomer,updateCustomer,deleteCustomer} = require("../crud/addCustomerCrud")

addCustomerRouter.post("/addcustomer",createCustomer)
addCustomerRouter.get("/getcustomer",getCustomer)
addCustomerRouter.put("/updatecustomer",updateCustomer)
addCustomerRouter.delete("/deletecustomer/:id",deleteCustomer)

module.exports = addCustomerRouter