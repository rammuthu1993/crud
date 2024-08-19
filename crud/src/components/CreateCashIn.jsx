import React, { useEffect, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getStudents,fetchStudentData } from '../features/AddStudentSlice'
import { getCustomer,fetchCustomerData } from '../features/CustomerSlice'
import { addStudentcashin } from '../features/studentCashinSlice'
import { addCustomercashin } from '../features/addCustomercashinSlice'
import Banks from '../Bank.json'
import { useAuth } from '../Protection/auth'

export const CreateCashIn = () => {
  const {uxcard} = useAuth()   
    const [index,setIndex] = useState("")
    const [bank,setBank] = useState("")
    const [stu_name,setStu_name] = useState("")
    const [cust_name,setCust_name] = useState("")
    const [currentbalance,setCurrentbalance] = useState("")
    const [paidamount,setPaidamount] = useState("")
    const [remainingamount,setRemainingamount] = useState("0.00")
    const [paymenttype,setPaymenttype] = useState("")
    const [comments,setComments] = useState("")
    const [student,setStudent] = useState(null)
    const payType = ["Select Bank Payment","NEFT","IMPS","RTGS","CHEQUE"]
    const [bankPaymenttype,setBankpaymenttype] = useState("")
    const navigate = useNavigate()

    const student_data = useSelector(state=> fetchStudentData(state))
    const customer_data = useSelector(state=> fetchCustomerData(state))
    
    const dispatch = useDispatch()

     console.log(student_data);
     
    useEffect(()=>{
       const balanceAmount = student_data.filter((v,i)=> v.firstname+" "+v.lastname === stu_name)
       setCurrentbalance(balanceAmount[0]?.remaining || [])
       console.log(balanceAmount);
    },[stu_name])

    useEffect(()=>{
      const balanceAmount = student_data.filter((v,i)=> v.firstname+" "+v.lastname === cust_name)
      setCurrentbalance(balanceAmount[0]?.remaining || [])
      console.log(balanceAmount);
   },[cust_name])


    useEffect(()=>{
      setRemainingamount(currentbalance - paidamount)
    },[paidamount])
    

    useEffect(()=>{
       dispatch(getStudents())  
       dispatch(getCustomer())
    },[dispatch])
    
    const handleSubmit = async(e) =>{
       e.preventDefault()
       const data = {name:stu_name,currentbalance,paidamount,remainingamount,paymenttype,bank,bankPaymenttype,comments,date:new Date().toDateString()}
       const result =await dispatch(addStudentcashin(data))
       console.log(result);
       navigate("/home/cashin")
    }

    const handleCustomersubmit = async(e) =>{
      e.preventDefault()
      const data = {cust_name,currentbalance,paidamount,remainingamount,paymenttype,bank,bankPaymenttype,comments,date:new Date().toDateString()}
      const result =await dispatch(addCustomercashin(data))
      console.log(result);
      navigate("/home/cashin")
   }

   const handleSetbalance =(i)=>{
      console.log(i);
      setIndex(i)
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
         <Link to="/home/cashin" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/> CashIn</Link>
         </span>

         {student ? <span className='text-primary h3'>Create Student Cash In</span> : <span className='text-primary h3'>Create Customer Cash In</span>}

         <span>
            <label htmlFor="type">
                Student&nbsp;<input name='field' type="radio" value={student} onChange={e=>setStudent(true)}/>
            </label>&nbsp;
            <label htmlFor="type">
                Customer&nbsp;<input name='field' type="radio" value={student} onChange={e=>setStudent(false)}/>
            </label>
         </span>

        </div>
{/*---------------------------------------form-----------------------------------------------*/}
        {student ? (<div className='mt-3 py-3'>
            <form id='addcommon' onSubmit={handleSubmit}>

               <div className='d-flex flex-wrap'>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="id">Student Name: <span style={{color:"red"}}>*</span> <br /> <br />
                        <select value={stu_name} onChange={e=>setStu_name(e.target.value)} className='border container-fluid' name="name" id="name">
                            <option value=""></option>
                            {student_data.length > 0 ? student_data.map((student_data,i)=>(<option key={i} value={student_data.firstname+" "+student_data.lastname}>{student_data.firstname+" "+student_data.lastname}</option>)):(<option>No Options</option>)}
                        </select>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="First Name">Current Balance: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={currentbalance} onChange={(e)=>setCurrentbalance(e.target.value)} className='border container-fluid' type="text" />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Paid Amount: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={paidamount} onChange={(e)=>setPaidamount(e.target.value)} className='border container-fluid' maxLength={`${currentbalance.length}`}/>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Remaining Amount: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={remainingamount} onChange={(e)=>setRemainingamount(e.target.value)} className='border container-fluid' type="number" />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Payment Type: <span style={{color:"red"}}>*</span> <br /> <br />
                    <label htmlFor="">Cash&nbsp;
                      <input value='Cash' onChange={e=>setPaymenttype(e.target.value)} name='payment' type="radio" className='border container-fluid'/>
                      </label>
                      <label>Bank&nbsp;
                      <input value='Bank' onChange={e=>setPaymenttype(e.target.value)} name='payment' type="radio" className='border container-fluid'/>
                      </label>
                      <label>Online Pay&nbsp;
                      <input value='Online Pay' onChange={e=>setPaymenttype(e.target.value)} name='payment' type="radio" className='border container-fluid'/>
                      </label>
                    </label>
                  </div>
                                    
                  {paymenttype === "Bank" &&
                   <div className='col-md-6'>
                  <label className='container-fluid'>Bank Payment:
                  <select className='border container-fluid' name='bank' value={bank} onChange={e=>setBank(e.target.value)}>
                      <option value="">Select Bank Payment</option>
                      {Banks.map((v,i)=>(
                        <option key={i}>{v}</option>
                      ))}
                    </select> </label></div>}

                    {paymenttype === "Bank" &&
                   <div className='col-md-6'>
                  <label className='container-fluid'>Bank Payment:
                  <select className='border container-fluid' name='bank' value={bankPaymenttype} onChange={e=>setBankpaymenttype(e.target.value)}>
                      <option value="">Select Bank Payment</option>
                      {payType.map((v,i)=>(
                        <option key={i}>{v}</option>
                      ))}
                    </select> </label></div>}

                  {bankPaymenttype === "CHEQUE" && paymenttype === "Bank" && 
                  <div className='col-md-6'>
                  <label className='container-fluid'> Cheque No:
                  <input className='border container-fluid' type='number' placeholder='Enter cheque Number'/>
                  </label>
                  </div>
                  }  
                    

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Comments: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={comments} onChange={e=>setComments(e.target.value)} className='border container-fluid' type="text" />
                    </label>
                  </div>
                  
                  </div>
               <div className='d-flex justify-content-center'>
               <button type='submit' className='btn btn-primary'>Submit</button>
               </div>     
    
            </form>
        </div> ) : ( <div className='mt-3 py-3'>
            <form id='addcommon' onSubmit={handleCustomersubmit}>

               <div className='d-flex flex-wrap'>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="id">Customer Name: <span style={{color:"red"}}>*</span> <br /> <br />
                        <select value={cust_name} onChange={e=>setCust_name(e.target.value)} className='border container-fluid' name="name" id="name">
                            {customer_data.length > 0 ? customer_data.map((v,i)=>(<option key={i} value={v.clientname}>{v.clientname}</option>)):(<option>No Options</option>)}
                        </select>
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="First Name">Current Balance: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={currentbalance} onChange={(e)=>setCurrentbalance(e.target.value)} className='border container-fluid' type="text" />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Paid Amount: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={paidamount} onChange={(e)=>setPaidamount(e.target.value)} className='border container-fluid' type="number" />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Remaining Amount: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={remainingamount} onChange={(e)=>setRemainingamount(e.target.value)} className='border container-fluid' type="number" />
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Payment Type: <span style={{color:"red"}}>*</span> <br /> <br />
                    <label htmlFor="">Cash&nbsp;
                      <input value='Cash' onChange={e=>setPaymenttype(e.target.value)} name='payment' type="radio" className='border container-fluid'/>
                      </label>
                      <label>Bank&nbsp;
                      <input value='Bank' onChange={e=>setPaymenttype(e.target.value)} name='payment' type="radio" className='border container-fluid'/>
                      </label>
                      <label>Online Pay&nbsp;
                      <input value='Online Pay' onChange={e=>setPaymenttype(e.target.value)} name='payment' type="radio" className='border container-fluid'/>
                      </label>
                    </label>
                  </div>

                  {paymenttype === "Bank" &&
                   <div className='col-md-6'>
                  <label className='container-fluid'>Bank Payment:
                  <select className='border container-fluid' name='bank' value={bank} onChange={e=>setBank(e.target.value)}>
                      <option value="">Select Bank Payment</option>
                      {Banks.map((v,i)=>(
                        <option key={i}>{v}</option>
                      ))}
                    </select> </label></div>}

                    {paymenttype === "Bank" &&
                   <div className='col-md-6'>
                  <label className='container-fluid'>Bank Payment:
                  <select className='border container-fluid' name='bank' value={bankPaymenttype} onChange={e=>setBankpaymenttype(e.target.value)}>
                      <option value="">Select Bank Payment</option>
                      {payType.map((v,i)=>(
                        <option key={i}>{v}</option>
                      ))}
                    </select> </label></div>}

                  {bankPaymenttype === "CHEQUE" && paymenttype === "Bank" && 
                  <div className='col-md-6'>
                  <label className='container-fluid'> Cheque No:
                  <input className='border container-fluid' type='number' placeholder='Enter cheque Number'/>
                  </label>
                  </div>
                  }  

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Comments: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input value={comments} onChange={e=>setComments(e.target.value)} className='border container-fluid' type="text" />
                    </label>
                  </div>
                  
                  </div>
               <div className='d-flex justify-content-center'>
               <button type='submit' className='btn btn-primary'>Submit</button>
               </div>     
            
            </form>
        </div>)}
        

    </div>

    </div>

</div>

</div>
    
    </>
  )
}
