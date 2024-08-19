import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_VENDOR_DB,GET_VENDOR_DB,UPDATE_VENDOR_DB,DELETE_VENDOR_DB } from "./url";

export const addVendor = createAsyncThunk("addVendor",async(data)=>{
    console.log(data);
    try{
    const result =await axios.post(ADD_VENDOR_DB,data)
    return result.data
    }
    catch(error){
        alert("Server error")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const getVendor = createAsyncThunk("getVendor",async()=>{
    try{
    const result =await axios.get(GET_VENDOR_DB)
    console.log(result);
    return result.data
     }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const updateVendor = createAsyncThunk("updateVendor",async(data)=>{
    console.log(data);
    try{
    const result =await axios.put(UPDATE_VENDOR_DB,data)
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const deleteVendor = createAsyncThunk("deleteVendor",async(id)=>{
    console.log(DELETE_VENDOR_DB+`/${id}`);
    try{
    const result =await axios.delete(DELETE_VENDOR_DB+`/${id}`)
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

const addVendorSlice = createSlice({
         name:"addVendor",
         initialState:{
            addVendor:[],
            status:"idle",
            error:""
         },
         reducers:{
            fetchVendor:(state,action)=>{
                 state.addVendor = action.payload
            }
         },
         extraReducers:(builder)=>{
             builder.addCase(addVendor.pending,(state,action)=>{
                   state.status = "loading"
                   state.error = "null"
             })
             .addCase(addVendor.fulfilled,(state,action)=>{
                   state.status = "succeeded"
                   state.addVendor.push(action.payload)
             })
             .addCase(addVendor.rejected,(state,action)=>{
                   state.status = "failed"
             })
             .addCase(getVendor.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(getVendor.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addVendor = action.payload
              })
             .addCase(getVendor.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(updateVendor.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(updateVendor.fulfilled,(state,action)=>{
                state.status = "succeeded"
                const index = state.addVendor.findIndex(stu => stu._id === action.payload._id)
                state.addVendor[index] = action.payload
              })
             .addCase(updateVendor.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(deleteVendor.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(deleteVendor.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addVendor = state.addVendor.filter(v=> v._id !== action.payload._id )
              })
             .addCase(deleteVendor.rejected,(state,action)=>{
                state.status = "failed"
              })
             
             return builder
         }
})

export const fetchVendorData = state => state.vendor.addVendor
export default addVendorSlice.reducer 