import React, { useEffect, useState } from 'react'
import {  deleteUser, get } from '../services/ApiEndpoint'
import  { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { post } from '../services/ApiEndpoint';
import { Logout } from '../redux/AuthSlice';

export default function Admin() {
  const [users,setUsers]=useState('');
  const [showManageUsers, setShowManageUsers] = useState(false); 
  const navigate = useNavigate();
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();



  useEffect(()=>{
         const GetUsers=async()=>{
          try {
                 const request= await get('/api/admin/getuser')
                 const respnse = request.data
                if (request.status===200) {
                   setUsers(respnse.users)
                }
                 
          } catch (error) {
              console.log(error)
          }
         }
         GetUsers()
  },[])
  const handleDelete=async(id)=>{
       try {
            const request=await deleteUser(`/api/admin/delet/${id}`)
            const response=request.data
            if (request.status===200) {
              toast.success(response.message)
              console.log(response)
              setUsers(users.filter((user) => user._id !== id));
            }
       } catch (error) {
          if (error.response) {
            toast.error(error.response.data.message)
          }
       }
  }
  const gotoChatbot=()=>{ 
    window.location.href = "http://localhost:5174";

}
  const handleLogout = async () => {
    try {
      const request = await post('/api/auth/logout');
      const response = request.data;
      if (request.status === 200) {
        dispatch(Logout());
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!showManageUsers ? (
        <div className="home-container">
          <div className="user-card">
            <h2>Welcome, {user && user.name}</h2>
            {user && user.role === 'admin' && (
              <button className="admin-btn" onClick={() => setShowManageUsers(true)}>
                Go To Admin
              </button>
            )}
            <button className='admin-btn' onClick={gotoChatbot}>Go to chatbot</button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
          <button className="back-btn" onClick={() => setShowManageUsers(false)}>
            Back
          </button>
          
          <div className="admin-container">
            <h2>Manage Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((elem, index) => (
                    <tr key={index}>
                      <td>{elem.name}</td>
                      <td>{elem.email}</td>
                      <td>
                        <button onClick={() => handleDelete(elem._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}  