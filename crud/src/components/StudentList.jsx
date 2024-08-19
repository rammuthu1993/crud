import React, { useEffect, useState,useRef } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers,faPenToSquare,faTrash,faEye,faPlus,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { getStudents,fetchStudentData,deleteStudents } from '../features/AddStudentSlice'
import { useSelector,useDispatch } from 'react-redux'
import { updateStudents } from '../features/AddStudentSlice'
import { useAuth } from '../Protection/auth'
// import imagekit from "http://localhost:3007/uploads/1723135153093IMG_20180403_142637.jpg"


export const StudentList = () => {
  const {uxcard} = useAuth()   
    const fetchData = useSelector(state=> fetchStudentData(state))
    const status = useSelector(state=> state.addStudent)
    const [studentData,setStudentData] = useState([])
    const [update,setUpdate] = useState()
    const [stu_id,setId] = useState("")
    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] =  useState("")
    const [mothername,setMotherName] = useState("")
    const [fathername,setFathername] = useState("")
    const [dateofbirth,setDateOfBirth] =  useState("")
    const [email,setEmail] = useState("")
    const [address,setAddress] = useState("")
    const [contactnumber,setContactNumber] = useState("")
    const [alternatenumber,setAlternateNumber] = useState("")
    const [gender,setGender] = useState("")
    const [maritialstate,setMaritialState ] = useState("")
    const [qualification,setQualification] = useState("")
    const [experiance,setExperiance] = useState("")
    const [course,setCourse] = useState("")
    const [totalamount,setTotalAmount] = useState("")
    const [remaining,setRemainingAmonut] = useState("")
    const [mentor,setMentor] = useState("")
    const [dateofjoining,setDateOfJoining] = useState("")
    const [studentstatus,setStudentStatus] = useState("")
    const [image,setImage] = useState("")
    const [remarks,setRemarks] = useState("")
    const [imagename,setImagename] = useState("")
    const imgchange = useRef()
    const formData = new FormData()
    const dispatch = useDispatch()
    

    useEffect(()=>{
      setId(update?.id);setFirstname(update?.firstname);setLastname(update?.lastname);setMotherName(update?.mothername);setFathername(update?.fathername);
      setDateOfBirth(update?.dateofbirth);setEmail(update?.email);setAddress(update?.address);setContactNumber(update?.contactnumber);setAlternateNumber(update?.alternatenumber);setGender(update?.gender);setMaritialState(update?.maritialstate);setQualification(update?.qualification);setExperiance(update?.experiance);setCourse(update?.course);setTotalAmount(update?.totalamount);setRemainingAmonut(update?.remaining);setMentor(update?.mentor);setDateOfJoining(update?.dateofjoining);
      setStudentStatus(update?.studentstatus);setRemarks(update?.remarks);
    },[update])
    // const getStatus = useSelector(state => state)
 
    const handleSubmit = async(e) =>{
       e.preventDefault()
       const data = {id:stu_id,firstname,lastname,mothername,fathername,dateofbirth,email,address,contactnumber,alternatenumber,gender,maritialstate,qualification,experiance,course,totalamount,remaining,mentor,dateofjoining,studentstatus,image,imagename,remarks}
       console.log(image);
       for(const key in data){
        formData.append(key,data[key])
       }
       console.log(formData);
       const result =await dispatch(updateStudents(formData))
       
       console.log(result);
       setId("");setFirstname("");setLastname("");setMotherName("");setFathername("");
       setDateOfBirth("");setEmail("");setAddress("");setContactNumber("");setAlternateNumber("");setGender("");setMaritialState("");setQualification("");setExperiance("");setCourse("");setTotalAmount("");setRemainingAmonut("");setMentor("");setDateOfJoining("");
       setStudentStatus("");setRemarks("");
       dispatch(getStudents())
    }
    
   const handleImage = (e)=>{
   setImage(e.target.files[0])
   setImagename(e.target.files[0].name)
   }

    useEffect(()=>{
      setStudentData([...fetchData])
    },[fetchData])
  
      const navigate = useNavigate()

    useEffect(()=>{
      dispatch(getStudents())
    },[dispatch])

   const handleStudentsearch = (e)=>{
           const newData = fetchData.filter(v=> (v.firstname+""+v.lastname).toUpperCase().includes((e.target.value).toUpperCase())) 
           console.log(newData);
           
           setStudentData([...newData])
   }

    const handleDelete = ()=>{
          dispatch(deleteStudents(stu_id))
    }
    const displayDays = (stringdate)=>{
     const startDate = new Date(stringdate)
     const currentDate = new Date
     const differenceInTime = currentDate.getTime()-startDate.getTime()
     const days = Math.floor(differenceInTime/(1000*3600*24))
     return days
    }

    const handleUpdate = (i)=>{
      const edit = fetchData?.filter((v,index)=> index === i)
      console.log(edit);
      setUpdate(...edit)
    }

    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerpage = 5
    const lastIndex = currentPage*recordsPerpage
    const firstIndex = lastIndex-recordsPerpage
    const result = studentData.slice(firstIndex,lastIndex)
    const npage = Math.ceil(fetchData.length/recordsPerpage)
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

  if(status.loading){
    return (
      <div class="text-primary position-absolute top-50 start-50 translate-middle">
        Loading...
</div>
    )
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
          <Link to="/home/addstudents" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/> Add Student</Link>
          </span>

          <span className='text-primary h3'>Students List</span>

          <span></span>

          </div>

          <div className='p-3'>
              <div className='border'>
                   <div id='addcommon'><input style={{height:"40px"}} className='container-fluid border-0 ps-2 input' type="text" placeholder='Search here' onChange={handleStudentsearch}/></div>

                   <table className='table table-borderless table-striped'>
                    <thead>
                        <tr className='table-success' style={{height:"70px",lineHeight:"50px"}}>
                        <th>#</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Mentor</th>
                        <th>DOJ</th>
                        <th>Days</th>
                        <th>Due</th>
                        <th>Actions</th>
                        </tr>
                        </thead>
                    <tbody>
                         {result.length > 0 ? result.map((v,i)=>( 
                            <tr key={i}>
                                <td>{i+1}</td>
                                {/* <td><a href={v.image} target='_blank' rel='noopener noreferrer'><img src={v.image} alt="student" /></a></td> */}
                                <td>{v.id}</td>
                                <td>{v.firstname}{v.lastname}</td>
                                <td>{v.email}</td>
                                <td>{v.contactnumber}</td>
                                <td>{v.mentor}</td>
                                <td>{v.dateofjoining}</td>
                                <td>{displayDays(v.dateofjoining)}</td>
                                <td>{v.remaining}</td>
                                <td>
                                    <button data-bs-toggle='modal' data-bs-target='#update' style={{width:"30px",height:"30px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-warning' icon={faPenToSquare} onClick={()=>handleUpdate(i)}/></button> &nbsp;

                                    <button style={{width:"30px",height:"30px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-danger' icon={faTrash} data-bs-toggle='modal' data-bs-target='#delete' onClick={()=>setId(v._id)}/></button>&nbsp;

                                    <button style={{width:"30px",height:"30px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-primary' icon={faEye}/></button>&nbsp;&nbsp;

                                    <button style={{width:"30px",height:"30px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded  text-white bg-success' icon={faPlus}/></button>&nbsp;
                                </td>
                            </tr>
                         ) ): (<tr><td colSpan={10} className='text-center'>No student data available...</td></tr>) }
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
 {/*-----------------------------update----------------------------------------------*/}
       
 <div id="update" className='modal fade'>
          <div className='modal-dialog modal-xl'>
            <div className='modal-content'>
              <div className='modal-body'>
                
<form id='addstudent' encType='multipart/form-data' onSubmit={handleSubmit}>

<div className='d-flex flex-wrap'>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="id">Student Id: <span style={{color:"red"}}>*</span> <br /> <br />
         <input className='border container-fluid' type="text" value={stu_id} onChange={(e)=>setId(e.target.value)} />
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="First Name">First Name: <span style={{color:"red"}}>*</span> <br /> <br />
         <input value={firstname} onChange={(e)=>setFirstname(e.target.value)} className='border container-fluid' type="text" />
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Last Name: <span style={{color:"red"}}>*</span> <br /> <br />
         <input value={lastname} onChange={(e)=>setLastname(e.target.value)} className='border container-fluid' type="text" />
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Mother Name: <span style={{color:"red"}}>*</span> <br /> <br />
         <input value={mothername} onChange={(e)=>setMotherName(e.target.value)} className='border container-fluid' type="text" />
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Father Name: <span style={{color:"red"}}>*</span> <br /> <br />
         <input value={fathername} onChange={(e)=>setFathername(e.target.value)} className='border container-fluid' type="text" />
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Date Of Birth: <span style={{color:"red"}}>*</span> <br /> <br />
         <input value={dateofbirth} onChange={(e)=>setDateOfBirth(e.target.value)} className='border container-fluid' type="date" />
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Email-Id: <span style={{color:"red"}}>*</span> <br /> <br />
         <input value={email} onChange={(e)=>setEmail(e.target.value)} className='border container-fluid' type="email" />
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Address: <span style={{color:"red"}}>*</span> <br /> <br />
         <textarea value={address} onChange={(e)=>setAddress(e.target.value)} className='border container-fluid' name="address" id="address" ></textarea>
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Contact Number: <span style={{color:"red"}}>*</span> <br /> <br />
     <input value={contactnumber} onChange={(e)=>setContactNumber(e.target.value)} className='border container-fluid' type="number" />
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Alternate Number: <span style={{color:"red"}}>*</span> <br /> <br />
     <input value={alternatenumber} onChange={(e)=>setAlternateNumber(e.target.value)} className='border container-fluid' type="number" />
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Gender: <span style={{color:"red"}}>*</span><br /> <br />
     <label htmlFor=""><input value={gender} onChange={(e)=>setGender(e.target.value)} type="radio" name='gender'/>Male</label>&nbsp;&nbsp;
     <label htmlFor=""><input value={gender} onChange={(e)=>setGender(e.target.value)} type="radio" name='gender'/>FeMale</label>&nbsp;&nbsp;
     <label htmlFor=""><input value={gender} onChange={(e)=>setGender(e.target.value)} type="radio" name='gender'/>Transgender</label>
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Maritial State: <span style={{color:"red"}}>*</span> <br /> <br />
     <label htmlFor=""><input value={maritialstate} onChange={(e)=>setMaritialState(e.target.value)} type="radio"  name='isMarry'/>Single</label>&nbsp;&nbsp;
     <label htmlFor=""><input value={maritialstate} onChange={(e)=>setMaritialState(e.target.value)} type="radio" name='isMarry'/>Married</label>
     </label>
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Qualification: <span style={{color:"red"}}>*</span> <br /> <br />
   <select value={qualification} onChange={(e)=>setQualification(e.target.value)} className='border container-fluid' name="qualification" id="qualification" >
     <option value="UG">UG</option>
     <option value="PG">PG</option>
   </select></label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Work Experiance: <span style={{color:"red"}}>*</span><br /> <br />
   <input value={experiance} onChange={(e)=>setExperiance(e.target.value)} className='border container-fluid' type="text" /></label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Course: <span style={{color:"red"}}>*</span> <br /> <br />
   <select  value={course} onChange={(e)=>setCourse(e.target.value)} className='border container-fluid' name="course" id="course">
     <option value="Python"></option>
     <option value="MERN STACK">MERN STACK</option>
   </select></label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Total Amount: <span style={{color:"red"}}>*</span> <br /> <br />
   <input value={totalamount} onChange={(e)=>setTotalAmount(e.target.value)} className='border container-fluid' type="text" /></label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Remaining Amount:<span style={{color:"red"}}>*</span> <br /> <br />
   <input value={remaining} onChange={(e)=>setRemainingAmonut(e.target.value)} className='border container-fluid' type="text" /></label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Mentor: <span style={{color:"red"}}>*</span> <br /> <br />
   <input value={mentor} onChange={(e)=>setMentor(e.target.value)} className='border container-fluid' type="text" /></label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Date of Joining: <span style={{color:"red"}}>*</span> <br /> <br />
   <input value={dateofjoining} onChange={(e)=>setDateOfJoining(e.target.value)} className='border container-fluid' type="date" /></label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Student Status: <span style={{color:"red"}}>*</span> <br /> <br />
   <select  value={studentstatus} onChange={(e)=>setStudentStatus(e.target.value)} className='border container-fluid' name="status" id="status">
     <option value="work">work</option>
     <option value="office">work</option>
   </select></label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="image">Student Image: <span style={{color:"red"}}>*</span> <br/> <br />
   <div className='border p-1'>
   <input ref={imgchange} name='image' className='container-fluid' type="file" onChange={handleImage} placeholder='No File Chosen' /></div></label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="lastname">Remarks: <span style={{color:"red"}}>*</span> <br /> <br />
   <textarea  value={remarks} onChange={(e)=>setRemarks(e.target.value)} className='border container-fluid' name="remarks" id="remarks"></textarea></label> 
   </div>

</div>

<div className='d-flex justify-content-center'>
<button data-bs-dismiss='modal' type='submit' className='btn btn-primary'>Submit</button>
</div>     

</form>

              <div className='modal-footer'>
                <button className='btn btn-warning' data-bs-dismiss='modal'>Close</button>
            </div>
            </div>

          </div>
         </div>

      </div>
   {/*----------------------------custoemr update------------------------------------*/}
    
    </>
  )
}
