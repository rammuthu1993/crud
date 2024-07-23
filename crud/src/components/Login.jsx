import React, { useState,useEffect,useCallback } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Protection/auth'
import { fetchLogin,searchLogin,getLogin} from '../features/loginSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom'

export const Login = () => {
    const [name,setName] = useState()
    const [password,setPassword] = useState()
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useAuth()
    const response = useSelector(state=> getLogin(state))  
     console.log(response);
     useEffect(()=>{
      if(response.loginData.status==="ok"){
        auth.setUser(response.loginData.role)
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

 
    <div className='container-fluid py-3' id='bg-img'>

<div className='row justify-content-between p-5'>
   <div className='col-md-6 p-4' id='kitkat-dash'>
    <div className='title p-5'>
      <h1 style={{fontSize:"70px"}}>KitKat Attendance Management System</h1>
      </div>
   </div>

   <div className='col-md-6 p-4'>
    <form style={{backgroundColor:"aliceblue"}} className='col-md-8 was-validated rounded-2 shadow-sm border border-secondary p-5 ms-5 mt-5' action="" autoComplete='on' onSubmit={handleSubmit}>
        <h1 className='text-primary text-center'>Login</h1>

        <div className='poistion-relative'>
            <input type="text" className='form-control' value={name} onChange={(e)=> setName(e.target.value)} placeholder='UserName' required/>
            {/* {fvalid && <p className='invalid-feedback'>Please fill require format</p>} */}
        </div>
                      <br />
        <div className='position-relative'>
            <input type="password" className='form-control' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password' required/>
            {/* {fvalid && <p className='invalid-feedback'>Please fill require format</p>} */}
        </div>
                          <br />
        <div><button type='submit' className='container btn btn-primary'>Submit</button></div>
    </form>
    </div>
    </div>

    </div>
  <footer className='container-fluid bg-dark p-3 text-center fixed-bottom'>
    <span className='text-white'>Created by :</span><span style={{color:"yellow"}} className='h4'>Muthukumar</span>
  </footer>
    </>
  )
}
