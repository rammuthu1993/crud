const express = require("express")
app= express()
const {createUser,getUser} = require("../crud/userCrud")
const userRoute = express.Router()

userRoute.post("/adduser",createUser)
userRoute.get("/fetchuser",getUser)

module.exports = userRoute