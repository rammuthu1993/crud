import React, { useEffect, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers,faTrash,faCircleExclamation, faEye, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getStudentcashin,fetchStudentcashinData,deleteStudentcashin } from '../features/studentCashinSlice'
import { getCustomercashin,fetchCustomercashinData,deleteCustomercashin } from '../features/addCustomercashinSlice'
import { useSelector,useDispatch } from 'react-redux'
import { jsPDF } from "jspdf";
import logoKitkat from "../imgs/kitkat.jpg"
import { useAuth } from '../Protection/auth'

export const CashIn = () => {
  const {uxcard} = useAuth()   
  const data = useSelector(state=> fetchStudentcashinData(state)) || []
  const customer = useSelector(state=> fetchCustomercashinData(state)) || []
  const [student,setStudent] = useState(null)
  const [id,setId] = useState()
  const dispatch = useDispatch()

  console.log(data);
  
  useEffect(()=>{
    dispatch(getStudentcashin())
    dispatch(getCustomercashin())
  },[dispatch])

  const handleDelete = ()=>{
        dispatch(deleteStudentcashin(id))
  }

  const handleCustomerdelete = ()=>{
    dispatch(deleteStudentcashin(id))
}


    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerpage = 5
    const lastIndex = currentPage*recordsPerpage
    const firstIndex = lastIndex-recordsPerpage
    const result = data.slice(firstIndex,lastIndex)
    const npage = Math.ceil(data.length/recordsPerpage)
    const page = [...Array(npage+1).keys()].slice(1)

    const [currentcustomerPage,setCurrentcustomerPage] = useState(1)
    const lastIndextwo = currentcustomerPage*recordsPerpage
    const firstIndextwo = lastIndextwo-recordsPerpage
    const customerResult = customer.slice(firstIndextwo,lastIndextwo)
    const n_page = Math.ceil(customer.length/recordsPerpage)
    const customerpage = [...Array(n_page+1).keys()].slice(1)

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

    const prevcustPage=()=>{
      setCurrentPage(prevState=> prevState-1)
}
const nextcustPage=()=>{
      setCurrentPage(prevState=> prevState+1)
}
const changecustCpage = (v)=>{
  console.log();
  setCurrentcustomerPage(v)
}

const handleStudentpdf = (student) => {
  const { name, paymenttype, paidamount, remainingamount, date, course } = student;

  // Create new jsPDF instance with A5 format
  const doc = new jsPDF({
      format: 'a5',
      orientation: 'portrait',
      unit: 'mm',  // set measurement unit to millimeters
  });

  // Set the desired width for the title columns
  const titleWidth = 25;

  // Set the padding and border color
  const padding = 10;
  const borderColor = '#808080';

  // Add border around the content
  const contentWidth = doc.internal.pageSize.width - 2 * padding;
  const contentHeight = doc.internal.pageSize.height - 2 * padding;
  doc.setDrawColor(borderColor);
  doc.rect(padding, padding, contentWidth, contentHeight);

  // Add logo aligned left with padding
  const logoImg = logoKitkat; // Replace with the path to your logo image
  const logoWidth = 40;
  const logoHeight = 20;
  const logoPadding = 5;
  doc.addImage(logoImg, 'PNG', padding + logoPadding, padding + logoPadding, logoWidth, logoHeight);

  // Add two break spaces
  const breakSpaceHeight = 5; // Adjust as needed
  doc.text('', padding + logoPadding, padding + logoPadding + logoHeight + padding + breakSpaceHeight);

  // Add "Student Receipt" aligned right next to the logo with bold text
  const textRightMargin = doc.internal.pageSize.width - padding - logoPadding;
  const textYPosition = padding + logoPadding + logoHeight / 2;
  doc.setFontSize(12); // Set font size for titles
  doc.setFont('bold'); // Set font to bold
  doc.text('INTERNSHIP ACKNOWLEDGEMENT', textRightMargin, textYPosition, { align: 'right' });

  // Reset font to normal
  doc.setFont('normal');

  // Add titles with specified width below the logo
  const titleYPosition = padding + logoPadding + logoHeight + 2 * padding + breakSpaceHeight;
  doc.setFontSize(12); // Set font size for titles
  doc.text('Student Name:', padding + logoPadding, titleYPosition);
  // doc.text('Course:', padding + logoPadding, titleYPosition + 10);
  doc.text('Duration:', padding + logoPadding, titleYPosition + 20);
  doc.text('Payment Type:', padding + logoPadding, titleYPosition + 30);
  doc.text('Paying Amount:', padding + logoPadding, titleYPosition + 40);
  doc.text('Balance Amount:', padding + logoPadding, titleYPosition + 50);
  doc.text('Receipt Date:', padding + logoPadding, titleYPosition + 60);

  // Add student data with specified width and left-aligned below the titles
  const dataYPosition = padding + logoPadding + logoHeight + 2 * padding + breakSpaceHeight;
  const dataXPosition = padding + logoPadding + titleWidth + 5;
  doc.setFontSize(12); // Set font size for data values
  doc.text(name, dataXPosition, dataYPosition);
  // doc.text(course, dataXPosition, dataYPosition + 10);
  doc.text("6 months", dataXPosition, dataYPosition + 20);
  doc.text(paymenttype, dataXPosition, dataYPosition + 30);
  doc.text(paidamount.toString(), dataXPosition, dataYPosition + 40);
  doc.text(remainingamount.toString(), dataXPosition, dataYPosition + 50);
  doc.text(date, dataXPosition, dataYPosition + 60);

  // Add "NOTE: Amount Cannot Be Refund" below the student data
  const noteYPosition = padding + logoPadding + logoHeight + 1.5 * padding + 80;
  doc.text('NOTE: Amount Cannot Be Refund', padding + logoPadding, noteYPosition);

  // Add HR Signature
  const signatureYPosition = noteYPosition + 2 * padding;
  doc.text('HR Signature', padding + logoPadding, signatureYPosition);

  // Save the PDF
  doc.save(`${name}StudentReceipt.pdf`);
};
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
  <Link to="/home/createcashin" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/> Create</Link>
  </span>

  {student ? <span className='text-primary h3'>Manage Student</span> : <span className='text-primary h3'>Manage Customer</span>}

         <span>
            <label htmlFor="type">
                Student&nbsp;<input name='field' type="radio" value={student} onChange={e=>setStudent(true)}/>
            </label>&nbsp;
            <label htmlFor="type">
                Customer&nbsp;<input name='field' type="radio" value={student} onChange={e=>setStudent(false)}/>
            </label>
         </span>

  </div>

  <div>
      {student ? <div>
           <p className='p-3'>Search</p>

          <table className='table table-borderless table-striped'>
            <thead>
                <tr className='table-secondary'>
                <th>S.No</th>    
                <th>Student Name</th>
                <th>Receipt Type</th>
                <th>Payment Type</th>
                <th>Paying Amount</th>
                <th>Balance Amount</th>
                <th>Receipt Date</th>
                <th>Actions</th>
                </tr>
                </thead>
            <tbody>
                 {result.length > 0 ? result.map((v,i)=>( 
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{v.name}</td>
                        <td>Cash In</td>
                        <td>{v.paymenttype}</td>
                        <td>{v.paidamount}</td>
                        <td>{v.currentbalance}</td>
                        <td>{v.date}</td>
                        <td>

                            <button style={{width:"30px",height:"30px",marginTop:"-20px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-primary' icon={faEye}/></button>&nbsp;

                            <button style={{width:"30px",height:"30px",marginTop:"-20px"}} type='button' className='btn' onClick={()=>handleStudentpdf(v)}><FontAwesomeIcon className='p-2 rounded text-white bg-danger' icon={faFilePdf}/></button>&nbsp;

                            <button data-bs-toggle='modal' data-bs-target='#delete' style={{width:"30px",height:"30px",marginTop:"-20px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-danger' icon={faTrash}  onClick={()=>setId(v._id)}/></button>&nbsp;



                        </td>
                    </tr>
                 ) ): (<tr><td colSpan={9} className='text-center'>No studentcashin data available.</td></tr>) }
                </tbody>
           </table>

           <div className='d-flex justify-content-end'><ul className='pagination'>
           <li className='page-item' onClick={prevPage}><a className='page-link' href="#">Prev</a></li>
            {page.length > 0 ? page.map(v=><li className='page-item'onClick={()=>changeCpage(v)}><a className='page-link' href="#">{v}</a></li>) : (<li className='page-item'><a className='page-link' href="#">No Page</a></li>)}
            <li className='page-item' onClick={nextPage}><a className='page-link' href="#">Next</a></li>
            </ul></div>
           
      </div> : (<div>
           <p className='p-3'>Search</p>

          <table className='table table-borderless table-striped'>
            <thead>
                <tr className='table-secondary'>
                <th>S.No</th>    
                <th>Customer Name</th>
                <th>Receipt Type</th>
                <th>Payment Type</th>
                <th>Paying Amount</th>
                <th>Balance Amount</th>
                <th>Receipt Date</th>
                <th>Actions</th>
                </tr>
                </thead>
            <tbody>
                 {customerResult.length > 0 ? customerResult.map((v,i)=>( 
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{v.name}</td>
                        <td>Cash In</td>
                        <td>{v.paymenttype}</td>
                        <td>{v.paidamount}</td>
                        <td>{v.currentbalance}</td>
                        <td>{v.date}</td>
                        <td>

                            <button data-bs-toggle='modal' data-bs-target='#delete' style={{width:"30px",height:"30px",marginTop:"-20px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-primary' icon={faEye}/></button>&nbsp;

                            <button data-bs-toggle='modal' data-bs-target='#delete' style={{width:"30px",height:"30px",marginTop:"-20px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-danger' icon={faFilePdf}/></button>&nbsp;

                            <button data-bs-toggle='modal' data-bs-target='#delete' style={{width:"30px",height:"30px",marginTop:"-20px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-danger' icon={faTrash}  onClick={()=>setId(v._id)}/></button>&nbsp;



                        </td>
                    </tr>
                 ) ): (<tr><td colSpan={9} className='text-center'>No customercashin data available.</td></tr>) }
                </tbody>
           </table>

           <div className='d-flex justify-content-end'><ul className='pagination'>
           <li className='page-item' onClick={prevcustPage}><a className='page-link' href="#">Prev</a></li>
            {customerpage.length > 0 ? customerpage.map(v=><li className='page-item'onClick={()=>changecustCpage(v)}><a className='page-link' href="#">{v}</a></li>) : (<li className='page-item'><a className='page-link' href="#">No Page</a></li>)}
            <li className='page-item' onClick={nextcustPage}><a className='page-link' href="#">Next</a></li>
            </ul></div>
           
      </div>) }
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
        <button className='btn btn-success' data-bs-dismiss='modal' onClick={handleCustomerdelete}>Yes</button>  &nbsp;
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
