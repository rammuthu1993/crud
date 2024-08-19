import React, { useEffect, useRef, useState } from 'react'
import { SideNavbar } from './SideNavbar'
import { HeaderNav } from './HeaderNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus,faTrash,faCircleExclamation,faUpload,faFileImport, faFilter, faPrint } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getLeads,fetchLeadsData,deleteLeads } from '../features/addLeadsSlice'
import { useSelector,useDispatch } from 'react-redux'
import { ExcelLeads } from './ExcelLeads'
import { useAuth } from '../Protection/auth'
import ReactDatePicker from 'react-datepicker';
import {Tooltip} from '@mui/material'

export const ManageLeads = () => {
  const {uxcard} = useAuth()   
  const data = useSelector(state=> fetchLeadsData(state)) || []
  const [leadsdata,setLeadsdata] = useState([])
  const [id,setId] = useState()
  const [leads,setLeads] = useState()
  const [startDate,setStartDate] = useState("")
  const [endDate,setEndDate] = useState("")
  const [filteredLeads,setFilteredLeads] = useState("")
  const dispatch = useDispatch()
  const printRef = useRef()

   useEffect(()=>{
       setLeads([...data])
  },[data]) 

  useEffect(()=>{
    dispatch(getLeads())
  },[dispatch])

  const handleLeadssearch = (e)=>{
    const newData = data.filter(v=> (v.name).toUpperCase().includes((e.target.value).toUpperCase()))
    setLeads([...newData])
    setCurrentPage(1)
 }

  const handleDelete = ()=>{
    console.log(id);
    
        dispatch(deleteLeads(id))
  }

  function applyFilters(leads, startDate, endDate) {
    let filteredLeads = leads;
      console.log(startDate);
      
      
    // Filter by date range
    if (startDate && endDate) {
       /*  data.sort(function(a,b){
        if(a.date > startDate && b.date < endDate) return 1
        if(a.date < startDate && b.date > endDate) return -1
        }) */
            const result = data.filter(lead => {
            const leadDate = new Date(lead.date);
            console.log(lead.date);
            return leadDate >= startDate && leadDate <= endDate;
      /*       console.log(result);
            setLeads([leadDate >= startDate && leadDate <= endDate])  */
        });
        console.log(leads);
        setLeads([...result])
        
    }
    // console.log(applyFilters());
    
    // Filter by search term
/*         if (searchTerm) {
        const searchValue = searchTerm.toLowerCase();
        filteredLeads = filteredLeads.filter(lead =>
            Object.values(lead).some(value => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(searchValue);
                } else if (Array.isArray(value) && value.length > 0 && typeof value[value.length - 1] === 'string') {
                    return value[value.length - 1].toLowerCase().includes(searchValue);
                }
                return false;
            })
        );
    } */
}

const handleShortcutClick = (shortcut) => {
    const today = new Date();
    let start, end;
    switch (shortcut) {
        case 'today':
            start = new Date(today);
            end = new Date(today);
            break;
        case 'thisWeek':
            start = new Date(today.setDate(today.getDate() - today.getDay()));
            end = new Date(today.setDate(today.getDate() + 6));
            break;
        case 'lastWeek':
            start = new Date(today.setDate(today.getDate() - today.getDay() - 7));
            end = new Date(today.setDate(today.getDate() - today.getDay() + 6));
            break;
        case 'thisMonth':
            start = new Date(today.getFullYear(), today.getMonth(), 1);
            end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            break;
        case 'lastMonth':
            start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            end = new Date(today.getFullYear(), today.getMonth(), 0);
            break;
        case 'thisYear':
            start = new Date(today.getFullYear(), 0, 1);
            end = new Date(today.getFullYear(), 11, 31);
            break;
        case 'lastYear':
            start = new Date(today.getFullYear() - 1, 0, 1);
            end = new Date(today.getFullYear() - 1, 11, 31);
            break;
        default:
            start = null;
            end = null;
    }
    setStartDate(start);
    setEndDate(end);
    const filteredLeads = applyFilters(leads, startDate, endDate);
    setFilteredLeads(filteredLeads);
    setCurrentPage(1);
    console.log(new Date(today.setDate(today.getDate() + today.getDay())));
    // console.log(new Date());
    
    
};

function handleClearFilters() {
    setStartDate(null);
    setEndDate(null);

    const filteredLeads = applyFilters(leads, null, null, '');
    setFilteredLeads(filteredLeads);
    setCurrentPage(1);
}

    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerpage = 5
    const lastIndex = currentPage*recordsPerpage
    const firstIndex = lastIndex-recordsPerpage
    const result = Array.isArray(leads) ? leads.slice(firstIndex,lastIndex) : []
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
    
  <div className=' border border-top-0 border-start-0 border-end-0 py-2'>
 
 <div >
         <ExcelLeads printRef={printRef}/>
  </div>
  </div>

  { <div className='date-range_column'>
                        <div className="column-segment d-flex justify-content-between p-2">
                            <div className='calendar-inputs col-md-3'>
                                <div className="individual-date-set">
                                    <label htmlFor="fromDate">From:</label>
                                    <ReactDatePicker
                                        id="fromDate"
                                        onChange={date => setStartDate(date)}
                                        selected={startDate}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        className="custom-datepicker"
                                        placeholderText="Pick Start Date"
                                    />
                                </div>
                                <div className="individual-date-set">
                                    <label htmlFor="toDate">To:</label>
                                    <ReactDatePicker
                                        id="toDate"
                                        onChange={date => setEndDate(date)}
                                        selected={endDate}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        className="custom-datepicker"
                                        placeholderText="Pick End Date"
                                    />
                                </div>
                            </div>

                            <div className="short-tags col-md-7 line">
                                <Tooltip className='btn btn-primary' title="Double Tap">
                                    <button onClick={() => handleShortcutClick('today')}>Today</button>
                                </Tooltip>
                                <Tooltip className='btn btn-primary' title="Double Tap">
                                    <button onClick={() => handleShortcutClick('thisWeek')}>This Week</button>
                                </Tooltip>
                                <Tooltip className='btn btn-primary' title="Double Tap">
                                    <button onClick={() => handleShortcutClick('lastWeek')}>Last Week</button>
                                </Tooltip>
                                <Tooltip className='btn btn-primary' title="Double Tap">
                                    <button onClick={() => handleShortcutClick('thisMonth')}>This Month</button>
                                </Tooltip>
                                <Tooltip className='btn btn-primary' title="Double Tap">
                                    <button onClick={() => handleShortcutClick('lastMonth')}>Last Month</button>
                                </Tooltip>
                                <Tooltip className='btn btn-primary' title="Double Tap">
                                    <button onClick={() => handleShortcutClick('thisYear')}>This Year</button>
                                </Tooltip>
                                <Tooltip className='btn btn-primary' title="Double Tap">
                                    <button onClick={() => handleShortcutClick('lastYear')}>Last Year</button>
                                </Tooltip>
                                <button onClick={handleClearFilters}>Clear</button>
                            </div>
                        </div>
                    </div>
                
}

  <div>
      <div>

      <div id='addcommon'><input style={{height:"40px"}} className='container-fluid border-0 ps-2 input' type="text" placeholder='Search here' onChange={handleLeadssearch}/></div>

           <table ref={printRef} className='table table-borderless table-striped'>
            <thead>
                <tr className='table-secondary'>
                <th>#</th>    
                <th>Created</th>
                <th>Name</th>
                <th>Qaulif</th>
                <th>YOP</th>
                <th>Mobile</th>
                <th>Location</th>
                <th>Course</th>
                <th>FolUps</th>
                <th>Sent</th>
                <th>Reshed</th>
                <th>Assignee</th>
                <th>Source</th>
                <th>Actions</th>
                </tr>
                </thead>
            <tbody>
                 {result.length > 0 ? result.map((v,i)=>( 
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{new Date(v.date).toLocaleDateString("en-GB")}</td>
                        <td>{v.name}</td>
                        <td>{v.qualification}</td>
                        <td>{v.yop}</td>
                        <td>{v.phonenumber}</td>
                        <td>{v.location}</td>
                        <td>{v.course}</td>
                        <td>{v.updates}</td>
                        <td>{v.detailssent}</td>
                        <td>{v.resheduled}</td>
                        <td>{v.assignedto}</td>
                        <td>{v.source}</td>
                        <td>

                            <button data-bs-toggle='modal' data-bs-target='#delete' style={{width:"30px",height:"30px",marginTop:"-20px"}} type='button' className='btn'><FontAwesomeIcon className='p-2 rounded text-white bg-danger' icon={faTrash}  onClick={()=>setId(v._id)}/></button>&nbsp;

                        </td>
                    </tr>
                 ) ): (<tr><td colSpan={14} className='text-center'>No Leads data available.Add Leads.</td></tr>) }
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
