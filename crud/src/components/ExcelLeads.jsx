import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus,faTrash,faCircleExclamation,faUpload,faFileImport, faFilter, faPrint } from '@fortawesome/free-solid-svg-icons'
import './excelLeads.css'
import { fetchLeadsData,getLeads } from '../features/addLeadsSlice'
import * as XLSX from "xlsx";
import { utils, read } from "xlsx";
import { useSelector,useDispatch } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css';
// import { FormGroup, Input, } from "reactstrap";
import saveAs from 'file-saver'
import { useReactToPrint } from 'react-to-print';
import { Pdf } from './Pdf'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Protection/auth'

const requiredFields = ["DateCol", "Name", "Qualification", "YearOfPassing", "PhoneNumber", "FollowUpdates", "Source", "Location", "Rescheduled"];

export const ExcelLeads = ({printRef}) => {
    const data = useSelector(state=> fetchLeadsData(state))
    const [excelFile,setExcelfile] = useState(null)
    const [filename,setFileName] = useState()
    const [typeerror,setTypeerror] = useState(null)
    const [excelrows,setExcelRows] = useState(null)
    const [excelData,setExcelData] = useState("")
    const [click,setClick] = useState(null)
    
    const dispatch = useDispatch()
    
    const navigate = useNavigate()


    const openFile = (e)=>{
        e.preventDefault()
        if(!excelFile){ 
            document.getElementById("input").click()
            }
    }

    
    /* const fileUpload = ()=>{
        console.log(excelFile);
        
       if(!excelFile){ 
       document.getElementById("input").click()
       }
       else if(excelFile!==null){
        try{
        const firstItemkeys = Object.keys(excelFile[0]) || []
        const missingLeads = requiredFields.filter(filter=> !filter.includes(firstItemkeys))
        if(missingLeads.length > 0){
            alert("Required Fields are Misssing", missingLeads.join(","))
            setExcelfile(null)
        }    
        const workbook = XLSX.read(excelFile,{type:"buffer"})
        const worksheetname = workbook.SheetNames[0]
        console.log(worksheetname);
        const worksheet = workbook.Sheets[worksheetname]
        const data = XLSX.utils.sheet_to_json(worksheet)
        setExcelData(data.slice(0,10)) 
        }
        catch(err){
             alert("error")
             console.log(err);
             }
        
     }
    } */

    const handleFile=(e)=>{
      /*  let fileTypes  = ["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"] */
      if(e.target.files){
       let selectedFile = e.target.files[0]
       console.log(selectedFile);
       
       setExcelfile(selectedFile)
       setFileName(selectedFile.name)
       const reader = new FileReader()
             reader.onload = ()=>{
                const data = e.target.result
                console.log(data);
                const workbook = read(data,{type:"array"})
                console.log(workbook);
                const sheetName = workbook.sheetNames[0]
                console.log(sheetName);
                const worksheet = workbook.SheetNames[sheetName]
                console.log(worksheet);
                const json = utils.sheet_to_json(worksheet)
                console.log(json);
                setExcelRows(json)
                }
                reader.readAsArrayBuffer(selectedFile)
    }

    }



    const fileUpload = async()=>{
        try{
        const firstItemkeys = Object.keys(excelrows[0] || {})
        const missingFileds = requiredFields.filter(field=> !firstItemkeys.includes(field))        
        if(missingFileds.length > 0){
            alert("Required Fields are missing"+missingFileds.join(", "))
        }
        const leadResponse = await axios.get("http://localhost:3007/excelData/");
        const leadList = leadResponse.data || [];
        const leads = excelrows.map(obj => {
            const dateCol = obj["DateCol"] ? new Date((obj["DateCol"] - (25567 + 1)) * 86400 * 1000).toISOString().split('T')[0] : '';
            const rescheduled = obj["Rescheduled"] ? new Date((obj["Rescheduled"] - (25567 + 1)) * 86400 * 1000).toISOString().split('T')[0] : '';

            return {
                _id: leadList.find(x => x.Name === obj["name"])?._id,
                DateCol: dateCol,
                Name: obj["name"] || "",
                Qualification: obj["qualification"] || "",
                YearOfPassing: obj["yearofpassing"] || "",
                PhoneNumber: obj["phoneNumber"] || "",
                FollowUpdates: (obj["updates"] || "").split('.').map(update => update.trim()).filter(update => update !== ""),
                Source: obj["source"] || "",
                Location: obj["location"] || "",
                FollowupPerson: obj["detailssent"] || "",
                Course: obj["course"] || "",
                DetailsSent: obj["detailssent"] || "",
                Rescheduled: rescheduled,
            };
        });
        console.log(leads);
        
        const updatedLeads = leads.filter(x => x._id);
        const newLeads = leads.filter(x => !x._id);
        if (updatedLeads.length > 0) {
            await axios.post("http://localhost:3007/excelData/upadte_excelFiles", updatedLeads);
            alert("Successfully updated " + updatedLeads.length + " leads");
        }
        if (newLeads.length > 0) {
            await axios.post("http://localhost:3007/excelData/insert_excelFiles", newLeads);
            alert("Successfully inserted " + newLeads.length + " new leads");
        }
    }
        catch (error) {
            console.error("Error uploading data:", error);
        }
        
    }

     const exportToexcel = ()=>{
       const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook,worksheet,"sheet1")
        const excelBuffer = XLSX.write(workbook,{ bookType: 'xlsx', type: 'array' })
        const blob = new Blob([excelBuffer],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
        saveAs(blob, "exportedData.xlsx"); 
    } 

    const handlePrint = useReactToPrint({
      content:()=> printRef.current
    }) 
  return (
    <>
    <div className='d-flex justify-content-between px-1'>
    <div className='h4 text-primary col-md-2'>
                 Manage Leads
         </div>
    <div className='col-md-9'>
     <form className='form-group custom-form d-flex justify-content-evenly col-md-12 text-primary h3'>
            <span>
            <button className='rounded-1 btn btn-primary' onClick={()=>navigate("/home/addLeads")}>
                Add Leads&nbsp;<FontAwesomeIcon icon={faUserPlus} />
            </button>
            </span>
            <span>
            <input id='input' className='inputupload' type='file' name='file'  size='chars' onChange={handleFile}/>
            <button onClick={openFile} disabled className='rounded-1 btn btn-primary'>Bulk Data&nbsp;<FontAwesomeIcon icon={faUpload} />
            </button>        
            {excelFile && <button onClick={fileUpload}>upload</button>}

        
            </span>
            <span>
            <button className='rounded-1 btn btn-primary'>
                Sample&nbsp;<FontAwesomeIcon icon={faFileImport} />
            </button>
            </span>
            <span>
            <button className='rounded-1 btn btn-primary'>
                Filter&nbsp;<FontAwesomeIcon icon={faFilter} />
            </button>
            </span>
            <span>
            <button onClick={exportToexcel} className='rounded-1 btn btn-primary'>
                Excel&nbsp;<FontAwesomeIcon icon={faFileImport} />
            </button>
            </span>
            <span>
            <button className='rounded-1 btn btn-primary' onClick={handlePrint}>
                Print&nbsp;<FontAwesomeIcon icon={faPrint} />
            </button>
            </span>
         </form>
         </div>
         </div>

        <div>
         {typeerror && <div className='alert alert-danger' role='alert'>
                {typeerror}
            </div>}
        </div>    
        
      <div id='excelfile' className='border px-1'>
          {excelData ? (
            <div className='table-responsive printdata'>
             <table className='table'>
                 <thead>
                    <tr>{Object.keys(excelData[0])?.map((key)=> (<th key={key}>{key}</th>))}</tr>
                 </thead>
                 <tbody>
                    {excelData.map((data,index)=>
                      (<tr key={index}>{Object.keys(data).map(key=>(<td>{data[key]}</td>))}</tr>)
                    )}
                 </tbody>
             </table>
          </div>):(<div>No files Uploaded yet! </div>)}
      </div> 
      <div>

      </div>
      <div>
     </div>
    </>
  )
}
