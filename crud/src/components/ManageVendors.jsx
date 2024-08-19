import React, { useEffect, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus,faTrash,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getVendor,fetchVendorData, deleteVendor } from '../features/addVendorSlice'
import { useSelector,useDispatch } from 'react-redux'
import { useAuth } from '../Protection/auth'

export const ManageVendor = () => {
  const {uxcard} = useAuth()   
  const data = useSelector(state=> fetchVendorData(state))
  const [vendordata,setVendordata] = useState([])
  const [id,setId] = useState()
  const dispatch = useDispatch()

  useEffect(()=>{
      setVendordata([...data])
  },[data])

  useEffect(()=>{
    dispatch(getVendor())
  },[dispatch])

  const handleDelete = ()=>{
        dispatch(deleteVendor(id))
  }

  const handleVendorsearch = (e)=>{
    const newData = data.filter(v=> (v.vendorname).toUpperCase().includes((e.target.value).toUpperCase()))
    setVendordata([...newData])
    setCurrentPage(1)
 }


    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerpage = 5
    const lastIndex = currentPage*recordsPerpage
    const firstIndex = lastIndex-recordsPerpage
    const result = vendordata.slice(firstIndex,lastIndex)
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
  <Link to="/home/addvendor" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUserPlus}/> Create</Link>
  </span>

  <span className='text-primary h3'>Manage Vendors</span>

  <span></span>

  </div>

  <div>
      <div>
      <div id='addcommon'><input style={{height:"40px"}} className='container-fluid border-0 ps-2 input' type="text" placeholder='Search here' onChange={handleVendorsearch}/></div>

           <table className='table table-borderless table-striped'>
            <thead>
                <tr className='table-secondary'>
                <th>S.No</th>    
                <th>Vendor Name</th>
                <th>Vendor Type</th>
                <th>Mobile Number</th>
                <th>Email ID</th>
                <th>Current Balance</th>
                <th>Action</th>
                </tr>
                </thead>
            <tbody>
                 {result.length > 0 ? result.map((v,i)=>( 
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{v.vendorname}</td>
                        <td>{v.vendortype}</td>
                        <td>{v.contactnumber}</td>
                        <td>{v.email}</td>
                        <td>{v.currentbalance}</td>
                        <td>

                            <button data-bs-toggle='modal' data-bs-target='#delete' style={{width:"30px",height:"30px",marginTop:"-20px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-danger' icon={faTrash}  onClick={()=>setId(v._id)}/></button>&nbsp;

                        </td>
                    </tr>
                 ) ): (<tr><td colSpan={8} className='text-center'>No Vendor data available...</td></tr>) }
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
