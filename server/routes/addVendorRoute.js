const express = require("express")
const addVendorRouter = express.Router()
const {createVendor,getVendor,updateVendor,deleteVendor} = require("../crud/addVendorscrud")

addVendorRouter.post("/addvendor",createVendor)
addVendorRouter.get("/getvendor",getVendor)
addVendorRouter.put("/updatevendor",updateVendor)
addVendorRouter.delete("/deletevendor/:id",deleteVendor)

module.exports = addVendorRouter