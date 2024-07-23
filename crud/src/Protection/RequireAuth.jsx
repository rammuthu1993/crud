import React from 'react'
import { useAuth } from './auth'
import { all } from 'axios';
import { Navigate, Outlet,useLocation } from 'react-router-dom';
import { unAuthorized } from './unAuthorized';

export const RequireAuth = ({allowedRoles}) => {
    const auth = useAuth()
    const location = useLocation()
    console.log(allowedRoles);
    console.log(auth.user);
    console.log(auth?.user==allowedRoles);
  return (
    auth?.user===allowedRoles ?
    <Outlet/> : auth?.user ? <Navigate to="/unauthorized" />: <Navigate to="/" state={{from:location}} replace/>
  )
}
