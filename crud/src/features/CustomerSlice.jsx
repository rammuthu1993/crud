import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_CUSTOMER_DB,GET_CUSTOMER_DB,UPDATE_CUSTOMER_DB,DELETE_CUSTOMER_DB } from "./url";

export const addCustomer = createAsyncThunk("addCustomer",async(data)=>{
    console.log(data);
    try{
    const result =await axios.post(ADD_CUSTOMER_DB,data)
    return result.data
    }
    catch(error){
        alert("Server error")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const getCustomer = createAsyncThunk("getCustomer",async()=>{
    try{
    const result =await axios.get(GET_CUSTOMER_DB)
    console.log(result);
    return result.data
     }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const updateCustomer = createAsyncThunk("updateCustomer",async(data)=>{
    console.log(data);
    try{
    const result =await axios.put(UPDATE_CUSTOMER_DB,data,{
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

export const deleteCustomer = createAsyncThunk("deleteCustomer",async(id)=>{
    console.log(DELETE_CUSTOMER_DB+`/${id}`);
    try{
    const result =await axios.delete(DELETE_CUSTOMER_DB+`/${id}`)
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

const addCustomerSlice = createSlice({
         name:"addcustomer",
         initialState:{
            addCustomer:[],
            status:"idle",
            error:""
         },
         reducers:{
            fetchStudent:(state,action)=>{
                 state.addCustomer = action.payload
            }
         },
         extraReducers:(builder)=>{
             builder.addCase(addCustomer.pending,(state,action)=>{
                   state.status = "loading"
                   state.error = "null"
             })
             .addCase(addCustomer.fulfilled,(state,action)=>{
                   state.status = "succeeded"
                   state.addCustomer.push(action.payload)
             })
             .addCase(addCustomer.rejected,(state,action)=>{
                   state.status = "failed"
             })
             .addCase(getCustomer.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(getCustomer.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addCustomer = action.payload
              })
             .addCase(getCustomer.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(updateCustomer.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(updateCustomer.fulfilled,(state,action)=>{
                state.status = "succeeded"
                const index = state.addCustomer.findIndex(stu => stu._id === action.payload._id)
                state.addCustomer[index] = action.payload
              })
             .addCase(updateCustomer.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(deleteCustomer.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(deleteCustomer.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addCustomer = state.addCustomer.filter(v=> v._id !== action.payload._id )
              })
             .addCase(deleteCustomer.rejected,(state,action)=>{
                state.status = "failed"
              })
             
             return builder
         }
})

export const fetchCustomerData = state => state.customer.addCustomer
export default addCustomerSlice.reducer 