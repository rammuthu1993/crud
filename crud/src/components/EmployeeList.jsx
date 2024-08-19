import React, { useEffect, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers,faPenToSquare,faTrash,faEye,faPlus,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { getEmployee,fetchEmployeeData,deleteEmployee } from '../features/addEmployeeSlice'
import { useSelector,useDispatch } from 'react-redux'
import { UpdateEmployees } from './updateEmployee'
import { useAuth } from '../Protection/auth'


export const EmployeesList = () => {
  const {uxcard} = useAuth()   
    const data= useSelector(state=> fetchEmployeeData(state))
    const [employeeData,setEmployeedata] = useState([])
    const [update,setUpdate] = useState()
    console.log(employeeData);
    const [emp_id,setId] = useState()
      const dispatch = useDispatch() 

    useEffect(()=>{
       setEmployeedata([...data])
    },[data])  
    useEffect(()=>{
      dispatch(getEmployee())
    },[dispatch])

    const handleDelete = ()=>{
          dispatch(deleteEmployee(emp_id))
    }
   
    const handleEmployeesearch = (e)=>{
      const newData = data.filter(v=> (v.firstname+""+v.lastname).toUpperCase().includes((e.target.value).toUpperCase()))
      setEmployeedata([...newData])
      setCurrentPage(1)
   }

   const handleUpdate = (i)=>{
    const edit = data?.filter((v,index)=> index === i)
    console.log(edit);
    setUpdate(...edit)
  }

  const [currentPage,setCurrentPage] = useState(1)
    const recordsPerpage = 5
    const lastIndex = currentPage*recordsPerpage
    const firstIndex = lastIndex-recordsPerpage
    const result = employeeData.slice(firstIndex,lastIndex)
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
          <Link to="/home/addemployee" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/> Add Employee</Link>
          </span>

          <span className='text-primary h3'>Employees List</span>

          <span></span>

          </div>

          <div className='p-3'>
              <div className='border'>
              <div id='addcommon'><input style={{height:"40px"}} className='container-fluid border-0 ps-2 input' type="text" placeholder='Search here' onChange={handleEmployeesearch}/></div>

                   <table className='table table-borderless table-striped'>
                    <thead>
                        <tr className='table-success' style={{height:"70px",lineHeight:"50px"}}>
                        <th>#</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>Actions</th>
                        </tr>
                        </thead>
                    <tbody>
                         {result.length > 0 ? result.map((v,i)=>( 
                            <tr key={i}>
                                <td>{i+1}</td>
                                {/* <td><img src={v.image} alt="student" /></td> */}
                                <td>{v.id}</td>
                                <td>{v.firstname}{v.lastname}</td>
                                <td>{v.email}</td>
                                <td>{v.contactnumber}</td>
                                <td>{v.designation}</td>
                                <td>{v.salary}</td>
                                <td>
                                    <button data-bs-toggle='modal' data-bs-target='#update' style={{width:"30px",height:"30px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-warning' icon={faPenToSquare} onClick={()=>handleUpdate(i)}/></button> &nbsp;

                                    <button style={{width:"30px",height:"30px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-danger' icon={faTrash} data-bs-toggle='modal' data-bs-target='#delete' onClick={()=>setId(v._id)}/></button>&nbsp;

                                    <button style={{width:"30px",height:"30px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-primary' icon={faEye}/></button>&nbsp;&nbsp;

                                </td>
                            </tr>
                         ) ): (<tr><td colSpan={9} className='text-center'>No student data available...</td></tr>) }
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

{/*----------------------------------modal------------------------------------------------------*/}
         
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
      {/*-------------------------------update-------------------------------------------*/}

      <div id='update' className='modal fade'>

          <div className='modal-dialog modal-xl'>

            <div className='modal-content'>

              <div className='modal-body'>

               <UpdateEmployees update={update}/>

              </div>
              <div className='modal-footer'>
                <button className='btn btn-warning' data-bs-dismiss='modal'>Close</button>
            </div>

            </div>

          </div>
         </div>

    </>
  )
}
