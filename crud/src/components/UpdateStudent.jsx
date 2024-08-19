import React,{useState,useRef, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { updateStudents } from '../features/AddStudentSlice'

export const UpdateStudent = ({update}) =>{
    
    const [stu_id,setId] = useState(update?.id) || useState("")
    const [firstname,setFirstname] = useState(update?.firstname) || useState("")
    const [lastname,setLastname] = useState(update?.lastname) || useState("")
    const [mothername,setMotherName] = useState(update?.mothername) || useState("")
    const [fathername,setFathername] = useState(update?.fathername) || useState("")
    const [dateofbirth,setDateOfBirth] = useState(update?.dateofbirth) || useState("")
    const [email,setEmail] = useState(update?.email) || useState("")
    const [address,setAddress] = useState(update?.address) || useState("")
    const [contactnumber,setContactNumber] = useState(update?.contactnumber) || useState("")
    const [alternatenumber,setAlternateNumber] = useState(update?.alternatenumber) || useState("")
    const [gender,setGender] = useState(update?.gender) || useState("")
    const [maritialstate,setMaritialState ] = useState(update?.maritialstate) || useState("")
    const [qualification,setQualification] = useState(update?.qualification) || useState("")
    const [experiance,setExperiance] = useState(update?.experiance) || useState("")
    const [course,setCourse] = useState(update?.course) || useState("")
    const [totalamount,setTotalAmount] = useState(update?.totalamount) || useState("")
    const [remaining,setRemainingAmonut] = useState(update?.remaining) || useState("")
    const [mentor,setMentor] = useState(update?.mentor) || useState("")
    const [dateofjoining,setDateOfJoining] = useState(update?.dateofjoining) || useState("")
    const [studentstatus,setStudentStatus] = useState(update?.studentstatus) || useState("")
    const [image,setImage] = useState(update?.image) || useState("")
    const [remarks,setRemarks] = useState(update?.remarks) || useState("")
    const [imagename,setImagename] = useState(update?.imagename) || useState("")
    const imgchange = useRef()
    const formData = new FormData()
    console.log(update);
    const dispatch = useDispatch()
    // const getStatus = useSelector(state => state)
 
    const handleSubmit = async(e) =>{
       e.preventDefault()
       const data = {stu_id,firstname,lastname,mothername,fathername,dateofbirth,email,address,contactnumber,alternatenumber,gender,maritialstate,qualification,experiance,course,totalamount,remaining,mentor,dateofjoining,studentstatus,image,imagename,remarks}
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
      
    }
    
   const handleImage = (e)=>{
   setImage(e.target.files[0])
   setImagename(e.target.files[0].name)
   }

    

  return (
    <>
     
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
               <button type='submit' className='btn btn-primary'>Submit</button>
               </div>     

            </form>
    </>
  )
}
