import React, { useRef, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { addInterview } from '../features/interviewSlice'
import { useAuth } from '../Protection/auth'

export const AddInterview = () => {
  const {uxcard} = useAuth()   
    const [intervieweename,setIntervieweename] = useState("")
    const [investicatedDate,setInvesticatedDate] = useState("")
    const [email,setEmail] = useState("")
    const [contactnumber,setContactNumber] = useState("")
    const [yearofpassing,setYearofpassing] = useState("")
    const [qualification,setQualification] = useState("")
    const [updates,setUpdates] = useState("")
    const [location,setLocation] = useState("")
    const [sheduleddate,setSheduleddate] = useState("")
    const [source,setSource] = useState("")
    const [image,setImage] = useState("")
    const [jobrole,setJobrole] = useState("")
    const [imagename,setImagename] = useState("")
    const followup = ["","Interviewed","Not Interviewded","Callback","No Response","Call done"]
    const imgchange = useRef()
    const formData = new FormData()
    
    const dispatch = useDispatch()
    // const getStatus = useSelector(state => state)
 
    const handleSubmit = async(e) =>{
       e.preventDefault()
       const data = {intervieweename,investicatedDate,email,contactnumber,yearofpassing,qualification,updates,location,sheduleddate,source,image,imagename,jobrole}
       console.log(image);
       for(const key in data){
        formData.append(key,data[key])
       }
       console.log(formData);
       const result =await dispatch(addInterview(formData))
       
    }
const handleImage = (e)=>{
   setImage(e.target.files[0])
   setImagename(e.target.files[0].name)
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
                 <Link to="/home/interviewlist" className='text-white text-decoration-none'><FontAwesomeIcon icon={faUsers}/> Interviewlist</Link>
                 </span>

                 <span className='text-primary h3'>Register Student</span>

                 <span></span>

                </div>
{/*---------------------------------------form-----------------------------------------------*/}
                <div className='mt-3 py-3'>
                    <form id='addcommon' encType='multipart/form-data' onSubmit={handleSubmit}>

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
                          <input ref={imgchange} name='image' className='container-fluid' type="file" onChange={handleImage} placeholder='No File Chosen' /></div></label> 
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
