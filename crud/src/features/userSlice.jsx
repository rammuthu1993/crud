import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addUser = createAsyncThunk("adduser",async(data)=>{
    try{
        console.log(data);
    const response =await axios.post("http://localhost:3007/user/adduser",data)
    console.log(response);
    return response.data
    }
     catch(err){
        console.log(err);
     }
})

export const fetchUser = createAsyncThunk("fetchuser",async()=>{
    try{
    const response =await axios.get("http://localhost:3007/user/fetchuser")
    console.log(response);
    return response.data
    }
    catch(err){
        console.log(err);
    }
})

const userSlice = createSlice({
    name:"userData",
    initialState:{
        userData:[],
        status:"idle",
        error:""
    },
    reducers:{
        searchUser:(state,action)=>{
            state.userData=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addUser.pending,(state,action)=>{
            state.status = "loading"
        })
        .addCase(addUser.fulfilled,(state,action)=>{
             state.status = "succeeded"
            state.userData.push(action.payload)
        })
        .addCase(addUser.rejected,(state,action)=>{
            state.status = "failed"
        })
        .addCase(fetchUser.pending,(state,action)=>{
            state.status = "loading"
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.status = "succeeded"
            state.userData = action.payload
            console.log(action);
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.status = "failed"
        })
        return builder
    }
})

export default userSlice.reducer