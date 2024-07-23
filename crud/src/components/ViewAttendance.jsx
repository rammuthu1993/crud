import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux'
import { fetchAttendance,updateAttendance,deleteAttendance,allAttendance } from '../features/attendanceSlice'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare,faTrash} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../Protection/auth'

export const ViewAttendance = () => {
    const path = useLocation()
    const dispatch = useDispatch()
    const [editDetails,setEditdetails] = useState()
    // const user = useSelector()
    const auth = useAuth()
    // console.log(user);
    const data = useSelector(state => allAttendance(state))
    console.log(data);
    const handleEdit=(i)=>{
      setEditdetails(data[i])
    }

   useEffect(()=>{
    setEmp_name(editDetails?.emp_name)
    setWorkStatus(editDetails?.workStatus)
    setIntime(editDetails?.inTime)
    setOuttime(editDetails?.outTime)
    setDate(editDetails?.date)
    setId(editDetails?._id)
   },[editDetails])

    console.log(editDetails);

    const [emp_name,setEmp_name] = useState()
    console.log(emp_name);
    const [workStatus,setWorkStatus] = useState()
    const [inTime,setIntime] = useState()
    const [date,setDate] = useState()
    const [outTime,setOuttime] = useState()
    const [id,setId] = useState()
    const [deleteData,setDeleteData] = useState()

    const handleUpdate=(id)=>{
      dispatch(updateAttendance({id,emp_name,workStatus,inTime,outTime,date})) 
      // setTimeout(()=>{dispatch(fetchAttendance())},500)
    }

    const handleDelete=()=>{
      dispatch(deleteAttendance(id))
    }

     useEffect(()=>{
      dispatch(fetchAttendance())
     },[dispatch])

    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerpage = 5
    const lastIndex = currentPage*recordsPerpage
    const firstIndex = lastIndex-recordsPerpage
    const result = data.slice(firstIndex,lastIndex)
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
  return (
    <>
    <div className='d-flex justify-content-center bg-primary p-3'><span className='h1 text-white'>Attendance Details</span>
    
    </div>

    <div className='mt-3'>
      <table className='table table-striped table-bordered table-hover shadow-sm container text-center'>
        <thead className='table-info'>
        <tr>
        <th>Student Name</th>
        <th>Image</th>
        <th>Work Status</th>
        <th>In Time</th>
        <th>Out Time</th>
        <th>Date</th>
        <th>Actions</th>
        </tr>
        </thead>
        <tbody>
             {result.length > 0 ? result.map((v,i)=>(
                <tr>
                <td>{v.emp_name}</td>
                <td>{v.image}</td>
                <td>{v.workStatus}</td>
                <td>{v.inTime}</td>
                <td>{v.outTime}</td>
                <td>{v.date}</td>
                <td><button onClick={()=>handleEdit(i)} type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#mymodal"><FontAwesomeIcon icon={faPenToSquare} /></button>&nbsp;<button onClick={()=>setId(v._id)} className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#delete"><FontAwesomeIcon icon={faTrash} /></button></td>
                </tr>)
                
              ) : <tr><td colSpan={6}>No data!</td></tr>} 
        </tbody>
      </table>

      <div className='d-flex justify-content-center'>
      <ul className='pagination'>
        <li className='page-item'><a href="#" style={{pointerEvents:currentPage==1 ? "none" : "auto"}} className='page-link' onClick={prevPage}>Prev</a></li>
        {page.map((v,i)=>(
          <li className='page-item' onClick={()=>changeCpage(v)} key={i}><Link className={`page-link ${currentPage===v}`}>{v}</Link></li>))}
        <li className='page-item'><a href="#" style={{pointerEvents:currentPage==npage ? "none" : "auto"}} className='page-link' onClick={nextPage}>Next</a></li>
      </ul>
      </div>
    </div>

   {/*---------------------------modal edit------------------------------------*/}

    <div id='mymodal' className='modal fade'>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
             <h1 className='modal-title text-center'>
              Update Details
             </h1>
             <button type='button' className='btn btn-close' data-bs-dismiss="modal"></button>
          </div>
          <div className='modal-body'>

      <table className='table table-striped table-bordered table-hover shadow-sm text-center'>
        <thead className='table-info'>
        <tr>
        <th>Student Name</th>
        <th>Work Status</th>
        <th>In Time</th>
        <th>Out Time</th>
        <th>Date</th>
        <th>Actions</th>
        </tr>
        </thead>
        <tbody>
             
                <tr>
                <td><input className='container-fluid' type="text" value={emp_name} onChange={(e)=>setEmp_name(e.target.value)}/></td>
                <td><input className='container-fluid' type="text" value={workStatus} onChange={(e)=>setWorkStatus(e.target.value)}/></td>
                <td><input className='container-fluid' type="text" value={inTime} onChange={(e)=>setIntime(e.target.value)}/></td>
                <td><input className='container-fluid' type="text" value={outTime} onChange={(e)=>setOuttime(e.target.value)}/></td>
                <td><input className='container-fluid' type="text" value={date} onChange={(e)=>setDate(e.target.value)}/></td>
                <td><button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="mymodal"><FontAwesomeIcon icon={faPenToSquare} onClick={()=>handleUpdate(id)}/></button>&nbsp;</td>
                </tr>
             
        </tbody>
      </table>

          </div>
        </div>
      </div>
    </div>

       {/*---------------------------------------------------------------------*/}
        <div id='delete' className='modal fade'>
          <div className='modal-dialog modal-lg'>
               <div className='modal-content'>
                <div className='modal-header bg-danger'>
                  <h3 className='modal-title text-white'>Confirm</h3>
                  <button type='button' className='btn btn-close' data-bs-dismiss='modal' ></button>
                </div>
                <div className='modal-body'>
                Are You sure want to delete ! <button className='btn btn-success' data-bs-dismiss="modal" onClick={handleDelete}>Yes</button>&nbsp;<button className='btn btn-danger' data-bs-dismiss="modal">No</button>
                </div>
                <div className='modal-footer'>
                  <button className='btn btn-danger' data-bs-dismiss="modal">Close</button>
                </div>
               </div>
          </div>
        </div>
    </>
  )
}
