require("express-async-errors")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
let router = require('./routes/attendanceRoutes')
const userRoute = require("./routes/userRoutes")
const loginRoute = require("./routes/loginRoutes")


const PORT = process.env.PORT || 3007

mongoose.connect("mongodb://localhost:27017/Kitkat")
.then((res)=>{
  console.log("server is connected");
})
.catch(err=>
    console.log(err)
)

app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use("/api",router)
app.use("/user",userRoute)
app.use("/login",loginRoute)

app.listen(PORT,()=>{
  console.log(`server is running on PORT no: ${PORT}`);
})