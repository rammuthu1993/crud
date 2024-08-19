import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const addAttendance = createAsyncThunk("addAttendance",async(data)=>{
           try{
            console.log(data)
            const response = await axios.post("http://localhost:3007/api/addAttendance",data)
            console.log(response);
            return response.data
            }
           catch(err){
                  console.log(err);
           }
})

export const fetchAttendance = createAsyncThunk("getAttendance",async()=>{
             try{
                const response = await axios.get("http://localhost:3007/api/getAttendance")
                console.log(response); 
                return response.data
             }
             catch(err){
                console.log(err.message);
             }
})

export const updateAttendance = createAsyncThunk("updateAttendance",async(data)=>{
   try{
      console.log(data);
      const response = await axios.put("http://localhost:3007/api/updateAttendance",data)
      console.log(response); 
      return response.data.updatedData
   }
   catch(err){
      console.log(err.message);
   }
})

export const deleteAttendance = createAsyncThunk("deleteAttendance",async(id)=>{
   try{
      console.log(id);
      const response = await axios.delete(`http://localhost:3007/api/deleteAttendance/${id}`)
      console.log(response); 
      return response.data
   }
   catch(err){
      console.log(err.message);
   }
})



const attendanceSlice = createSlice({
    name:"attendance",
    initialState:{
        loading:false,
        empAttendance:[],
        error:""
    },
    reducers:{
        searchAttendance:(state,action)=>{
         state.empAttendance = action.payload
        }     
    },
    extraReducers:(builder)=>{
         builder.addCase(addAttendance.pending,(state,action)=>{
            state.loading = true
         })

         .addCase(addAttendance.fulfilled,(state,action)=>{
            state.loading = false           
            state.empAttendance.push(action.payload)
            console.log(action);
         })

         .addCase(addAttendance.rejected,(state,action)=>{
            state.loading = false
         })
         .addCase(fetchAttendance.pending,(state,action)=>{
            state.loading = true
         })
         .addCase(fetchAttendance.fulfilled,(state,action)=>{
            state.loading = false           
            state.empAttendance=action.payload
            console.log(action.payload);
         })
         .addCase(fetchAttendance.rejected,(state,action)=>{
            state.loading = false
         })
         .addCase(updateAttendance.pending,(state,action)=>{
            state.loading = true
         })
         .addCase(updateAttendance.fulfilled,(state,action)=>{
            state.loading = false           
            const updateIndex = state.empAttendance.findIndex(att=> att._id===action.payload._id)
            console.log(updateIndex);
            state.empAttendance[updateIndex] = action.payload
         })
         .addCase(updateAttendance.rejected,(state,action)=>{
            state.loading = false
         })
         .addCase(deleteAttendance.pending,(state,action)=>{
            state.loading = true
         })
         .addCase(deleteAttendance.fulfilled,(state,action)=>{
            state.loading = false           
            state.empAttendance = state.empAttendance.filter(att=> att._id!==action.payload._id)
         })
         .addCase(deleteAttendance.rejected,(state,action)=>{
            state.loading = false
         })
         
         return builder;
    }
})

export const allAttendance = (state)=> state.attendance.empAttendance
//export const getAttendance = createSelector([],()=>{})
export default attendanceSlice.reducer
