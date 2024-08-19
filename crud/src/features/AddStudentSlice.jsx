import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_STUDENT_DB,GET_STUDENT_DB,UPDATE_STUDENT_DB,DELETE_STUDENT_DB } from "./url";

export const addStudents = createAsyncThunk("addStudent",async(data)=>{
    console.log(data);
    try{
    const result =await axios.post(ADD_STUDENT_DB,data,{
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

export const getStudents = createAsyncThunk("getStudents",async()=>{
    try{
    const result =await axios.get(GET_STUDENT_DB)
    console.log(result);
    return result.data
     }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

export const updateStudents = createAsyncThunk("updateStudents",async(data)=>{
    console.log(data);
    try{
    const result =await axios.put(UPDATE_STUDENT_DB,data,{
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

export const deleteStudents = createAsyncThunk("deleteStudents",async(id)=>{
    console.log(DELETE_STUDENT_DB+`/${id}`);
    try{
    const result =await axios.delete(DELETE_STUDENT_DB+`/${id}`)
    console.log(result);
    return result.data
    }
    catch(error){
        alert("Something went wrong")
        throw new Error(error.response.data.error || "Please try again later")
    }
})

const AddstudentSlice = createSlice({
         name:"addstudent",
         initialState:{
            loading:false,
            addStudent:[],
            error:""
         },
         reducers:{
            fetchStudent:(state,action)=>{
                 state.addStudent = action.payload
            }
         },
         extraReducers:(builder)=>{
             builder.addCase(addStudents.pending,(state,action)=>{
                   state.loading = false
                   state.error = "null"
             })
             .addCase(addStudents.fulfilled,(state,action)=>{
                   state.loading=false
                   state.addStudent.push(action.payload)
             })
             .addCase(addStudents.rejected,(state,action)=>{
                   state.loading = false
             })
             .addCase(getStudents.pending,(state,action)=>{
                state.loading=true
                state.error = "null"
             })
             .addCase(getStudents.fulfilled,(state,action)=>{
                state.loading=false
                state.addStudent = action.payload
              })
             .addCase(getStudents.rejected,(state,action)=>{
                state.loading = false
              })
              .addCase(updateStudents.pending,(state,action)=>{
                state.loading = false
                state.error = "null"
             })
             .addCase(updateStudents.fulfilled,(state,action)=>{
                state.loading=false
                const index = state.addStudent.findIndex(stu => stu._id === action.payload._id)
                state.addStudent[index] = action.payload
              })
             .addCase(updateStudents.rejected,(state,action)=>{
                state.loading = false
              })
              .addCase(deleteStudents.pending,(state,action)=>{
                state.loading = false
                state.error = "null"
             })
             .addCase(deleteStudents.fulfilled,(state,action)=>{
                state.loading=false
                state.addStudent = state.addStudent.filter(v=> v._id !== action.payload._id )
              })
             .addCase(deleteStudents.rejected,(state,action)=>{
                state.loading = false
              })
             
             return builder
         }
})

export const fetchStudentData = state => state.addStudent.addStudent
export const getStatus = (state)=> {return state.addStudent.status}
export default AddstudentSlice.reducer 