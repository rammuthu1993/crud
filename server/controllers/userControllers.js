const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
        name:String,
        course:String,
        image:String
})

module.exports = mongoose.model("user_data",userSchema)