import React, { useRef, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileInvoice} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addCustomer,getCustomer } from '../features/CustomerSlice'
import { useAuth } from '../Protection/auth'

export const AddCustomer = () => {
    const {uxcard,invoiceno,setInvoiceNo} = useAuth()   
    const [clientname,setClientname] = useState("")
    const [address,setAddress] = useState("")
    const [contactnumber,setContactNumber] = useState("")
    const [date,setDate] = useState("")
    const [state,setState] = useState("")
    const [gstin,setGst] = useState("")
    let states = [
        "Select State",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry"
    ]
    
    
    const dispatch = useDispatch()
    // const getStatus = useSelector(state => state)
 
    const handleSubmit = async(e) =>{
       e.preventDefault()
       const data = {clientname,address,contactnumber,date,state,invoice,gstin}

       const result =await dispatch(addCustomer(data))
       
       console.log(result);
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
         <Link to="/home/gstbill" className='text-white text-decoration-none'><FontAwesomeIcon icon={faFileInvoice}/> GST Invoice</Link>
         </span>

         <span className='text-primary h3'>Register Customer</span>

         <span></span>

        </div>
{/*---------------------------------------form-----------------------------------------------*/}
        <div className='mt-3 py-3'>
            <form id='addcommon' onSubmit={handleSubmit}>

               <div className='d-flex flex-wrap'>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="id">Client Name: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input className='border container-fluid' type="text" value={clientname} onChange={(e)=>setClientname(e.target.value)} />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="First Name">Address: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={address} onChange={(e)=>setAddress(e.target.value)} className='border container-fluid' type="text" />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Contact Number: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={contactnumber} onChange={(e)=>setContactNumber(e.target.value)} className='border container-fluid' type="number" />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Date: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={date} onChange={(e)=>setDate(e.target.value)} className='border container-fluid' type="date" />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">State: <span style={{color:"red"}}>*</span> <br /> <br />
                       <select className='border container-fluid' name="state" id="state" onChange={e=> setState(e.target.value)}>
                          {states.map((v,i)=> (<option key={i}>{v}</option>))}
                       </select>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Invoice No: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={invoiceno} className='border container-fluid' type="text" />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">GST In: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={gstin} onChange={(e)=>setGst(e.target.value)} className='border container-fluid' type="text" />
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
