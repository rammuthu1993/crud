import React, { useEffect, useState,useCallback,useRef } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { Link,useLocation } from 'react-router-dom'
import { addAttendance } from '../features/attendanceSlice';
import { addUser,fetchUser } from '../features/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser,faUsers,faSquarePollVertical,faFileInvoice} from '@fortawesome/free-solid-svg-icons'
import { DashBoardCalendar } from './Calendar';
import { SideNavbar } from './SideNavbar';
import { HeaderNav } from './HeaderNav';
import Calendar from 'react-calendar';
import { HomeChart } from './Chart'
import { useDispatch,useSelector } from 'react-redux';
import { getStudents,fetchStudentData } from '../features/AddStudentSlice'
import { getEmployee,fetchEmployeeData } from '../features/addEmployeeSlice';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { useAuth } from '../Protection/auth';
import { useNavigate } from 'react-router-dom';

export const InvoicenoSet = () => {
const {uxcard,invoiceno,setInvoiceNo} = useAuth()
const [setid,setSetid] = useState()
const navigate = useNavigate()
  const screen1 = useFullScreenHandle();

  const handleSubmit =(e)=>{
    console.log("hai");
      e.preventDefault()
      setInvoiceNo(setid)
      setSetid("")
      navigate("/home/addcustomer")
  }

  return (
    <>
    
    <div className='container-fluid py-2'>
    
    <div className='row'>

    <div className={uxcard ? "width-normal" : "width-small"}>
    <SideNavbar/>
    </div>

    <div className={uxcard ? "width-formal" : "width-high"}>
     <HeaderNav/>
    
    <div className='mt-3 border'>
      <div className='py-4 border'></div>
     <div>
     <form className='d-flex flex-column justify-content-center align-items-center' onSubmit={handleSubmit}>
        <label className='container-fluid'>Set Invoice No: <br />
        <input value={setid} className='container-fluid' onChange={e=> setSetid(e.target.value)} type="text" />
        </label>
        <br />
        <span>
        <button type='submit' className='btn btn-primary'>Set</button>
        </span>
        </form>  

      </div>
    </div>
    </div>
    </div>

   </div> 
    
   
        
    </>
  )
}



