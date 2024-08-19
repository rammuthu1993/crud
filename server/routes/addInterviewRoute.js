const express = require("express")
const addInterviewRouter = express.Router()
const {createInterview,upload,getInterviews,updateInterview,deleteInterview} = require("../crud/addInterviewcrud")

addInterviewRouter.post("/addinterview",upload.single("image"),createInterview)
addInterviewRouter.get("/getinterview",getInterviews)
addInterviewRouter.put("/updateinterview",upload.single("image"),updateInterview)
addInterviewRouter.delete("/deleteinterview/:id",deleteInterview)

module.exports = addInterviewRouter