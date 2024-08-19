require("express-async-errors")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
let router = require('./routes/attendanceRoutes')
const userRoute = require("./routes/userRoutes")
const loginRoute = require("./routes/loginRoutes")
const addStudentRouter = require("./routes/addStudentsRoute")
const addEmployeeRouter = require("./routes/addEmployeeRoute")
const addCustomerRouter = require("./routes/addCustomerRoute")
const addVendorRouter = require("./routes/addVendorRoute")
const addLeadsRouter = require("./routes/addLeadsRouter")
const addStudentcashinRouter = require("./routes/addStudentcashinRoute")
const addCustomercashinRouter = require("./routes/addCustomercashinRouter")
const addInterviewRouter = require("./routes/addInterviewRoute")
const bodyParser = require("body-parser")


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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('/public'))
app.use(cors())
app.use("/api",router)
app.use("/user",userRoute)
app.use("/login",loginRoute)
app.use("/student",addStudentRouter)
app.use("/employee",addEmployeeRouter)
app.use("/customer",addCustomerRouter)
app.use("/vendor",addVendorRouter)
app.use("/leads",addLeadsRouter)
app.use("/studentcashin",addStudentcashinRouter)
app.use("/customercashin",addCustomercashinRouter)
app.use("/interview",addInterviewRouter)

app.listen(PORT,()=>{
  console.log(`server is running on PORT no: ${PORT}`);
})