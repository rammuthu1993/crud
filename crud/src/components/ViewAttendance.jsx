import React, { useEffect, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers,faPenToSquare,faTrash,faEye,faPlus,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { fetchAttendance,updateAttendance,deleteAttendance,allAttendance } from '../features/attendanceSlice'
import { useSelector,useDispatch } from 'react-redux'
import { useAuth } from '../Protection/auth'

export const ViewAttendance = () => {
  const {uxcard} = useAuth()   
  const data = useSelector(state=> allAttendance(state))
  const status = useSelector(state=> state.attendance)
  const [attendancedata,setAttendancedata] = useState([])
  const [id,setId] = useState()
  const dispatch = useDispatch()

  useEffect(()=>{
     setAttendancedata([...data])
  },[data])

  useEffect(()=>{
    dispatch(fetchAttendance())
  },[dispatch])

  const handleDelete = ()=>{
        dispatch(deleteAttendance(id))
  }

  const handleAttendancesearch = (e)=>{
    const newData = data.filter(v=> ((v.employee).toUpperCase()).includes((e.target.value).toUpperCase()))
    setAttendancedata([...newData])
  }

    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerpage = 5
    const lastIndex = currentPage*recordsPerpage
    const firstIndex = lastIndex-recordsPerpage
    const result = attendancedata.slice(firstIndex,lastIndex)
    const npage = Math.ceil(data.length/recordsPerpage)
    const page = [...Array(npage+1).keys()].slice(1)

    console.log(page);

    const prevPage=()=>{
          setCurrentPage(prevState=> prevState-1)
    }
    const nextPage=()=>{
          setCurrentPage(prevState=> prevState+1)
    }
    const changeCpage = (v)=>{
      console.log();
      setCurrentPage(v)
    }

    if(status.loading){
      return (<div className='position-absolute top-50 start-50 translate-middle'>Loading...</div>)
    }
    
  return (
    <>
<div className='container-fluid'>

<div className='row'>

<div className={uxcard ? "width-normal" : "width-small"}>
 <SideNavbar/>
</div>

<div className={uxcard ? "width-formal" : "width-high"}>
     
  <HeaderNav/>   

<div className='border rounded-3 mt-3'>
    
  <div className='d-flex justify-content-around border border-top-0 border-start-0 border-end-0 py-2'>

  <span className='rounded-5 bg-primary p-2'>
  <Link to="/home/addattendance" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/> Add Attendance</Link>
  </span>

  <span className='text-primary h3'>Manage Employees Attendance</span>

  <span></span>

  </div>

  <div className='p-3'>
      <div className='border'>
      <div id='addcommon'><input style={{height:"40px"}} className='container-fluid border-0 ps-2 input' type="text" placeholder='Search here' onChange={handleAttendancesearch}/></div>

           <table className='table table-borderless table-striped'>
            <thead>
                <tr className='table-secondary'>
                <th>Name</th>
                <th>Status</th>
                <th>Permission</th>
                <th>Leave</th>
                <th>On-Date</th>
                <th>On-Time</th>
                <th>Relieve Date</th>
                <th>Relieve Time</th>
                <th>Comments</th>
                <th>Actions</th>
                </tr>
                </thead>
            <tbody>
                 {result.length > 0 ? result.map((v,i)=>( 
                    <tr key={i}>
                        <td>{v.employee}</td>
                        <td>{v.status}</td>
                        <td>{v.permission}</td>
                        <td>{v.leave}</td>
                        <td>{v.Indate}</td>
                        <td>{v.intime}</td>
                        <td>{v.outdate}</td>
                        <td>{v.outtime}</td>
                        <td>{v.comments}</td>
                        <td>

                            <button data-bs-toggle='modal' data-bs-target='#delete' style={{width:"30px",height:"30px",marginTop:"-20px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-danger' icon={faTrash}  onClick={()=>setId(v._id)}/></button>&nbsp;

                        </td>
                    </tr>
                 ) ): (<tr><td colSpan={9} className='text-center'>No student data available...</td></tr>) }
                </tbody>
           </table>

           <div className='d-flex justify-content-end'><ul className='pagination'>
           <li className='page-item' onClick={prevPage}><a className='page-link' href="#">Prev</a></li>
            {page.length > 0 ? page.map(v=><li className='page-item'onClick={()=>changeCpage(v)}><a className='page-link' href="#">{v}</a></li>) : (<li className='page-item'><a className='page-link' href="#">No Page</a></li>)}
            <li className='page-item' onClick={nextPage}><a className='page-link' href="#">Next</a></li>
            </ul></div>
           
      </div>
  </div>
  
  </div>

</div>

</div>

{/*----------------------------------modal-----------------------------------------------*/}
 
 <div id='delete' className='modal fade'>
  <div className='modal-dialog'>
    <div className='modal-content'>
      <div className='modal-body'>
         <div className='p-3 d-flex justify-content-center'><FontAwesomeIcon style={{color:"red",fontSize:"70px"}} icon={faCircleExclamation} /></div>
         <p style={{color:"red"}}>Once You delete data cannot retrieve again ! are you sure want to delete ?</p>
         <div className='d-flex justify-content-center'>
        <button className='btn btn-success' data-bs-dismiss='modal' onClick={handleDelete}>Yes</button>  &nbsp;
        <button className='btn btn-warning' data-bs-dismiss='modal'>No</button>
        </div>
      </div>
      <div className='modal-footer'>
        <button className='btn btn-warning' data-bs-dismiss='modal'>Close</button>
    </div>
    </div>

  </div>
 </div>

</div>
    </>
  )
}
