const express = require("express")
app= express()
const {createUser,getUser} = require("../crud/userCrud")
const {upload} = require("../crud/multer")
const userRoute = express.Router()

userRoute.post("/adduser",upload.single("image"),createUser)
userRoute.get("/fetchuser",getUser)

module.exports = userRoute