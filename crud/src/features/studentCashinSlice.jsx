import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_STUDENTCASHIN_DB,GET_STUDENTCASHIN_DB,UPDATE_STUDENTCASHIN_DB,DELETE_STUDENTCASHIN_DB } from "./url";

export const addStudentcashin = createAsyncThunk("addStudentcashin",async(data)=>{
    console.log(data);
    try{
    const result =await axios.post(ADD_STUDENTCASHIN_DB,data)
    return result.data
    }
    catch(error){
        alert("Server error")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const getStudentcashin = createAsyncThunk("getStudentcashin",async()=>{
    try{
    const result =await axios.get(GET_STUDENTCASHIN_DB)
    console.log(result);
    return result.data
     }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const updateStudentcashin = createAsyncThunk("updateStudentcashin",async(data)=>{
    console.log(data);
    try{
    const result =await axios.put(UPDATE_STUDENTCASHIN_DB,data)
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const deleteStudentcashin = createAsyncThunk("deleteStudentcashin",async(id)=>{
    console.log(DELETE_STUDENTCASHIN_DB+`/${id}`);
    try{
    const result =await axios.delete(DELETE_STUDENTCASHIN_DB+`/${id}`)
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

const studentCashinSlice = createSlice({
         name:"addStudentcashin",
         initialState:{
            addStudentcashin:[],
            status:"idle",
            error:""
         },
         reducers:{
            fetchCashin:(state,action)=>{
                 state.addStudentcashin = action.payload
            }
         },
         extraReducers:(builder)=>{
             builder.addCase(addStudentcashin.pending,(state,action)=>{
                   state.status = "loading"
                   state.error = "null"
             })
             .addCase(addStudentcashin.fulfilled,(state,action)=>{
                   state.status = "succeeded"
                   state.addStudentcashin.push(action.payload)
             })
             .addCase(addStudentcashin.rejected,(state,action)=>{
                   state.status = "failed"
             })
             .addCase(getStudentcashin.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(getStudentcashin.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addStudentcashin = action.payload
              })
             .addCase(getStudentcashin.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(updateStudentcashin.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(updateStudentcashin.fulfilled,(state,action)=>{
                state.status = "succeeded"
                const index = state.addStudentcashin.findIndex(v => v._id === action.payload._id)
                state.addStudentcashin[index] = action.payload
              })
             .addCase(updateStudentcashin.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(deleteStudentcashin.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(deleteStudentcashin.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addStudentcashin = state.addStudentcashin.filter(v=> v._id !== action.payload._id )
              })
             .addCase(deleteStudentcashin.rejected,(state,action)=>{
                state.status = "failed"
              })
             
             return builder
         }
})

export const fetchStudentcashinData = state => state.studentcashin.addStudentcashin
export default studentCashinSlice.reducer 