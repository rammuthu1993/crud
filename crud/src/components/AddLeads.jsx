import React, { useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileArrowDown, faFileImport, faFilter, faPrint, faUpload, faUserPlus, faUsers} from '@fortawesome/free-solid-svg-icons'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addLeads } from '../features/addLeadsSlice'
import { useAuth } from '../Protection/auth'

export const AddLeads = () => {
  const {uxcard} = useAuth()   
    const [date,setDate] = useState("")
    const [name,setName] = useState("")
    const [qualification,setQualification] = useState("")
    const [yop,setYop] = useState("")
    const [phonenumber,setPhoneNumber] = useState("")
    const [location,setLocation] = useState("")
    const [updates,setUpdates] = useState("")
    const [detailssent,setDetailssent] = useState("")
    const [assignedto,setAssignedto] = useState("")
    const [course,setCourse] = useState("")
    const [source,setSource] = useState("")
    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    
    const handleSubmit = async(e) =>{
       e.preventDefault()
       const data = { date,name,qualification,yop,phonenumber,location,updates,detailssent,assignedto,course,source}
       const result =await dispatch(addLeads(data))
       console.log(result);
       navigate("/home/manageleads")
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
         <Link to="/home/manageleads" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/> Leads</Link>
         </span>

         <span className='text-primary h3'>Register Leads</span>

         <span></span>
         

        </div>
{/*---------------------------------------form-----------------------------------------------*/}
        <div className='mt-3 py-3'>
            <form id='addcommon' onSubmit={handleSubmit}>

               <div className='d-flex flex-wrap'>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="id">Date: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input className='border container-fluid' type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Name: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={name} onChange={(e)=>setName(e.target.value)} className='border container-fluid' type="text" />
                    </label>
                  </div>


                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Qualification: <span style={{color:"red"}}>*</span> <br /> <br />
                      <textarea className='border container-fluid' type="text" value={qualification} onChange={e=>setQualification(e.target.value)}></textarea>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Year of Passing: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={yop} onChange={e=>setYop(e.target.value)} className='border container-fluid' type="number" />
                    </label>
                  </div>
                  
                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Phone Number: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={phonenumber} onChange={(e)=>setPhoneNumber(e.target.value)} className='border container-fluid' type="text" />
                    </label>
                  </div>
                  

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Location: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={location} onChange={(e)=>setLocation(e.target.value)} className='border container-fluid' type="text" />
                    </label>
                  </div>
        

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Follow Updates: <span style={{color:"red"}}>*</span> <br /> <br />
                      <select className='border container-fluid' type="text" value={updates} onChange={e=>setUpdates(e.target.value)}>
                        <option value="None">None</option>
                        <option value="Interested">Interested</option>
                        <option value="Not Interested">Not Interested</option>
                        <option value="Call Back">Call Back</option>
                        <option value="No Response">No Response</option>
                        <option value="Call Done">Call Done</option>
                      </select>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Details Sent: <span style={{color:"red"}}>*</span> <br /> <br />
                      <select className='border container-fluid' type="text" value={detailssent} onChange={e=>setDetailssent(e.target.value)}>
                        <option value="None"></option>
                        <option value="None">Yes</option>
                        <option value="Interested">No</option>
                      </select>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Assigned To: <span style={{color:"red"}}>*</span> <br /> <br />
                      <select className='border container-fluid' type="text" value={assignedto} onChange={e=>setAssignedto(e.target.value)} aria-placeholder='Choose Mentor'>
                        <option value="None">No Options</option>
                      </select>
                    </label>
                  </div>

                  
                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Assigned To: <span style={{color:"red"}}>*</span> <br /> <br />
                      <select className='border container-fluid' type="text" value={course} onChange={e=>setCourse(e.target.value)} aria-placeholder='Choose Course'>
                        <option value="None">No Options</option>
                      </select>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Source: <span style={{color:"red"}}>*</span> <br /> <br />
                      <select className='border container-fluid' type="text" value={source} onChange={e=>setSource(e.target.value)}>
                        <option value="None">None</option>
                        <option value="Interested">Facebook</option>
                        <option value="Not Interested">Instagram</option>
                        <option value="Call Back">Ads</option>
                        <option value="No Response">Ref</option>
                      </select>
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


{/* <span className='h2 text-primary'>
                 Manage Leads
         </span>

         <span className='bg-primary text-primary h3'>
            <button className='btn btn-primary'>
                Add Leads&nbsp;<FontAwesomeIcon icon={faUserPlus} />
            </button>
            <button className='btn btn-primary'>
                Bulk Data&nbsp;<FontAwesomeIcon icon={faUpload} />
            </button>
            <button className='btn btn-primary'>
                Sample&nbsp;<FontAwesomeIcon icon={faFileImport} />
            </button>
            <button className='btn btn-primary'>
                Filter&nbsp;<FontAwesomeIcon icon={faFilter} />
            </button>
            <button className='btn btn-primary'>
                Excel Leads&nbsp;<FontAwesomeIcon icon={faFileImport} />
            </button>
            <button className='btn btn-primary'>
                Print&nbsp;<FontAwesomeIcon icon={faPrint} />
            </button>
         </span> */}