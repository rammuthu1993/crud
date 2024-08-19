import React, { useEffect, useState } from 'react'
import { SideNavbar} from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers,faPenToSquare,faTrash,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { addInterview,getInterview,fetchInterviewData,deleteInterview, updateInterview } from '../features/interviewSlice'
import { useSelector,useDispatch } from 'react-redux'
import { useAuth } from '../Protection/auth'


export const ManageInterview = () => {
  const {uxcard} = useAuth()   
    const studentData = useSelector(state=> fetchInterviewData(state))
    const [stu_id,setId] = useState()
    const [update,setUpdate] = useState([])
    const dispatch = useDispatch()

    const handleUpdate = (id)=>{
        const newdata = studentData.filter(data=> data._id === id)
        setUpdate(newdata)
    }
    
    const [int_id,setInt_id] = useState()
    const [intervieweename,setIntervieweename] =  useState()
    const [investicatedDate,setInvesticatedDate] =  useState()
    const [email,setEmail] = useState()
    const [contactnumber,setContactNumber] =  useState()
    const [yearofpassing,setYearofpassing] = useState()
    const [qualification,setQualification] =  useState()
    const [updates,setUpdates] =  useState()
    const [location,setLocation] = useState()
    const [sheduleddate,setSheduleddate] = useState()
    const [source,setSource] = useState()
    const [image,setImage] = useState()
    const [jobrole,setJobrole] =  useState()
    const [imagename,setImagename] = useState()
    const formData = new FormData()
    const followup = ["","Interviewed","Not Interviewded","Callback","No Response","Call done"]
   console.log(update);

     useEffect(()=>{

        setInt_id(update[0]?._id);setIntervieweename(update[0]?.intervieweename);setInvesticatedDate(update[0]?.investicatedDate);setEmail(update[0]?.email);setContactNumber(update[0]?.contactnumber);
        setYearofpassing(update[0]?.yearofpassing);setQualification(update[0]?.qualification);setLocation(update[0]?.location);setSheduleddate(update[0]?.sheduleddate);setSource(update[0]?.source);setJobrole(update[0]?.jobrole);
    },[update])

    useEffect(()=>{
      dispatch(getInterview())
    },[dispatch])

    const handleDelete = ()=>{
          dispatch(deleteInterview(stu_id))
    }
    
    const handleImage = (e)=>{
        setImage(e.target.files[0])
        setImagename(e.target.files[0].name)
     }
       
     const handleSubmitupdate = async(e) =>{
        e.preventDefault()
        const data = {int_id,intervieweename,investicatedDate,email,contactnumber,yearofpassing,qualification,updates,location,sheduleddate,source,image,imagename,jobrole}
        console.log(image);
        for(const key in data){
         formData.append(key,data[key])
        }
        console.log(formData);
        const result =await dispatch(updateInterview(formData))
        
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
          <Link to="/home/addinterview" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/> Shedule </Link>
          </span>

          <span className='text-primary h3'>Manage Interview</span>

          <span></span>

          </div>

          <div className='p-3'>
              <div className='border'>
                   <p className='p-3'>Search</p>

                   <table className='table table-borderless table-striped'>
                    <thead>
                        <tr className='table-success' style={{height:"70px",lineHeight:"50px"}}>
                        <th>#</th>
                        <th>Created</th>
                        <th>Name</th>
                        <th>Qualif</th>
                        <th>YOP</th>
                        <th>Mobile</th>
                        <th>Location</th>
                        <th>Job Role</th>
                        <th>Fol Ups</th>
                        <th>Scheduled On</th>
                        <th>Source</th>
                        <th>Actions</th>
                        </tr>
                        </thead>
                    <tbody>
                         {studentData.length > 0 ? studentData.map((v,i)=>( 
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{v.investicateddate}</td>
                                <td>{v.intervieweename}</td>
                                <td>{v.qualification}</td>
                                <td>{v.yearofpassing}</td>
                                <td>{v.contactnumber}</td>
                                <td>{v.location}</td>
                                <td>{v.jobrole}</td>
                                <td>{v.updates}</td>
                                <td>{v.sheduleddate}</td>
                                <td>{v.source}</td>
                                <td>
                                    <button style={{width:"30px",height:"30px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-warning' icon={faPenToSquare} onClick={()=>handleUpdate(v._id)} data-bs-toggle='modal' data-bs-target='#update'/></button> &nbsp;

                                    <button style={{width:"30px",height:"30px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-danger' icon={faTrash} data-bs-toggle='modal' data-bs-target='#delete' onClick={()=>setId(v._id)}/></button>&nbsp;
                                </td>
                            </tr>
                         ) ): (<tr><td colSpan={12} className='text-center'>No Shedule assigned.</td></tr>) }
                        </tbody>
                   </table>
                   
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
 {/*-------------------------------update-----------------------------------------*/}
         <div id='update' className='modal fade'>
            <div className='modal-dialog modal-xl'> 
               <div className='modal-content'>
                <div className='modal-header'>
                    <h1 className='modal-title'>Update Interview</h1>
                    <button className='btn btn-close btn-warning' data-bs-dismiss='modal'></button>
                </div>
                <div className='modal-body'>
                  {<form id='addcommon' encType='multipart/form-data' onSubmit={handleSubmitupdate}>

              <div className='d-flex flex-wrap'>

              <div className='col-md-6 py-4'>
              <label className='container-fluid' htmlFor="">Investicated Date: <span style={{color:"red"}}>*</span> <br /> <br />
              <input value={investicatedDate} onChange={(e)=>setInvesticatedDate(e.target.value)} className='border container-fluid' type="date" />
            </label>
           </div>

   
   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Interviewee Name: <span style={{color:"red"}}>*</span> <br /> <br />
         <input value={intervieweename} onChange={(e)=>setIntervieweename(e.target.value)} className='border container-fluid' type="text" />
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Email-Id: <span style={{color:"red"}}>*</span> <br /> <br />
         <input value={email} onChange={(e)=>setEmail(e.target.value)} className='border container-fluid' type="email" />
     </label>
   </div>

   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Mobile Number: <span style={{color:"red"}}>*</span> <br /> <br />
     <input value={contactnumber} onChange={(e)=>setContactNumber(e.target.value)} className='border container-fluid' type="number" />
     </label>
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Qualification: <span style={{color:"red"}}>*</span> <br /> <br />
   <select value={qualification} onChange={(e)=>setQualification(e.target.value)} className='border container-fluid' name="qualification" id="qualification" >
     <option value=""></option>
     <option value="UG">UG</option>
     <option value="PG">PG</option>
   </select></label> 
   </div>

   
   <div className='col-md-6 py-4'>
     <label className='container-fluid' htmlFor="">Year of Passing: <span style={{color:"red"}}>*</span> <br /> <br />
         <input value={yearofpassing} onChange={(e)=>setYearofpassing(e.target.value)} className='border container-fluid' type="number" />
     </label>
   </div>  

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Location: <span style={{color:"red"}}>*</span> <br /> <br />
   <input value={location} onChange={(e)=>setLocation(e.target.value)} className='border container-fluid' type="text" /></label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Follow Updates: <span style={{color:"red"}}>*</span><br /> <br />
    <select value={updates} onChange={e=>setUpdates(e.target.value)} className='border container-fluid' name="upadtes" id="updates">
      {followup.map((v,i)=>(<option value={v} key={i}>{v}</option>))}
    </select>
    </label>
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Sheduled Date: <span style={{color:"red"}}>*</span> <br /> <br />
   <input value={sheduleddate} onChange={(e)=>setSheduleddate(e.target.value)} className='border container-fluid' type="date" /></label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="lastname">Jobrole: <span style={{color:"red"}}>*</span> <br /> <br />
   <textarea  value={jobrole} onChange={(e)=>setJobrole(e.target.value)} className='border container-fluid' name="jobrole" id="jobrole"></textarea></label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="">Source: <span style={{color:"red"}}>*</span> <br /> <br />
   <input  value={source} onChange={(e)=>setSource(e.target.value)} className='border container-fluid' name="status" id="status"/>
   </label> 
   </div>

   <div className='col-md-6 py-4'>
   <label className='container-fluid' htmlFor="image">Student Image: <span style={{color:"red"}}>*</span> <br/> <br />
   <div className='border p-1'>
   <input name='image' className='container-fluid' type="file" onChange={handleImage} placeholder='No File Chosen' /></div></label> 
   </div>

</div>
<div className='d-flex justify-content-center'>
<button type='submit' className='btn btn-primary' data-bs-dismiss="modal">Submit</button>
</div>     

</form>}
                </div>
               </div>
            </div>
         </div>

      </div>
    </>
  )
}
