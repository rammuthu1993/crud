import React,{useState,useRef} from 'react'
import kitkatimg from '../imgs/kitkat.jpg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser,faUserPlus,faAngleDown,faCalendarDays,faSquarePlus,faList, faReceipt, faSuitcase, faCalendar, faDigitalTachograph, faMoneyBill, faBagShopping, faFileInvoice, faNoteSticky, faSignOut} from '@fortawesome/free-solid-svg-icons'
import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../Protection/auth'

export const SideNavbar = () => {
    const change = useRef()  
    const {uxcard,setUxcard} = useAuth() 
    const [screen,setScreen] = useState(true)
    const navigate = useNavigate()
    console.log(uxcard);

    const handleLogout = ()=>{
      localStorage.clear("token")
      window.location.reload()
    }
    
  return (
    <>  
        <nav className={uxcard ? "border" :'border'}>
        <div className='container-fluid'>

        <ul id='sidenav' className={uxcard ? 'navbar-nav text-primary lh-lg' : 'navbar-nav'}>

          <li className='nav-item border-bottom border-2 text-decoration-none'>
            <img className='w-100' style={{height:"100px"}} src={kitkatimg} alt="" /></li>

          <li className='nav-item d-flex align-items-center border-bottom border-2  py-1'><div className="admin bg-primary text-white text-center h1">A</div>&nbsp;&nbsp;{uxcard && <span className='h6'>Admin</span>}</li>
            
          <li title='Student Info' className='list p-2 border-bottom border-2 ' data-bs-toggle='collapse' data-bs-target='#menuone'><Link className='text-decoration-none'><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none ' }>Student Info</span><FontAwesomeIcon icon={faAngleDown} className='float-end' /></Link></li>

          <ul id='menuone' className='list-unstyled collapse'>
          <li title='Add User' className={uxcard ? "p-2 border-bottom border-2" : 'text-center p-2 border-2'}>
            <Link to="/home/addstudents" className='container-fluid  text-decoration-none'>
            <FontAwesomeIcon icon={faUserPlus} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Add Students</span></Link></li>

          <li title='Add Employee' className={uxcard ? "p-2 border-bottom border-2 " : 'text-center p-2 border-2'} >
          <Link to='/home/addemployee' className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faUserPlus} />&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={uxcard ? 'h6' :'d-none text-center' }>Add Employee</span></Link></li>
            
          <li title='view students' className={uxcard ? "p-2 border-bottom border-2 " : 'text-center p-2 border-2'} >
          <Link to='/home/studentlist' className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={uxcard ? 'h6' :'d-none text-center' }>View Students</span></Link>
          </li>

          <li title='view employees' className={uxcard ? "p-2 border-bottom border-2 " : 'text-center p-2 border-2'} >
          <Link to='/home/employeeslist' className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={uxcard ? 'h6' :'d-none text-center' }>View Employee</span></Link>
          </li>
          </ul>

          <li title='Attendance' className='list text-primary border-bottom p-2' data-bs-toggle="collapse" data-bs-target="#menutwo"><Link className='text-decoration-none'><FontAwesomeIcon icon={faCalendarDays} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Attendance</span><FontAwesomeIcon icon={faAngleDown} className='float-end' /></Link></li>

          <ul id='menutwo' className='collapse list-unstyled'>
            <li className='h6 border-bottom border-2 p-2'><Link to="/home/addattendance" className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faSquarePlus} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Add Attendance</span></Link></li>

            <li className='h6 border-bottom border-2 p-2'><Link to='/home/viewattendance' className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>View Attendance</span></Link></li>
          </ul>

          <li title='Attendance' className='list text-primary border-bottom p-2' data-bs-toggle="collapse" data-bs-target="#menuthree"><Link className='text-decoration-none'><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Customer</span><FontAwesomeIcon icon={faAngleDown} className='float-end' /></Link></li>

          <ul id='menuthree' className='collapse list-unstyled'>
            <li className='h6 border-bottom border-2 p-2'><Link to="/home/addcustomer" className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faSquarePlus} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Add Customer</span></Link></li>

            <li className='h6 border-bottom border-2 p-2'><Link to='/home/viewcustomer' className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>View Customer</span></Link></li>
         </ul>
        
         <li title='vendors' className='list text-primary border-bottom p-2' data-bs-toggle="collapse" data-bs-target="#menufour"><Link className='text-decoration-none'><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Vendors</span><FontAwesomeIcon icon={faAngleDown} className='float-end' /></Link></li>

          <ul id='menufour' className='collapse list-unstyled'>
            <li className='h6 border-bottom border-2 p-2'><Link to="/home/addvendor" className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faSquarePlus} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Add Vendor</span></Link></li>

            <li className='h6 border-bottom border-2 p-2'><Link to='/home/managevendors' className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>View Vendors</span></Link></li>
         </ul>

         <li title='vendors' className='list text-primary border-bottom p-2' data-bs-toggle="collapse" data-bs-target="#menufive"><Link className='text-decoration-none'><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Leads</span><FontAwesomeIcon icon={faAngleDown} className='float-end' /></Link></li>

          <ul id='menufive' className='collapse list-unstyled'>
            <li className='h6 border-bottom border-2 p-2'><Link to="/home/addLeads" className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faSquarePlus} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Add Leads</span></Link></li>

            <li className='h6 border-bottom border-2 p-2'><Link to='/home/manageleads' className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Manage Leads</span></Link></li>

            <li className='h6 border-bottom border-2 p-2'><Link to='/home/resheduledleads' className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Resheduled Leads</span></Link></li>
         </ul>

         <li title='vendors' className='list text-primary border-bottom p-2' data-bs-toggle="collapse" data-bs-target="#menusix"><Link className='text-decoration-none'><FontAwesomeIcon icon={faReceipt} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Receipt</span><FontAwesomeIcon icon={faAngleDown} className='float-end' /></Link></li>

         <ul id='menusix' className='collapse list-unstyled'>
         <li className='h6 border-bottom border-2 p-2'><Link to="/home/cashin" className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Cashin</span></Link></li>

         <li className='h6 border-bottom border-2 p-2'><Link to='/home/cashout' className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Cashout</span></Link></li>
      </ul>

         <li title='Interview' className='list text-primary border-bottom p-2' data-bs-toggle="collapse" data-bs-target="#menuseven"><Link className='text-decoration-none'><FontAwesomeIcon icon={faSuitcase} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Interview</span><FontAwesomeIcon icon={faAngleDown} className='float-end' /></Link></li>

         <ul id='menuseven' className='collapse list-unstyled'>
         <li className='h6 border-bottom border-2 p-2'><Link to="/home/addinterview" className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faCalendar} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Shedule</span></Link></li>

         <li className='h6 border-bottom border-2 p-2'><Link to='/home/interviewlist' className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Manage Interview</span></Link></li>
    </ul>

    <li title='Reports' className='list text-primary border-bottom p-2' data-bs-toggle="collapse" data-bs-target="#menueight"><Link className='text-decoration-none'><FontAwesomeIcon icon={faDigitalTachograph} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Reports</span><FontAwesomeIcon icon={faAngleDown} className='float-end' /></Link></li>

<ul id='menueight' className='collapse list-unstyled'>

<li className='h6 border-bottom border-2 p-2'><Link to="/home/managereports" className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Manage Reports</span></Link></li>

</ul>

<li title='Billing' className='list text-primary border-bottom p-2' data-bs-toggle="collapse" data-bs-target="#menunine"><Link className='text-decoration-none'><FontAwesomeIcon icon={faMoneyBill} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Billing</span><FontAwesomeIcon icon={faAngleDown} className='float-end' /></Link></li>

<ul id='menunine' className='collapse list-unstyled'>

<li className='h6 border-bottom border-2 p-2'><Link to="/home/gstbill" className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>GST</span></Link></li>

<li className='h6 border-bottom border-2 p-2'><Link to="/home/nongstbill" className='container-fluid text-decoration-none'><FontAwesomeIcon icon={faList} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Non-GST</span></Link></li>
                             
</ul>

<li title='Master' className='list text-primary border-bottom p-2' data-bs-toggle="collapse" data-bs-target="#menuten"><Link className='text-decoration-none'><FontAwesomeIcon icon={faBagShopping} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Master</span><FontAwesomeIcon icon={faAngleDown} className='float-end' /></Link></li>

<ul id='menuten' className='collapse list-unstyled'>

<li className='h6 border-bottom border-2 p-2'><Link to="/home/invoice-number" className='container-fluid  text-decoration-none'><FontAwesomeIcon icon={faFileInvoice} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Invoice No</span></Link></li>

<li className='h6 border-bottom border-2 p-2'><Link to="/home/student-id" className='container-fluid text-decoration-none'><FontAwesomeIcon icon={faNoteSticky} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Student Id</span></Link></li>

<li className='h6 border-bottom border-2 p-2'><Link to="/home/employee-id" className='container-fluid text-decoration-none'><FontAwesomeIcon icon={faNoteSticky} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Employee Id</span></Link></li>

<li className='h6 border-bottom border-2 p-2'><Link to="/home/addstaff" className='container-fluid text-decoration-none'><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Create Staff</span></Link></li>

</ul>

<li title='Logout' className='list text-primary border-bottom p-2' onClick={handleLogout}><Link className='text-decoration-none'><FontAwesomeIcon icon={faSignOut} />&nbsp;&nbsp;&nbsp;&nbsp;<span className={uxcard ? 'h6' :'d-none' }>Logout</span></Link></li>
          
        </ul>
        </div>
        </nav>
        


    </>
  )
}
