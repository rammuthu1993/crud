import React, { useEffect, useState,useCallback,useRef } from 'react'
import kitkatimg from '../imgs/kitkat.jpg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faUserPlus,faClipboardUser,faMagnifyingGlass,faBars,faExpand} from '@fortawesome/free-solid-svg-icons'
import { RxHamburgerMenu } from "react-icons/rx";
import { Link,useLocation } from 'react-router-dom'
import { addAttendance } from '../features/attendanceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,fetchUser } from '../features/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export const Home = () => {
  
       const [emp_name,setEmp_name] = useState("")
       const [workStatus,setWorkStatus] = useState("")
       const [inTime,setIntime] = useState("")
       const [date,setDate] = useState("")
       const [outTime,setOuttime] = useState("")
       const [formdata,setFormdata] = useState(true)
       const [uxcard,setUxcard] = useState(true)
       const [screen,setScreen] = useState(true)
       const [img,setImg] = useState("") 
       const screen1 = useFullScreenHandle();
       const dispatch = useDispatch()
       const [isLoad,setIsLoad] = useState(true)
       const location = useLocation()
       const change = useRef()

       const userdata = useSelector(state=> state.userData.userData)
       const userstatus = useSelector(state=> state.userData)
       console.log(userdata);
       
       useEffect(()=>{
       dispatch(fetchUser())
       },[dispatch])

       const reportChange = useCallback((state, handle) => {
        if (handle === screen1) {
          console.log('Screen 1 went to', state, handle);
          setScreen(!screen)
        }
      }, [screen1]);

       const handleAttendance = (e)=>{
         e.preventDefault()
         dispatch(addAttendance({emp_name,workStatus,inTime:`${inTime}:AM`,outTime:`${outTime.substring(0,2) > 12 ? "0"+(outTime.substring(0,2)-12+outTime.substring(2)) : outTime}:PM`,date:new Date(date).toDateString()})) 
         toast.success('Attendance added Successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
         setEmp_name("")
         setWorkStatus("")
         setIntime("")
         setOuttime("")
         setDate("")

       }
       
       const handleUser = (e)=>{
        e.preventDefault()
        dispatch(addUser({name:emp_name,course:workStatus}))
        toast.success('User added Successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          setEmp_name("")
          setWorkStatus("")
       }

       const menuAction = () =>{
          setUxcard(!uxcard)
       }


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
    {/* <span className='spinner spinner-border text-primary'></span> */}
    <FullScreen handle={screen1} onChange={reportChange}>
    <div className='full-screenable-node container-fluid p-4 bg-white'>
        <div className='row'>
        <div className= {uxcard ? 'col-sm-2 border rounded-1 bg-white uxtransition' : 'col-sm-1 border rounded-1 bg-white uxtransition'}>

        <nav className='navbar'>
        <div className='container-fluid'>
        <ul className={uxcard ? 'navbar-nav text-primary lh-lg' : 'navbar-nav align-items-center justify-content-center'}>
          <li className='nav-item border-bottom border-dark text-decoration-none'><img className='w-100' style={{height:"100px"}} src={kitkatimg} alt="" /></li>

          <li className='nav-item border-bottom border-dark d-flex align-items-center py-1'><span className={uxcard ? 'mt-2 p-2 border-dark rounded-circle h1 text-white bg-primary' : 'mt-2 p-2 rounded-circle h1 text-white bg-primary'}>A</span>&nbsp;&nbsp;{uxcard && <span>Admin</span>}</li>
            
          <li title='Student Info' className='p-2'><a href='#menuone' className='text-decoration-none' data-bs-toggle='collapse'><FontAwesomeIcon icon={faUser}/>&nbsp;&nbsp;<span className={uxcard ? '' :'d-none' }>Student Info</span></a></li>

          <ul id='menuone' className='list-unstyled collapse '>
          <li title='Add User' className={uxcard ? "p-2 border-bottom border-dark" : 'text-center p-2 border-dark'} onClick={(e)=>setFormdata(false)}><Link className='text-decoration-none'><FontAwesomeIcon icon={faUserPlus} />&nbsp;&nbsp;<span className={uxcard ? '' :'d-none' }>Add User</span></Link></li>

          <li title='Add Attendance' className={uxcard ? "p-2 border-bottom border-dark" : 'text-center p-2 border-dark'} onClick={(e)=>setFormdata(true)}><Link className='text-decoration-none'><FontAwesomeIcon icon={faUserPlus} />&nbsp;&nbsp;<span className={uxcard ? '' :'d-none' }>Add attendance</span> </Link></li>

          <li title='View Attendance' className={uxcard ? "p-2" : "text-center p-2"}><Link to
          ='/viewattendance' className='text-decoration-none'><FontAwesomeIcon icon={faClipboardUser} />&nbsp;&nbsp;<span className={uxcard ? '' :'d-none' }>View attendance</span></Link></li>
          </ul>
          
        </ul>
        </div>
        </nav>
        </div>

        <div className={uxcard ? 'col-sm-10 uxtransition' : 'col-sm-11 uxtransition position-relative'}>
        <nav className='rounded-5 navbar navbar-expand col-md-12 p-3 bg-white shadow-sm'>
    
         
         <ul className='navbar-nav align-items-center col-md-12' >
              
             <li className='nav-item'><div ref={change} type='button' onClick={()=>menuAction()}>
              <div className={uxcard ? 'bar1' : 'icon bar1'}></div>
              <div className={uxcard ? 'bar2' : 'icon bar2'}></div>
              <div className={uxcard ? 'bar3' : 'icon bar3'}></div>
              </div></li>

             <li className='nav-item container-fluid'><div className='d-flex bg-white align-items-center rounded-5 border p-2'><span className='px-2'><FontAwesomeIcon icon={faMagnifyingGlass} /></span><input type="text" className='border-0 bg-white container-fluid text-white' style={{outlineStyle:"none"}}/></div></li>
                                                      
             <li className='nav-item'>{screen ? <span onClick={screen1.enter}><FontAwesomeIcon icon={faExpand} className='h2 p-1'/></span> : <span onClick={screen1.exit}><FontAwesomeIcon icon={faExpand} className='h3 p-1'/></span>}</li>
         </ul>
        
               
        </nav>
        
        

        {/*-----------------------------application----------------------------------------*/}
        {formdata ? <div className='bg-white mt-3 shadow-sm rounded-2 d-flex justify-content-center py-3'>
          <form action="" autoComplete='on' onSubmit={handleAttendance} className='col-md-6 p-3 rounded border'>
            <h1 className='h1 text-center text-primary'>Add Attendance</h1>
             <div className='d-flex justify-content-between container-fluid'>

              <div >
              <label htmlFor="" className='form-label'>Student Name:
                <select id="" className='form-select' value={emp_name} onChange={(e)=>setEmp_name(e.target.value)}>
                  {userdata.map((user)=>(<option value={user.name}>{user.name}</option>))  }
                </select>
              </label>
              </div>

              <div>
                <label htmlFor="" className='form-label'>Work Status:
                  <input type="text" value={workStatus} className='form-control' onChange={(e)=>setWorkStatus(e.target.value)} required/>
                </label>

              </div>
             </div>
         
             <div className='d-flex justify-content-between container-fluid'>

              <div>
                <label htmlFor="" className='form-label'>Intime:
                  <input type="time"  value={inTime} className='form-control' onChange={(e)=>setIntime(e.target.value)} min={"09:00:00"} max={"11:49:00"} required/>
                </label>
              </div>

              <div>
                <label htmlFor="" value={outTime} className='form-label'>Outtime:
                  <input type="time" className='form-control' value={outTime} onChange={(e)=>setOuttime(e.target.value)} min={"12:00:00"} max={"18:00:00"}/>
                </label>
              </div>

              </div>

              <div className='d-flex justify-content-between container-fluid'>
                <div>
                 <label htmlFor="" className='form-label'>Date:
                  <input type="date" value={date} className='form-control' onChange={(e)=>setDate(e.target.value)}/>
                 </label>
                 </div>

              <div >
              <label htmlFor="" className='form-label'>Student Name:
                <select id="" className='form-select' value={img} onChange={(e)=>setImg(e.target.value)}>
                  {userdata.map((user)=>(<option value={user.image}>{user.image}</option>))  }
                </select>
              </label>
              </div>
              </div>
                    <div className='d-flex justify-content-center'><button type='submit' className='col-md-6 bg-primary btn text-white '>Submit</button></div>
             
          </form>
          </div> : <div className='mt-3 d-flex justify-content-center p-5 border rounded-2 shadow-sm bg-white'>
            <form className='p-5 border rounded-2 shadow-sm' action="" onSubmit={handleUser} encType='multipart/form-data'>
            <h1 className='text-primary'>Add User</h1>
            <div>
              <label htmlFor="" className='form-label'>Name:
                <input className='form-control' type="text" value={emp_name} onChange={(e)=>setEmp_name(e.target.value)} required/>
              </label>
            </div>

            <div>
              <label htmlFor="" className='form-label'>Course:
                <input className='form-control' type="text" value={workStatus} onChange={(e)=>setWorkStatus(e.target.value)} required/>
              </label>
            </div>

            <button type='submit' className='btn btn-primary container'>submit</button>
          </form></div>    }

          {/*---------------------------addUser---------------------------------------*/}

          <div>
            <img src={img} alt="" />
          </div>
                 
    </div>
    </div>



    </div>

    </FullScreen>
    </>
  )
}


{/* <div className='accordian'>

<div className=''><span className='h1 bg-primary text-white rounded-circle p-2'>A</span>Admin</div>

    <div className='card border-0'>
 <div className='card-header bg-white'>
  <a href='#menuone' className='btn text-start container-fluid bg-white text-primary' data-bs-toggle='collapse' ><FontAwesomeIcon icon={faUser}/>&nbsp;&nbsp;Student Info</a></div>     
  <div id='menuone' className='collapse'>
  <ul className='text-primary card-body list-unstyled lh-lg'  data-bs-parent='accordian'>
     <li><Link><FontAwesomeIcon icon={faUserPlus} />&nbsp;&nbsp;Add user</Link></li>
     <li><Link><FontAwesomeIcon icon={faClipboardUser} />&nbsp;&nbsp;Add attendance</Link></li>
  </ul>
  </div>
  </div>
  </div> */}