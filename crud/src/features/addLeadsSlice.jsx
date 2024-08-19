import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_LEADS_DB,GET_LEADS_DB,UPDATE_LEADS_DB,DELETE_LEADS_DB } from "./url";

export const addLeads = createAsyncThunk("addLeads",async(data)=>{
    console.log(data);
    try{
    const result =await axios.post(ADD_LEADS_DB,data)
    return result.data
    }
    catch(error){
        alert("Server error")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const getLeads = createAsyncThunk("getLeads",async()=>{
    try{
    const result =await axios.get(GET_LEADS_DB)
    console.log(result);
    return result.data
     }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const updateLeads = createAsyncThunk("updateLeads",async(data)=>{
    console.log(data);
    try{
    const result =await axios.put(UPDATE_LEADS_DB,data)
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const deleteLeads = createAsyncThunk("deleteLeads",async(id)=>{
    console.log(DELETE_LEADS_DB+`/${id}`);
    try{
    const result =await axios.delete(DELETE_LEADS_DB+`/${id}`)
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

const addLeadsSlice = createSlice({
         name:"addLeads",
         initialState:{
            addLeads:[],
            status:"idle",
            error:""
         },
         reducers:{
            fetchVendor:(state,action)=>{
                 state.addLeads = action.payload
            }
         },
         extraReducers:(builder)=>{
             builder.addCase(addLeads.pending,(state,action)=>{
                   state.status = "loading"
                   state.error = "null"
             })
             .addCase(addLeads.fulfilled,(state,action)=>{
                   state.status = "succeeded"
                   state.addLeads.push(action.payload)
             })
             .addCase(addLeads.rejected,(state,action)=>{
                   state.status = "failed"
             })
             .addCase(getLeads.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(getLeads.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addLeads = action.payload
              })
             .addCase(getLeads.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(updateLeads.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(updateLeads.fulfilled,(state,action)=>{
                state.status = "succeeded"
                const index = state.addLeads.findIndex(v => v._id === action.payload._id)
                state.addLeads[index] = action.payload
              })
             .addCase(updateLeads.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(deleteLeads.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(deleteLeads.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addLeads = state.addLeads.filter(v=> v._id !== action.payload._id )
              })
             .addCase(deleteLeads.rejected,(state,action)=>{
                state.status = "failed"
              })
             
             return builder
         }
})

export const fetchLeadsData = state => state.leads.addLeads
export default addLeadsSlice.reducer 