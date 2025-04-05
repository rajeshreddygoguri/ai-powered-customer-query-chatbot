import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 
import { post } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post('/api/auth/register', { name, email, password });
      const response = request.data;

      if (request.status === 200) {
        toast.success(response.message);

        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "User already exists");
    }
  };

  return (
    <>
      <div className='register-container'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor="username">Username</label>
            <input type="text" onChange={(e) => setName(e.target.value)} id="username" />
          </div>
          <div className='input-group'>
            <label htmlFor="email">Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" />
          </div>
          <div className='input-group'>
            <label htmlFor="password">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" />
          </div>
          <button type='submit'>Register</button>
          <p className='register-link'>
            Already have an account? <Link to={'/login'}>Login here</Link>
          </p>
        </form>
      </div>
    </>
  );
}
