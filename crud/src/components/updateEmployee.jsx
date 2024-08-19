import React, { useRef, useState,useEffect } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import { useDispatch,useSelector } from 'react-redux'
import { updateEmployee,fetchEmployeeData,getEmployee } from '../features/addEmployeeSlice'

export const UpdateEmployees = ({update}) => {
    console.log(update);   
    const [emp_id,setId] = useState()
    const [firstname,setFirstname] = useState()
    const [lastname,setLastname] = useState()
    const [mothername,setMotherName] = useState()
    const [fathername,setFathername] = useState()
    const [dateofbirth,setDateOfBirth] = useState()
    const [email,setEmail] = useState()
    const [address,setAddress] = useState()
    const [contactnumber,setContactNumber] = useState()
    const [alternatenumber,setAlternateNumber] = useState()
    const [gender,setGender] = useState()
    const [maritialstate,setMaritialState ] = useState()
    const [qualification,setQualification] = useState()
    const [experiance,setExperiance] = useState()
    const [designation,setDesignation] = useState()
    const [salary,setSalary] = useState()
    const [annualsalary,setAnnualSalary] = useState()
    const [isStaff,setIsstaff] = useState()
    const [dateofjoining,setDateOfJoining] = useState()
    const [relieving,setRelieving] = useState()
    const [aadharnumber,setAadharNumber] = useState()
    const [pan,setPan] = useState()
    const [accountnumber,setAccountNumber] = useState()
    const [employeetype,setEmployeeType] = useState()
    const [image,setImage] = useState()
    const [remarks,setRemarks] = useState()
    const [imagename,setImagename] = useState()
    const imgchange = useRef()
    const formData = new FormData()

    useEffect(()=>{
      setId(update?.id);setFirstname(update?.firstname);setLastname(update?.lastname);setMotherName(update?.mothername);setFathername(update?.fathername);
     setDateOfBirth(update?.dateofbirth);setEmail(update?.email);setAddress(update?.address);setContactNumber(update?.contactnumber);setAlternateNumber(update?.alternatenumber);setGender(update?.gender);setMaritialState(update?.maritialstate);setQualification(update?.qualification);setExperiance(update?.experiance);setDesignation(update?.designation);setSalary(update?.salary);setAnnualSalary(update?.annualsalary);setIsstaff(update?.isstaff);setDateOfJoining(update?.dateofjoining);
     setRelieving(update?.releiving);setAadharNumber(update?.aadharnumber);setPan(update?.pan);setAccountNumber(update?.accountnumber);setEmployeeType(update?.employeetype);
     setImage(update?.image);setRemarks(update?.remarks)
    },[update]) 
    
    const dispatch = useDispatch()
    // const getStatus = useSelector(state => state)
 
    const handleSubmit = async(e) =>{
       e.preventDefault()
       const data = {id:emp_id,firstname,lastname,mothername,fathername,dateofbirth,email,address,contactnumber,alternatenumber,gender,maritialstate,qualification,experiance,designation,salary,annualsalary,isStaff,dateofjoining,relieving,aadharnumber,pan,accountnumber,employeetype,image,imagename,remarks}
       console.log(image);
       for(const key in data){
        formData.append(key,data[key])
       }
       console.log(formData);
       const result =await dispatch(updateEmployee(formData))
       
       console.log(result);
      /*  setId("");setFirstname("");setLastname("");setMotherName("");setFathername("");
       setDateOfBirth("");setEmail("");setAddress("");setContactNumber("");setAlternateNumber("");setGender("");setMaritialState("");setQualification("");setExperiance("");setDesignation("");setSalary("");setAnnualSalary("");setIsstaff("");setDateOfJoining("");
       setRelieving("");setAadharNumber("");setPan("");setAccountNumber("");setEmployeeType("");
       setImage("");setRemarks("") */
       dispatch(getEmployee())
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
                    <label className='container-fluid' htmlFor="id">Employee Id: <span style={{color:"red"}}>*</span> <br /> <br />
                        <input className='border container-fluid' type="text" value={emp_id} onChange={(e)=>setId(e.target.value)} />
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
                  <label className='container-fluid' htmlFor="">Designation: <span style={{color:"red"}}>*</span> <br /> <br />
                  <input  value={designation} onChange={(e)=>setDesignation(e.target.value)} className='border container-fluid' name="course" id="course"/>
                    </label> 
                  </div>

                  <div className='col-md-6 py-4'>
                  <label className='container-fluid' htmlFor="">Salary: <span style={{color:"red"}}>*</span> <br /> <br />
                  <input value={salary} onChange={(e)=>setSalary(e.target.value)} className='border container-fluid' type="text" /></label> 
                  </div>
                        
                  <div className='col-md-6 py-4'>
                  <label className='container-fluid' htmlFor="">Annual Salary:<span style={{color:"red"}}>*</span> <br /> <br />
                  <input value={annualsalary} onChange={(e)=>setAnnualSalary(e.target.value)} className='border container-fluid' type="text" /></label> 
                  </div>

                  <div className='col-md-6 py-4'>
                  <label className='container-fluid' htmlFor="">Date of Joining: <span style={{color:"red"}}>*</span> <br /> <br />
                  <input value={dateofjoining} onChange={(e)=>setDateOfJoining(e.target.value)} className='border container-fluid' type="date" /></label> 
                  </div>

                  <div className='col-md-6 py-4'>
                  <label className='container-fluid' htmlFor="">Date of Relieving: <span style={{color:"red"}}>*</span> <br /> <br />
                  <input value={relieving} onChange={(e)=>setRelieving(e.target.value)} className='border container-fluid' type="date" /></label> 
                  </div>

                  <div className='col-md-6 py-4'>
                    <label className='container-fluid' htmlFor="">Is Staff:<span style={{color:"red"}}>*</span><br /> <br />
                    <label htmlFor=""><input value='yes' onChange={(e)=>setIsstaff(e.target.value)} type="radio" name='isstaff'/>Yes</label>&nbsp;&nbsp;
                    <label htmlFor=""><input value='no' onChange={(e)=>setIsstaff(e.target.value)} type="radio" name='isstaff'/>No</label>&nbsp;&nbsp;
                    </label>
                  </div>

                  <div className='col-md-6 py-4'>
                  <label className='container-fluid' htmlFor="image">Student Image: <span style={{color:"red"}}>*</span> <br/> <br />
                  <div className='border p-1'>
                  <input ref={imgchange} name='image' className='container-fluid' type="file" onChange={handleImage} placeholder='No File Chosen' /></div></label> 
                  </div>

                  <div className='col-md-6 py-4'>
                  <label className='container-fluid' htmlFor="">Aadhar Number:<span style={{color:"red"}}>*</span> <br /> <br />
                  <input value={aadharnumber} onChange={(e)=>setAadharNumber(e.target.value)} className='border container-fluid' type="Number" /></label> 
                  </div>

                  <div className='col-md-6 py-4'>
                  <label className='container-fluid' htmlFor="">Pan Number:<span style={{color:"red"}}>*</span> <br /> <br />
                  <input value={pan} onChange={(e)=>setPan(e.target.value)} className='border container-fluid' type="text" /></label> 
                  </div>

                  <div className='col-md-6 py-4'>
                  <label className='container-fluid' htmlFor="">Account Number:<span style={{color:"red"}}>*</span> <br /> <br />
                  <input value={accountnumber} onChange={(e)=>setAccountNumber(e.target.value)} className='border container-fluid' type="text" /></label> 
                  </div>

                  <div className='col-md-6 py-4'>
                  <label className='container-fluid' htmlFor="">Employee Type: <span style={{color:"red"}}>*</span> <br /> <br />
                  <select value={employeetype} onChange={(e)=>setEmployeeType(e.target.value)} className='border container-fluid' name="qualification" id="qualification" >
                    <option value="UG">Current Employee</option>
                    <option value="PG">Old Employee</option>
                  </select></label> 
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
    
    </>
  )
}
