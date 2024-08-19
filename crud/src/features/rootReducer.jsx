import attendanceSlice from './attendanceSlice'
import userSlice from './userSlice'
import loginSlice from './loginSlice'
import AddStudentSlice from './AddStudentSlice'
import addEmployeeSlice from './addEmployeeSlice'
import CustomerSlice from './CustomerSlice'
import addVendorSlice from './addVendorSlice'
import addLeadsSlice from './addLeadsSlice'
import studentCashinSlice from './studentCashinSlice'
import addCustomercashinSlice from './addCustomercashinSlice'
import interviewSlice from './interviewSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
     attendance:attendanceSlice,
     userData:userSlice,
     loginData:loginSlice,
     addStudent:AddStudentSlice,
     employee:addEmployeeSlice,
     customer:CustomerSlice,
     vendor:addVendorSlice,
     leads:addLeadsSlice,
     studentcashin:studentCashinSlice,
     customercashin:addCustomercashinSlice,
     interview:interviewSlice     
})

export default rootReducer
