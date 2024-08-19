import React, { useEffect, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers,faTrash,faCircleExclamation, faDatabase } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { fetchCustomerData,getCustomer,deleteCustomer } from '../features/CustomerSlice'
import { useSelector,useDispatch } from 'react-redux'
import { useAuth } from '../Protection/auth'

export const Reports = () => {
  const {uxcard} = useAuth()   
  const data = useSelector(state=> fetchCustomerData(state))
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCustomer())
  },[dispatch])

  const handleDelete = ()=>{
        dispatch(deleteCustomer(id))
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
  <Link to="/createcashin" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/> Create</Link>
  </span>

  <span className='text-primary h3'>Manage Reports</span>

  <span></span>

  </div>

  <div className='container-fluid'>
      <div className='row p-2 justify-content-evenly'>
        
        <div style={{width:"23%"}} className='shadow-sm p-2 rounded border'>
            <div className='d-flex'><span className='pe-2'>Total Amount By Student</span>
                <FontAwesomeIcon className='h3 p-2 bg-primary rounded text-white' icon={faDatabase}/>
            </div>
            <span>Rs.10000</span>
        </div>

        <div style={{width:"23%"}} className='shadow-sm p-2 rounded border'>
        <div className='d-flex'><span className='pe-2'>Total Amount By Customers</span>
                <FontAwesomeIcon className='h3 p-2 bg-primary rounded text-white' icon={faDatabase}/>
            </div>
            <span>Rs.10000</span>
        </div>

        <div style={{width:"23%"}} className='shadow-sm p-2 rounded border'>
        <div className='d-flex'><span className='pe-2'>Total Amount By Cashin</span>
                <FontAwesomeIcon className='h3 p-2 bg-primary rounded text-white' icon={faDatabase}/>
            </div>
            <span>Rs.10000</span>
        </div>
        
        <div style={{width:"23%"}} className='shadow-sm p-2 rounded border'>
          <div className='d-flex'><span className='pe-2'>Total Amount In Cashout</span>
                <FontAwesomeIcon className='h3 p-2 bg-primary rounded text-white' icon={faDatabase}/>
            </div>
            <span>Rs.10000</span></div>  
           
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
