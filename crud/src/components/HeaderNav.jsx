import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEnvelope, faExpandAlt } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../Protection/auth'
import { ProvideContext } from '../App'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { getLogin } from '../features/loginSlice'
import { useNavigate } from 'react-router-dom'

export const HeaderNav = () => {
  const {uxcard,setUxcard} = useAuth()
  const response = useSelector(state=> getLogin(state)) 
  console.log(response);
  const navigate = useNavigate()
  
  const auth = useAuth()
  const handleSearch = ()=>{
    const input = document.getElementById("mySearch")
    const filter = input.value.toUpperCase()
    console.log(filter);
    const ul = document.getElementById("sidenav")
    const li = ul.getElementsByClassName("list")
    for(let i=0;i < li.length;i++){
      const span = li[i].getElementsByTagName("span")[0]
      if(span.innerHTML.toUpperCase().indexOf(filter) > -1){
           li[i].style.display = "";
      }
      else{
           li[i].style.display = "none";
      }
    }
}

const handleLogout = ()=>{
  localStorage.clear("token")
  window.location.reload()
  // navigate("/")
}


const handleHamburger=()=>{
        document.querySelector(".hamburger").classList.toggle("icon")
        setUxcard(!uxcard)
     }
  return (
    <>
     <div className='py-3 px-4 rounded-5 border shadow-sm d-flex justify-content-between'>

      <div className='hamburger' onClick={()=>handleHamburger()}>
      <div className='bar1'></div>
      <div className='bar2'></div>
      <div className='bar3'></div>
      </div>

       <div className='d-flex align-items-center col-md-8'>

       <div id='input-ani' className='ms-5 container-fluid d-flex align-items-center '>
        
         <input id='mySearch' onKeyUp={handleSearch} type="text" className='input-ani-init p-2 px-5 w-100 border rounded-5' placeholder='Search...'/>
          
          
          </div>

       </div>

    <div className='col-md-3 d-flex align-items-center justify-content-evenly'>
    <div><FontAwesomeIcon className='h3' icon={faEnvelope} /></div>
        <div><FontAwesomeIcon className='h3' icon={faExpandAlt} /></div>  
        <div data-bs-toggle="collapse" data-bs-target="#profile" className='admin-logo text-center text-white' ><h3 >A</h3>
        <ul id="profile" style={{width:"100px"}} className="position-absolute top-20 collapse text-dark bg-white shadow-sm list-unstyled p-3">
          <li data-bs-toggle="modal" data-bs-target="#adminprofile">Profile</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
        </div>
    </div>  

        
      

      </div>

         <div id='adminprofile' className='modal fade'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1>Profile</h1>
                <button className='btn btn-close' data-bs-dismiss="modal"></button>
              </div>
              <div className='modal-body'>
                <p>Name: Admin</p>
                <p>Password: ******</p>
              </div>
              <div className='modal-footer'>
              <button className='btn btn-warning' data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
            
         </div>
      
    </>
  )
}

