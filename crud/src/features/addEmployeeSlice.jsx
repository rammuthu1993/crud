import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_EMPLOYEE_DB,GET_EMPLOYEE_DB,UPDATE_EMPLOYEE_DB,DELETE_EMPLOYEE_DB } from "./url";

export const addEmployee = createAsyncThunk("addemployee",async(data)=>{
    console.log(data);
    try{
    const result =await axios.post(ADD_EMPLOYEE_DB,data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    if(result.data === 404){
        alert("This Id is already registered")
    }
    return result.data
    }
    catch(error){
        alert("Server error")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const getEmployee = createAsyncThunk("getemployee",async()=>{
    try{
    const result =await axios.get(GET_EMPLOYEE_DB)
    console.log(result);
    return result.data
     }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const updateEmployee = createAsyncThunk("updateemployee",async(data)=>{
    console.log(data);
    try{
    const result =await axios.put(UPDATE_EMPLOYEE_DB,data,{
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

export const deleteEmployee = createAsyncThunk("deleteemployee",async(id)=>{
    console.log(DELETE_EMPLOYEE_DB+`/${id}`);
    try{
    const result =await axios.delete(DELETE_EMPLOYEE_DB+`/${id}`)
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

const addEmployeeSlice = createSlice({
         name:"addEmployee",
         initialState:{
            addEmployee:[],
            status:"idle",
            error:""
         },
         reducers:{
            fetchEmployee:(state,action)=>{
                 state.addEmployee = action.payload
            }
         },
         extraReducers:(builder)=>{
             builder.addCase(addEmployee.pending,(state,action)=>{
                   state.status = "loading"
                   state.error = "null"
             })
             .addCase(addEmployee.fulfilled,(state,action)=>{
                   state.status = "succeeded"
                   state.addEmployee.push(action.payload)
             })
             .addCase(addEmployee.rejected,(state,action)=>{
                   state.status = "failed"
             })
             .addCase(getEmployee.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(getEmployee.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addEmployee = action.payload
              })
             .addCase(getEmployee.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(updateEmployee.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(updateEmployee.fulfilled,(state,action)=>{
                state.status = "succeeded"
                const index = state.addEmployee.findIndex(stu => stu._id === action.payload._id)
                state.addEmployee[index] = action.payload
              })
             .addCase(updateEmployee.rejected,(state,action)=>{
                state.status = "failed"
              })
              .addCase(deleteEmployee.pending,(state,action)=>{
                state.status = "loading"
                state.error = "null"
             })
             .addCase(deleteEmployee.fulfilled,(state,action)=>{
                state.status = "succeeded"
                state.addEmployee = state.addEmployee.filter(v=> v._id !== action.payload._id )
              })
             .addCase(deleteEmployee.rejected,(state,action)=>{
                state.status = "failed"
              })
             
             return builder
         }
})

export const fetchEmployeeData = state => state.employee.addEmployee
export default addEmployeeSlice.reducer 