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
import { useAuth } from '../Protection/auth';
import { HomeChart } from './Chart'
import { useDispatch,useSelector } from 'react-redux';
import { getStudents,fetchStudentData } from '../features/AddStudentSlice'
import { getEmployee,fetchEmployeeData } from '../features/addEmployeeSlice';
import { parse } from '@fortawesome/fontawesome-svg-core';

export const Home = () => {
const studentsCount = useSelector(state=> fetchStudentData(state))
const employeesCount = useSelector(state=> fetchEmployeeData(state))
const dispatch = useDispatch()
  const screen1 = useFullScreenHandle();
  const year = [2016,2017,2018,2019,2020,2021,2022,2023,2024]
  const {uxcard} = useAuth()   

       useEffect(()=>{
             dispatch(getStudents())
             dispatch(getEmployee())
       },[dispatch])
       const reportChange = useCallback((state, handle) => {
        if (handle === screen1) {
          console.log('Screen 1 went to', state, handle);
          setScreen(!screen)
        }
      }, [screen1]);

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>

    <div className=' py-2'>
    
    <div className='row'>

    <div className={uxcard ? "width-normal" : "width-small"}>
    <SideNavbar/>
    </div>

    <div className={uxcard ? "width-formal" : "width-high"}>
     <HeaderNav/>
    
    <div className='mt-3 rounded-4 border'>

    <div className='py-3'>
         <div className='d-flex justify-content-around flex-wrap'>
             <div className='col-md-2 dash-menu p-2 h5 border rounded-1 d-flex align-items-center justify-content-evenly'>Employees<FontAwesomeIcon   className='p-1 rounded-1 bg-primary text-white h2' icon={faCircleUser} /> 
             <br />
             <span>{employeesCount.length}</span>
             </div>
             <div className='col-md-2 dash-menu p-2 h5 border rounded-1 d-flex align-items-center justify-content-evenly'>Students<FontAwesomeIcon   className='p-1 rounded-1 bg-primary text-white h2' icon={faUsers} />
             <br />
             <span>{studentsCount.length}</span>
             </div>
             <div className='col-md-2 dash-menu p-2 h5 border rounded-1 d-flex align-items-center justify-content-evenly'>Clients<FontAwesomeIcon   className='p-1 rounded-1 bg-primary text-white h2' icon={faSquarePollVertical} />
             <br /> 
             <span></span>
             </div>
             <div className='col-md-2 dash-menu p-2 h5 border rounded-1 d-flex align-items-center justify-content-evenly'>Invoices<FontAwesomeIcon   className='p-1 rounded-1 bg-primary text-white h2' icon={faFileInvoice} />
             <br />
             <span></span>
             </div>
        </div>
    </div>
{/*---------------------------graph-data---------------------------------------------------*/}
    <div className='mt-3 shadow-sm'>

      <div className='row d-flex justify-content-evenly'>

      <div className='col-md-8 border rounded-4'>

        <div className='d-flex flex-column p-4 justify-content-center align-items-center '>

            <form action="" className='col-md-8'>
              <div className='container-fluid d-flex justify-content-around'>
              <label htmlFor="students" className='h4'>No of Students per Course</label>
              <select name="year" id="year" value="2024">
                {year.map((v,i)=>(<option key={i}>{v}</option>))}
              </select>         
              </div>
            </form>
                                    <br />
           <HomeChart/>
        </div>

        

      </div>

      <div className='col-md-3 border rounded-4'>

          <div className='text-center py-3'>
            <h5>Calendar Events</h5>
            <span className='text-secondary'>Important Goals and Events are marked</span>
          </div>
             
          <div>
          <DashBoardCalendar/>
          </div>
      </div>

      </div>
    </div>
    </div>
    </div>

   </div> 
    
   </div>
        
    </>
  )
}


