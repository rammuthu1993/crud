import React from 'react'
import kitkatimg from '../imgs/kitkat.jpg'

export const Pdf = ({filterStudentData}) => {
    const value = filterStudentData[0] || []
  return (
    <>
    <div className='col-md-12 p-2 border'>
        <div>
            <div className='container-fluid d-flex justify-content-between align-items-center'>
            <div style={{width:"250px",height:"70px"}}><img className='img-fluid' src={kitkatimg} alt="" /></div> <span>INTERNSHIP ACKNOWLEDGEMENT</span></div>
            <br /> <br /> <br />
           <table className='table-borderless'>
                <tr><th>Student Name:</th><td>{value?.firstname+" "+value?.lastname}</td></tr>
                <tr><th>Course:</th><td>{value?.course}</td></tr>
                <tr><th>Duration:</th><td>6 Months</td></tr>
                <tr><th>PaymentType:</th><td>{value?.paymenttype}</td></tr>
                <tr><th>Paying Amount:</th><td>{value?.paidamount}</td></tr>
                <tr><th>Balance Amount:</th><td>{value?.currentbalance}</td></tr>
                <tr><th>Receipt Date:</th><td>{value?.date}</td></tr>
                <tr><th>Note:</th><td>Amount cannot be refund.</td></tr>
            </table>  
           <br /> <br /> <br />
           <span>HR Signature.</span>
        </div>
    </div>
    </>
  )
}
