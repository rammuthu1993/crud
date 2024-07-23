import React from 'react'
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


const ROLES = {
  admin:"admin",
  user:"2002"
}
const App = () => {

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
      <Route path='/viewattendance' element={<ViewAttendance/>}/>
      </Route>
      <Route path='/unauthorized' element={<unAuthorized/>}/>
      </Route>
      <Route path='*' element={<NoPage/>}/>
    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
