import React, { useEffect, useRef, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers,faTrash,faCircleExclamation, faDatabase, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useReactToPrint } from 'react-to-print';
import { fetchCustomerData,getCustomer,deleteCustomer } from '../features/CustomerSlice'
import { useSelector,useDispatch } from 'react-redux'
import kitkatimg from "../imgs/kitkat.jpg"
import { useAuth } from '../Protection/auth'
import converter from 'number-to-words'

export const Gst = () => {
  const {uxcard} = useAuth()   
  const data = useSelector(state=> fetchCustomerData(state)) || []
  const dispatch = useDispatch()
  const [subtotal,setSubtotal] = useState()
  const [total,setTotal] = useState("")
  const [igst,setIgst] = useState("0.00.INR")
  const [cgst,setCgst] = useState("0.00.INR")
  const [sgst,setSgst] = useState("0.00.INR")
  const [state,setState] = useState("")
  const [gstcontent,setGstcontent] = useState([{
    desc:"",qty:"",unitprice:"",price:0.00+"INR."
  }])
  const printRef = useRef()
  const numtowords = converter.toWords(Number(total)).toUpperCase()

  console.log(gstcontent);
  const currentDate = new Date()
  const options = {year:"numeric",month:"2-digit",day:"2-digit"}
  const formattedDate = currentDate.toLocaleDateString("en-GB",options)
  const newRow =  {desc:"",qty:"",unitprice:"",price:"0.00"}
                                           
  const handleAddrow = ()=>{
        setGstcontent([...gstcontent,newRow])
  }

  useEffect(()=>{
    dispatch(getCustomer())
  },[dispatch])

  const handleDelete = ()=>{
        dispatch(deleteCustomer(id))
  }

  const handleDeleterow = (index)=>{
    const deleteRow = gstcontent.filter((v,i)=> i !== index)
    setGstcontent([...deleteRow])
  }

  const handleStatechange = (e)=>{
    const getState = data.filter((v,i)=> v.clientname === e.target.value)
    setState(getState[0]?.state)
    console.log(getState);
    
  }

  const handleChange = (e,i)=>{
     console.log(i);
        const {value} = e.target
        const newdata = [...gstcontent] || []
        newdata[i][e.target.name] = value
        newdata[i].price = newdata[i].qty*newdata[i].unitprice
        let total = 0;
        newdata.map((v,i)=> {total += v.price} )
        const igstcalc = ((total)/100)*18
        const cgstcalc = ((total)/100)*9
        const sgstcalc = ((total)/100)*9
        setCgst(cgstcalc)
        setSgst(sgstcalc)
        setSubtotal(total)
        setTotal(total+igstcalc)
        setGstcontent(newdata)
        setIgst(igstcalc)  
      
    }

  console.log(gstcontent);

  const handlePrint = useReactToPrint({
    content:()=> printRef.current
  }) 
  
  
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
    
   <div ref={printRef} className='container-fluid'>
     <div className='row py-2'>
       <div className='col-md-6'>

          <h2 className='text-success'><span className='h1'>I</span>NVOIVCE</h2> 
          <div>
            <h3 className='text-success'>KITKAT SOFTWARE TECHNOLOGIES</h3>
            <div className='h6 p-1 gstbg'>
             <span>No: 70/77 , 1st Floor, Krishna complex, <br /> PN Palayam
             Coimbatore-641037</span> <br />
             Phone No : 7010816299 , 04224957272.
            </div>
                                  <br />
             <div className='h6 p-1 gstbg'>
                <span>INVOICE TO</span> <br />
                <select onChange={handleStatechange} style={{width:"50%",height:"20px",fontSize:"14px"}} name="state" id="state">
                    <option value="">Select a Client</option>
                    {data?.map((v,i)=> (<option value={v.clientname} key={i}>{v.clientname}</option>)

                    )}
                </select> <br />
                <p>{state}</p>
                <span>GSTIN/UIN</span>
            </div>   



          </div>
       </div> 

       <div className='col-md-6'>

        <div className='float-end'>
          <img style={{width:"250px"}} className='img-fluid' src={kitkatimg} alt="kitkat" /> <br /> <br />

          <table className='p-1'>
            <tr><th className='bg-success text-white'>Date</th><td style={{backgroundColor:"rgba(196, 195, 195, 0.951)"}}>{formattedDate}</td></tr>
            <tr><th className='bg-success text-white'>INVOICE NO <br /> GSTIN</th><td style={{backgroundColor:"rgba(196, 195, 195, 0.951)"}}>33BIQPA2943B1ZQ
            </td></tr>
          </table>
          </div>

       </div>

       <div>
        <table className='container-fluid table-bordered border-dark text-center'>
        <thead>
            <tr style={{height:"50px"}} className='bg-success text-white border border-dark'><th>S.NO</th>
            <th>DESCRIPTION</th>
            <th>QTY</th>
            <th>UNIT PRICE(INR)</th>
            <th>PRICE(INR)</th>
            <th>ACTION</th>
            </tr>
         </thead> 
         <tbody id='tab_row'>
          {gstcontent.map((v,i)=>(<tr key={i}>
            <td className='text-center'>{i+1}</td>

            <td className='text-center'><input className='text-center' name="desc" type="text" value={v.desc} onChange={e=> handleChange(e,i)}/></td>

            <td className='text-center'><input className='text-center' name="qty" type="number" value={v.qty} onChange = {e=>handleChange(e,i)}/></td>

            <td className='text-center'><input className='text-center' name="unitprice" type="number" value={v.unitprice} onChange={e=>handleChange(e,i)}/></td>

            <td className='text-center'><input className='text-center' name="price" value={v.price} type="number" onChange={e=>handleChange(e,i)} readOnly/></td>

            <td className='text-center'>{ gstcontent.length-1 === i ? <FontAwesomeIcon onClick={handleAddrow} icon={faPlusCircle}/> : <FontAwesomeIcon onClick={()=>handleDeleterow(i)} icon={faTrash}/>}</td>
          </tr>))}
        </tbody>
        <tfoot id='tab_foot'>
          <tr>
          <th></th><th></th><th></th><th className='text-center'>Sub Total</th><td style={{color:"red"}} className='text-center'><input className='text-center' type="number"  style={{color:"red"}} value={subtotal}/></td></tr>
          {state === "Tamil Nadu" && <tr>
            <th></th><th></th><th></th><th className='text-center'>CGST 9%</th><td style={{color:"red"}} className='text-center'><input className='text-center' value={cgst} type="number" /></td></tr>}

            {state === "Tamil Nadu" && <tr>
              <th></th><th></th><th></th><th className='text-center'>SGST 9%</th><td style={{color:"red"}} className='text-center'><input className='text-center' value={sgst} type="number" /></td></tr>}

            { state === "" && 
            <tr>
              <th></th><th></th><th></th><th className='text-center'>IGST</th><td style={{color:"red"}} className='text-center'><input className='text-center' value={igst} type="number" /></td></tr>
            }
            <tr>
            <th></th><th></th><th></th><th className='text-center' >TOTAL</th><td style={{color:"red"}} className='text-center'>
            <input value={total} className='text-center' type="number" style={{color:"red"}}/></td></tr>
          </tfoot>   
        </table>
       </div>
     <div><p><strong>Total (In Words) :</strong>{numtowords ? numtowords : "ZERO"}</p></div>
    <div className='container-fluid'>
      <div className='row'>
      <div className='col-md-6'>
        <h2>Bank Account Details</h2>
        <table>
          <tr><th>Name</th><td>:</td><td>Kitkat Software Technologies</td></tr>
          <tr><th>Bank</th><td>:</td><td>Federal Bank</td></tr>
          <tr><th>Account No</th><td>:</td><td>19829200003697</td></tr>
          <tr><th>IFSC Code</th><td>:</td><td>FDRL0001982</td></tr>
          <tr><th>Branch</th><td>:</td><td>FDRL0001982</td></tr>
        </table>
      </div>
      <div className='col-md-6'>
        <span className='float-end'>
          <button className='btn btn-success text-white'>Save</button>&nbsp;&nbsp;
          <button className='btn btn-warning text-white' onClick={handlePrint}>Print</button>
        </span>
      </div>
      </div>
      <h2 className='text-center text-success'>THANK YOU FOR YOU BUSINESS!</h2>
    </div>

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
