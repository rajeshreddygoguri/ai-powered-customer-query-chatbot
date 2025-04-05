import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import { Logout } from '../redux/AuthSlice'

export default function Home() {
  const user=useSelector((state)=>state.Auth.user)
  // console.log(user)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const gotoAdmin=()=>{
        navigate('/admin')
  }
  const gotoChatbot=()=>{ 
    window.location.href = "https://chatbot-nc4p.onrender.com";

}
  const deleteCookie = (name) => {
  document.cookie = ${name}=; Max-Age=0; path=/; domain=${window.location.hostname};
};
  const handleLogout=async()=>{
    try {
      const request= await post('/api/auth/logout')
       const resspone= request.data
       if (request.status==200) {
         deleteCookie('token');
           dispatch(Logout())
          navigate('/login')
       }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>

     <div className='home-container'>
      <div className='user-card'>
        <h2> Welcome,{user && user.name}</h2>
        <button className='admin-btn' onClick={gotoChatbot}>Go to chatbot</button>
        {user && user.role=='admin' ? <button className='admin-btn' onClick={gotoAdmin}>Go To Admin Dashboard</button> :''}
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
        
      </div>
     </div>



    </>
  )
}
