const express = require("express")
const addLeadsRouter = express.Router()
const {createLeads,getLeads,updateLeads,deleteLeads} = require("../crud/addLeadscrud")

addLeadsRouter.post("/addleads",createLeads)
addLeadsRouter.get("/getleads",getLeads)
addLeadsRouter.put("/updateleads",updateLeads)
addLeadsRouter.delete("/deleteleads/:id",deleteLeads)

module.exports = addLeadsRouter