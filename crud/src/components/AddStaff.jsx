import React, { useEffect, useRef, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getEmployee,fetchEmployeeData } from '../features/addEmployeeSlice'
import { useAuth } from '../Protection/auth'

export const AddStaff = () => {
  const {uxcard,id,setId} = useAuth()   
    const [staffname,setStaffname] = useState("")
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [comments,setComments] = useState("")
    const [dateofjoining,setDateOfJoining] = useState("")
    const dispatch = useDispatch()
    const employeeData = useSelector(state=>fetchEmployeeData(state))
            
    useEffect(()=>{
    dispatch(getEmployee())
    },[dispatch])
 
    const handleSubmit = async(e) =>{
       e.preventDefault()
       const data = {staffname,username,password,comments,dateofjoining}
    //    const result =await dispatch(addStudents(formData))
    }

  return (
    <>
      <div className='container-fluid py-3'>

        <div className='row'>

            <div className={uxcard ? "width-normal" : "width-small"}>
             <SideNavbar/>
            </div>

            <div className={uxcard ? "width-formal" : "width-high"}>
             <HeaderNav/>

            <div className='mt-3 rounded-4 border'>

                <div className='d-flex justify-content-around border border-top-0 border-start-0 border-end-0 py-2'>
 
                 <span className='rounded-5 bg-primary p-2'>
                 <Link to="/home/employeeslist" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/> Employee List</Link>
                 </span>

                 <span className='text-primary h3'>Register Staff</span>

                 <span></span>

                </div>
{/*---------------------------------------form-----------------------------------------------*/}
                <div className='mt-3 py-3'>
                    <form id='addcommon' encType='multipart/form-data' onSubmit={handleSubmit}>

                       <div className='d-flex flex-wrap'>
         
                          <div className='col-md-6 py-4'>
                            <label className='container-fluid' htmlFor="id">Staff Name: <span style={{color:"red"}}>*</span> <br /> <br />
                                <select className='border container-fluid' type="text" onChange={(e)=>setStaffname(e.target.value)} >
                                    <option value=""></option>
                                    {employeeData.length > 0 ? employeeData.map((v,i)=> (
                                       <option key={i} value={v.firstname+""+v.lastname}>{v.firstname}{v.lastname}</option>
                                    )): (<option>No options</option>)}
                                </select>
                            </label>
                          </div>

                          <div className='col-md-6 py-4'>
                            <label className='container-fluid' htmlFor="First Name">Date of Joining: <span style={{color:"red"}}>*</span> <br /> <br />
                                <input value={dateofjoining} onChange={(e)=>setDateOfJoining(e.target.value)} className='border container-fluid' type="date" />
                            </label>
                          </div>

                          <div className='col-md-6 py-4'>
                            <label className='container-fluid' htmlFor="">User Name: <span style={{color:"red"}}>*</span> <br /> <br />
                                <input value={username} onChange={(e)=>setUserName(e.target.value)} className='border container-fluid' type="text" />
                            </label>
                          </div>

                          <div className='col-md-6 py-4'>
                            <label className='container-fluid' htmlFor="">Password Name: <span style={{color:"red"}}>*</span> <br /> <br />
                                <input value={password} onChange={(e)=>setPassword(e.target.value)} className='border container-fluid' type="text" />
                            </label>
                          </div>

                          <div className='col-md-6 py-4'>
                            <label className='container-fluid' htmlFor="">Comments: <span style={{color:"red"}}>*</span> <br /> <br />
                                <input value={comments} onChange={(e)=>setComments(e.target.value)} className='border container-fluid' type="text" />
                            </label>
                          </div> 

                        </div>  

                        <div className='d-flex justify-content-center'>
                       <button type='submit' className='btn btn-primary'>Submit</button>
                       </div> 

                    </form>

                </div>

            </div>

            </div>

        </div>

      </div>
    </>
  )
}
