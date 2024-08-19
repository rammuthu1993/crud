import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_INTERVIEW_DB,GET_INTERVIEW_DB,UPDATE_INTERVIEW_DB,DELETE_INTERVIEW_DB } from "./url";

export const addInterview = createAsyncThunk("addInterview",async(data)=>{
    console.log(data);
    try{
    const result =await axios.post(ADD_INTERVIEW_DB,data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    return result.data
    }
    catch(error){
        alert("Server error")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const getInterview = createAsyncThunk("getInterview",async()=>{
    try{
    const result =await axios.get(GET_INTERVIEW_DB)
    console.log(result);
    return result.data
     }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const updateInterview = createAsyncThunk("updateInterview",async(data)=>{
    console.log(data);
    try{
    const result =await axios.put(UPDATE_INTERVIEW_DB,data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const deleteInterview = createAsyncThunk("deleteInterview",async(id)=>{
    console.log(DELETE_INTERVIEW_DB+`/${id}`);
    try{
    const result =await axios.delete(DELETE_INTERVIEW_DB+`/${id}`)
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

const interviewSlice = createSlice({
         name:"addInterview",
         initialState:{
            addInterview:[],
            status:"idle",
            error:""
         },
         reducers:{
            fetchInterview:(state,action)=>{
                 state.addInterview = action.payload
            }
         },
         extraReducers:(builder)=>{
             builder.addCase(addInterview.pending,(state,action)=>{
                   state.status = "loading"
                   state.error = "null"
             })
             .addCase(addInterview.fulfilled,(state,action)=>{
                   state.status = "succeeded"
                   state.addInterview.push(action.payload)
             })
             .addCase(addInterview.rejected,(state,action)=>{
                   state.status = "failed"
             })
             .addCase(getInterview.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(getInterview.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addInterview = action.payload
              })
             .addCase(getInterview.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(updateInterview.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(updateInterview.fulfilled,(state,action)=>{
                state.status = "succeeded"
                const index = state.addInterview.findIndex(int => int._id === action.payload._id)
                state.addInterview[index] = action.payload
              })
             .addCase(updateInterview.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(deleteInterview.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(deleteInterview.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addInterview = state.addInterview.filter(v=> v._id !== action.payload._id )
              })
             .addCase(deleteInterview.rejected,(state,action)=>{
                state.status = "failed"
              })
             
             return builder
         }
})

export const fetchInterviewData = state => state.interview.addInterview
export default interviewSlice.reducer 