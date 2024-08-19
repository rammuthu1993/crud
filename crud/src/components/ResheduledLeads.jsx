import React, { useEffect, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getLeads,fetchLeadsData,deleteLeads } from '../features/addLeadsSlice'
import { useSelector,useDispatch } from 'react-redux'
import { faUsers,faTrash,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useAuth } from '../Protection/auth'

export const ResheduledLeads = () => {
  const {uxcard} = useAuth()   
  const data = useSelector(state=> fetchLeadsData(state))
  const [id,setId] = useState()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getLeads())
  },[dispatch])

  const handleDelete = ()=>{
        dispatch(deleteLeads(id))
  }

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
  <Link to="/home/addvendor" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/> Leads</Link>
  </span>

  <span className='text-primary h3'>Resheduled Leads</span>

  <span></span>

  </div>

  <div>
      <div>

           <table className='table table-borderless table-striped'>
            <thead>
                <tr className='table-secondary'>
                <th>#</th>    
                <th>Created</th>
                <th>Name</th>
                <th>Qaulif</th>
                <th>YOP</th>
                <th>Mobile</th>
                <th>Location</th>
                <th>Course</th>
                <th>FolUps</th>
                <th>Sent</th>
                <th>Reshed</th>
                <th>Assignee</th>
                <th>Source</th>
                <th>Actions</th>
                </tr>
                </thead>
            <tbody>
                 {result.length > 0 ? result.map((v,i)=>( 
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{v.date}</td>
                        <td>{v.name}</td>
                        <td>{v.qualification}</td>
                        <td>{v.yop}</td>
                        <td>{v.phonenumber}</td>
                        <td>{v.location}</td>
                        <td>{v.course}</td>
                        <td>{v.updates}</td>
                        <td>{v.detailssent}</td>
                        <td>{v.resheduled}</td>
                        <td>{v.assignedto}</td>
                        <td>{v.source}</td>
                        <td>

                            <button data-bs-toggle='modal' data-bs-target='#delete' style={{width:"30px",height:"30px",marginTop:"-20px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-danger' icon={faTrash}  onClick={()=>setId(v._id)}/></button>&nbsp;

                        </td>
                    </tr>
                 ) ): (<tr><td colSpan={14} className='text-center'>No Leads data available.Add Leads.</td></tr>) }
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
