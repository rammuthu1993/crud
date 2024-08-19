import {useEffect, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { addAttendance,fetchAttendance } from '../features/attendanceSlice'
import { fetchEmployeeData,getEmployee } from '../features/addEmployeeSlice'
import { useAuth } from '../Protection/auth'

export const AddAttendance = () => {
    const {uxcard} = useAuth()   
    const [employee,setEmployee] = useState("")
    const [status,setStatus] = useState("")
    const [permission,setPermission] = useState("")
    const [leave,setLeave] = useState("")
    const [Indate,setIndate] = useState("")
    const [intime,setIntime] = useState("")
    const [outdate,setOutDate] = useState("")
    const [outtime,setOuttime] = useState("")
    const [comments,setComments] = useState("")
    const navigate = useNavigate()
    
   const dispatch = useDispatch()
   const employeesList = useSelector(state => fetchEmployeeData(state))

   useEffect(()=>{
     dispatch(getEmployee())
   },[dispatch])
 
    const handleSubmit = async(e) =>{
       e.preventDefault()
       const data = {employee,status,permission,leave,Indate,intime:intime.substring(0,2) > 12 ? (("0")+(intime.substring(0,2) - 12)+(intime.substring(2))+":"+(intime.substring(0,2) >=12 ? ":PM" : ":AM") ) : intime+":AM",outdate,outtime:outtime.substring(0,2) > 12 ? (("0")+(outtime.substring(0,2) - 12)+(outtime.substring(2))+":"+(outtime.substring(0,2) >=12 ? "PM" : "AM") ) : outtime+":AM",comments}
       const result =await dispatch(addAttendance(data))
       setEmployee("");setStatus("");setPermission("");setLeave("");setIndate("");setIntime("");
       setOutDate("");setOuttime("");setComments("")
       navigate("/viewattendance")
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
         <Link to="/home/viewattendance" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/>Attendance List</Link>
         </span>

         <span className='text-primary h3'>Register Employee Attendance</span>

         <span></span>

        </div>
{/*---------------------------------------form-----------------------------------------------*/}
        <div className='mt-3 py-3'>
            <form id='addcommon' encType='multipart/form-data' onSubmit={handleSubmit}>

               <div className='d-flex flex-wrap'>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="id">Select Employee: <span style={{color:"red"}}>*</span> <br /> <br />
                        <select className='border container-fluid' name="employees" id="employees" onChange={(e)=>setEmployee(e.target.value)}>
                          {employeesList.length > 0 ? employeesList.map(v=> (<option value={v.firstname + v.lastname}>{v.firstname + v.lastname}</option>)) : (<option value='No Emloyees'>No Employees</option>)}
                        </select>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="" >Status Work: <span style={{color:"red"}}>*</span> <br /> <br />
                        <select className='border container-fluid' name="status" id="status" onChange={(e)=>setStatus(e.target.value)}>
                          <option value="select status">select status</option>
                          <option value="Work from Home">Work from Home</option>
                          <option value="In Office">In Office</option>
                        </select>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Permission: <span style={{color:"red"}}>*</span> <br /> <br />
                       <label htmlFor="">Yes:
                         <input type="radio" value="yes" name='permission' onChange={e=> setPermission(e.target.value)}/></label>&nbsp;
                         <label htmlFor="">No:
                         <input type="radio" value='no' name='permission' onChange={e=> setPermission(e.target.value)}/></label>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="leave">Leave: <span style={{color:"red"}}>*</span> <br /> <br />
                    <label htmlFor="">Yes:
                    <input type="radio" value="yes" name='leave' onChange={e=> setLeave(e.target.value)}/>
                    </label> &nbsp;
                    <label htmlFor="">No:
                    <input type="radio" value='no' name='leave' onChange={e=> setLeave(e.target.value)}/>
                    </label>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">In Date: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input className='border container-fluid' type="date" onChange={e=> setIndate(e.target.value)}/>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">In Time: <span style={{color:"red"}}>*</span> <br /> <br />
                    <input className='border container-fluid' min="10:00" max="18:00" type="time" onChange={e=> setIntime(e.target.value)}/>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Out Date: <span style={{color:"red"}}>*</span> <br /> <br />
                    <input className='border container-fluid' type="date" onChange={e=> setOutDate(e.target.value)}/>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Out Time: <span style={{color:"red"}}>*</span> <br /> <br />
                    <input className='border container-fluid' min="10:00" max="18:00" type="time" onChange={e=> setOuttime(e.target.value)}/>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Comments: <span style={{color:"red"}}>*</span> <br /> <br />
                       <textarea className='border container-fluid' name="comments" id="comments" value={comments} onChange={e=> setComments(e.target.value)}></textarea>
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
