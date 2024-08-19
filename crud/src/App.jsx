import React, { useEffect, useState } from 'react'
import "./App.css"
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { Home } from './components/Home'
import { ViewAttendance } from './components/ViewAttendance'
import { Routes,Route } from 'react-router-dom'
import { AuthProvider } from './Protection/auth'
import { RequireAuth } from './Protection/RequireAuth'
import { Login } from './components/Login'
import { unAuthorized } from './Protection/unAuthorized'
import { NoPage } from './components/NoPage'
import { createContext } from 'react'
import { AddStudent } from './components/AddStudent'
import { StudentList } from './components/StudentList'
import { UpdateStudent } from './components/UpdateStudent'
import { AddEmployee } from './components/AddEmployee'
import { EmployeesList } from './components/EmployeeList'
import { UpdateEmployees } from './components/updateEmployee'
import { AddAttendance } from './components/AddAttendance'
import { AddCustomer } from './components/AddCustomer'
import { ViewCustomer } from './components/ViewCustomer'
import { AddVendor } from './components/AddVendor'
import { ManageVendor } from './components/ManageVendors'
import { AddLeads } from './components/AddLeads'
import { ManageLeads } from './components/ManageLeads'
import { ResheduledLeads } from './components/ResheduledLeads'
import { CashIn } from './components/CashIn'
import { CreateCashIn } from './components/CreateCashIn'
import { AddInterview } from './components/AddInterview'
import { ManageInterview } from './components/ManageInterview'
import { Reports } from './components/Reports'
import { Gst } from './components/Gst'
import { Non_Gst } from './components/Non_Gst'
import { HeaderNav } from './components/HeaderNav'
import { Suspense } from 'react'
import { useAuth } from './Protection/auth'
import { SideNavbar } from './components/SideNavbar'
import { StudentIdset } from './components/StudentIdset'
import { EmployeeIdset } from './components/EmployeeIdset'
import { InvoicenoSet } from './components/InvoicenoSet'
import { AddStaff } from './components/AddStaff'


const ROLES = {
  admin:"admin",
  user:"2002"
}

export const ProvideContext = createContext()
const App = () => {
  const [uxcard,setUxcard] = useState(true)   
  
  return (
    <>
    
    <AuthProvider>
    <Routes>
    <Route path="/">
    <Route index element={<Login/>}/>

    <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
    <Route path='/home' element={<Home/>}/>
    </Route>

    <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
    <Route path='/home/addstudents' element={<AddStudent/>}/> 
    <Route path='/home/studentlist' element={<StudentList/>}/>
    <Route path='/home/updatestudent/:id' element={<UpdateStudent/>}/>
    </Route>

    <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
    <Route path='/home/addemployee' element={<AddEmployee/>}/>
    <Route path='/home/employeeslist' element={<EmployeesList/>}/>
    <Route path='/home/updateemployee/:id' element={<UpdateEmployees/>}/>
    <Route path='/home/addattendance' element={<AddAttendance/>}/>
    <Route path='/home/viewattendance' element={<ViewAttendance/>}/>
    </Route>

    <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
    <Route path='/home/addcustomer' element={<AddCustomer/>}/> 
    <Route path='/home/viewcustomer' element={<ViewCustomer/>}/> 
    </Route>

    <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
    <Route path='/home/addvendor' element={<AddVendor/>}/> 
    <Route path='/home/managevendors' element={<ManageVendor/>}/> 
    </Route>
    
    <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
    <Route path='/home/addleads' element={<AddLeads/>}/> 
    <Route path='/home/manageleads' element={<ManageLeads/>}/> 
    <Route path='/home/resheduledleads' element={<ResheduledLeads/>}/> 
    </Route>

    <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}> 
    <Route path='/home/cashin' element={<CashIn/>}/> 
    <Route path='/home/createcashin' element={<CreateCashIn/>}/> 
    </Route>

    <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
    <Route path='/home/addinterview' element={<AddInterview/>}/> 
    <Route path='/home/interviewlist' element={<ManageInterview />}/> 
    </Route>

    <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
    <Route path='/home/managereports' element={<Reports/>}/> 
    </Route>

    <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
    <Route path='/home/gstbill' element={<Gst/>}/> 
    <Route path='/home/nongstbill' element={<Non_Gst/>}/> 
    </Route>

    <Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
    <Route path='/home/student-id' element={<StudentIdset/>}/>
    <Route path='/home/employee-id' element={<EmployeeIdset/>}/>
    <Route path='/home/invoice-number' element={<InvoicenoSet/>}/>
    <Route path='/home/addstaff' element={<AddStaff/>}/>
    </Route>

    </Route>
    <Route path='unauthorized' element={<unAuthorized/>}/>
    <Route path='*' element={<NoPage/>}/>
    <Route element={<HeaderNav/>}/>
    <Route element={<SideNavbar/>}/>
    </Routes>
   </AuthProvider>

    </>
  )
}

export default App

/* 
<Routes>
<Route path="/">
<Route index element={<Login/>}/>

<Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
<Route path='/home' element={<Home/>}/>
</Route>

<Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
<Route path='/addstudents' element={<AddStudent/>}/> 
<Route path='/studentlist' element={<StudentList/>}/>
<Route path='/updatestudent/:id' element={<UpdateStudent/>}/>
</Route>

<Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
<Route path='/addemployee' element={<AddEmployee/>}/>
<Route path='/employeeslist' element={<EmployeesList/>}/>
<Route path='/updateemployee/:id' element={<UpdateEmployees/>}/>
<Route path='/addattendance' element={<AddAttendance/>}/>
<Route path='/viewattendance' element={<ViewAttendance/>}/>
</Route>

<Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
<Route path='/addcustomer' element={<AddCustomer/>}/> 
<Route path='/viewcustomer' element={<ViewCustomer/>}/> 
</Route>

<Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
<Route path='/addvendor' element={<AddVendor/>}/> 
<Route path='/managevendors' element={<ManageVendor/>}/> 
</Route>
    
<Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
<Route path='/addleads' element={<AddLeads/>}/> 
<Route path='/manageleads' element={<ManageLeads/>}/> 
<Route path='/resheduledleads' element={<ResheduledLeads/>}/> 
</Route>

<Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
<Route path='/cashin' element={<CashIn/>}/> 
<Route path='/createcashin' element={<CreateCashIn/>}/> 
</Route>

<Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
<Route path='/addinterview' element={<AddInterview/>}/> 
<Route path='/interviewlist' element={<ManageInterview />}/> 
</Route>

<Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
<Route path='/managereports' element={<Reports/>}/> 
</Route>

<Route element={<RequireAuth allowedRoles={ROLES.admin}/>}>
<Route path='/gstbill' element={<Gst/>}/> 
<Route path='/nongstbill' element={<Non_Gst/>}/> 
</Route>
</Route>
<Route path='/unauthorized' element={<unAuthorized/>}/>
<Route path='*' element={<NoPage/>}/>
</Routes> */