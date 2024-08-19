import React, { useContext, useState,createContext,useRef,useEffect } from 'react'

const AuthContext = createContext()
export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(localStorage.getItem('token')) || useState()
    const [id,setId] = useState("Set student Id in Master")
    const [empid,setEmpId] = useState("Set Employee Id in Master")
    const [invoiceno,setInvoiceNo] = useState()
    const [screen,setScreen] = useState(true)
    const [uxcard,setUxcard] = useState(true)
    const [leads,setLeads] = useState()
    const change = useRef()

  return (
<>
<AuthContext.Provider  value={{user,setUser,uxcard,setUxcard,screen,setScreen,id,setId,empid,setEmpId,invoiceno,setInvoiceNo,leads,setLeads}}>
   {children} 
</AuthContext.Provider>
</>
  )
}

export const useAuth = ()=>{
    return useContext(AuthContext)
}
