const express = require("express")
const loginRoute = express.Router()
const loginUser = require("../crud/loginCrud")


loginRoute.post("/loginUser",loginUser)

module.exports = loginRoute