import React from 'react'
import attendanceSlice from './attendanceSlice'
import userSlice from './userSlice'
import loginSlice from './loginSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
     attendance:attendanceSlice,
     userData:userSlice,
     loginData:loginSlice        
})

export default rootReducer
