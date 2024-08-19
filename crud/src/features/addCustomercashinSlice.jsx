import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_CUSTOMERCASHIN_DB,GET_CUSTOMERCASHIN_DB,UPDATE_CUSTOMERCASHIN_DB,DELETE_CUSTOMERCASHIN_DB } from "./url";

export const addCustomercashin = createAsyncThunk("addCustomercashin",async(data)=>{
    console.log(data);
    try{
    const result =await axios.post(ADD_CUSTOMERCASHIN_DB,data)
    return result.data
    }
    catch(error){
        alert("Server error")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const getCustomercashin = createAsyncThunk("getCustomercashin",async()=>{
    try{
    const result =await axios.get(GET_CUSTOMERCASHIN_DB)
    console.log(result);
    return result.data
     }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const updateCustomercashin = createAsyncThunk("updateCustomercashin",async(data)=>{
    console.log(data);
    try{
    const result =await axios.put(UPDATE_CUSTOMERCASHIN_DB,data)
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const deleteCustomercashin = createAsyncThunk("deleteCustomercashin",async(id)=>{
    console.log(DELETE_CUSTOMERCASHIN_DB+`/${id}`);
    try{
    const result =await axios.delete(DELETE_CUSTOMERCASHIN_DB+`/${id}`)
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

const addCustomercashinSlice = createSlice({
         name:"addCustomercashin",
         initialState:{
            addCustomercashin:[],
            status:"idle",
            error:""
         },
         reducers:{
            fetchCustomercashin:(state,action)=>{
                 state.addCustomercashin = action.payload
            }
         },
         extraReducers:(builder)=>{
             builder.addCase(addCustomercashin.pending,(state,action)=>{
                   state.status = "loading"
                   state.error = "null"
             })
             .addCase(addCustomercashin.fulfilled,(state,action)=>{
                   state.status = "succeeded"
                   state.addCustomercashin.push(action.payload)
             })
             .addCase(addCustomercashin.rejected,(state,action)=>{
                   state.status = "failed"
             })
             .addCase(getCustomercashin.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(getCustomercashin.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addCustomercashin = action.payload
              })
             .addCase(getCustomercashin.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(updateCustomercashin.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(updateCustomercashin.fulfilled,(state,action)=>{
                state.status = "succeeded"
                const index = state.addCustomercashin.findIndex(v => v._id === action.payload._id)
                state.addCustomercashin[index] = action.payload
              })
             .addCase(updateCustomercashin.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(deleteCustomercashin.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(deleteCustomercashin.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addCustomercashin = state.addCustomercashin.filter(v=> v._id !== action.payload._id )
              })
             .addCase(deleteCustomercashin.rejected,(state,action)=>{
                state.status = "failed"
              })
             
             return builder
         }
})

export const fetchCustomercashinData = state => state.customercashin.addCustomercashin
export default addCustomercashinSlice.reducer 