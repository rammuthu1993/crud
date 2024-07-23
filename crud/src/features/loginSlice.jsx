import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchLogin = createAsyncThunk("loginUser",async(data)=>{
    try{
        console.log(data);
       const response = await axios.post("http://localhost:3007/login/loginUser",data)
       console.log(response); 
       return response.data
    }
    catch(err){
       console.log(err.message);
    }
})



const loginSlice = createSlice({
name:"loginData",
initialState:{
   loginData:[],
   status:"idle",
   error:""
   },
reducers:{
searchLogin:(state,action)=>{
state.loginData = action.payload
}     
},
extraReducers:(builder)=>{
builder.addCase(fetchLogin.pending,(state,action)=>{
    state.status="loading"
})

.addCase(fetchLogin.fulfilled,(state,action)=>{
   state.status = "succeeded"
   state.loginData=action.payload
   console.log(action);
})

.addCase(fetchLogin.rejected,(state,action)=>{
   state.status = "failed"
})

return builder

}
})

export const getLogin = (state) => state.loginData
export const {searchLogin} = loginSlice.actions
export default loginSlice.reducer