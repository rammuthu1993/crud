import React, { useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addVendor } from '../features/addVendorSlice'
import { useAuth } from '../Protection/auth'

export const AddVendor = () => {
  const {uxcard} = useAuth()   
    const [vendorname,setVendorname] = useState("")
    const [vendortype,setVendorType] = useState("")
    const [contactnumber,setContactNumber] = useState("")
    const [email,setEmail] = useState("")
    const [address,setAddress] = useState("")
    const [currentbalance,setCurrentbalance] = useState("")
    const [paidamount,setPaidamount] = useState("")
    const [remainingamount,setRemainingamount] = useState("")
    const [comments,setComments] = useState("")
    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    
    const handleSubmit = async(e) =>{
       e.preventDefault()
       const data = {vendorname,vendortype,contactnumber,email,address,paidamount,remainingamount,comments}
       const result =await dispatch(addVendor(data))
       console.log(result);
       navigate("/managevendors")
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
         <Link to="/home/managevendors" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/> Vendors</Link>
         </span>

         <span className='text-primary h3'>Register Vendors</span>

         <span></span>

        </div>
{/*---------------------------------------form-----------------------------------------------*/}
        <div className='mt-3 py-3'>
            <form id='addcommon' onSubmit={handleSubmit}>

               <div className='d-flex flex-wrap'>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="id">Vendor Name: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input className='border container-fluid' type="text" value={vendorname} onChange={(e)=>setVendorname(e.target.value)} />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="First Name">Vendor Type: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={vendortype} onChange={(e)=>setVendorType(e.target.value)} className='border container-fluid' type="text" />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Mobile Number: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={contactnumber} onChange={(e)=>setContactNumber(e.target.value)} className='border container-fluid' type="number" />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Email Id: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} className='border container-fluid' type="date" />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Address: <span style={{color:"red"}}>*</span> <br /> <br />
                      <textarea className='border container-fluid' type="text" value={address} onChange={e=>setAddress(e.target.value)}></textarea>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Current Balance: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={currentbalance} onChange={e=>setCurrentbalance(e.target.value)} className='border container-fluid' type="number" />
                    </label>
                  </div>
                  
                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Paid Amount: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={paidamount} onChange={(e)=>setPaidamount(e.target.value)} className='border container-fluid' type="text" />
                    </label>
                  </div>
                  

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Remaining Amount: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={remainingamount} onChange={(e)=>setRemainingamount(e.target.value)} className='border container-fluid' type="text" />
                    </label>
                  </div>
        

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Comments: <span style={{color:"red"}}>*</span> <br /> <br />
                      <textarea className='border container-fluid' type="text" value={comments} onChange={e=>setComments(e.target.value)}></textarea>
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
