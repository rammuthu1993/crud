const express = require("express")
const {createAttendance,getAttendance,updateAttendance,deleteDetail} = require("../crud/attendanceCrud")
const router = express.Router()

router.post("/addAttendance",createAttendance)
router.get("/getAttendance",getAttendance)
router.put("/updateAttendance",updateAttendance)
router.delete("/deleteAttendance/:id",deleteDetail)

module.exports = router
