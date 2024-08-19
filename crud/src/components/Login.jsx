import React, { useState,useEffect,useCallback } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Protection/auth'
import { fetchLogin,searchLogin,getLogin} from '../features/loginSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom'
import { Stack, TextField,InputAdornment,Typography,Box,Button,Grid,FormControl } from "@mui/material"

export const Login = () => {
  const auth = useAuth()
  const {user,setUser} = useAuth()
  
    const [name,setName] = useState()
    const [password,setPassword] = useState()
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const response = useSelector(state=> getLogin(state))  
     console.log(response);

     useEffect(()=>{
      try{
      if(response?.loginData.status==="ok" ){
        setUser(response.loginData.role)
        localStorage.setItem("token",response.loginData.role)
        toast.success(' Login Successful!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
       setTimeout(()=>{navigate("/home")},2000)   
        }
     else if(response.loginData==="rejected"){
      dispatch(searchLogin(""))
      toast.error('Login failed!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
     }}
     catch(err){
      dispatch(searchLogin(""))
      toast.error('Server Error!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
     }
     
    },[response]) 

    
    const handleSubmit = (e)=>{
      e.preventDefault()
      dispatch(fetchLogin({name,password})) 
      
   }
    
  
     
  return (
    <>

<ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
  <Box id='custom-border' sx={{boxShadow:3,borderTop:5}} className='position-absolute top-50 start-50 translate-middle p-4 rounded-2' style={{width:"300px"}} spacing={4}>
    <Typography variant='h5' color='primary' className='text-center'>Login</Typography> 
    <br />
    <Stack direction='column' spacing={4}>
      <TextField value={name} onChange={e=> setName(e.target.value)} size='small' label="Name" variant='outlined'/>
      <TextField type='password' value={password} onChange={e=> setPassword(e.target.value)} size='small' label="Password" variant='outlined'/>
      <Typography variant='h6' color='#9e9e9e' fontSize="16px" className='text-center'>Forgot password?</Typography>
    </Stack>
    <Grid container justifyContent='center' className='mt-3'>
    <Button type='submit' onClick={handleSubmit} variant='contained' color='primary'>Submit</Button>
    </Grid>
    </Box> 
    </>
  )
}


{/* <form style={{backgroundColor:"aliceblue"}} className='col-md-8 was-validated rounded-2 shadow-sm border border-secondary p-5 ms-5 mt-5' action="" autoComplete='on' onSubmit={handleSubmit}>
<h1 className='text-primary text-center'>Login</h1>

<div className='poistion-relative'>
    <input type="text" className='form-control' value={name} onChange={(e)=> setName(e.target.value)} placeholder='UserName' required/>
    {/* {fvalid && <p className='invalid-feedback'>Please fill require format</p>} */}
/* </div>
              <br />
<div className='position-relative'>
    <input type="password" className='form-control' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password' required/>
    {/* {fvalid && <p className='invalid-feedback'>Please fill require format</p>} */
/* </div>
                  <br />
<div><button type='submit' className='container btn btn-primary'>Submit</button></div>
</form>  */