import React, { useState } from 'react'
import "./Login.scss"
import { USER_EMAIL, USER_PASSWORD } from '../../utils/constants';
import { useNavigate } from 'react-router';

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    console.log(formData)
  }

  const loginUser = (e) => {
    e.preventDefault()

    if (formData.email.length === 0 || formData.password.length === 0) {
      console.log('Please provide details')
      return;
    }

    if (formData.email === USER_EMAIL && formData.password === USER_PASSWORD) {
      navigate('/dashboard')
    } else {
      console.log('Invalid credentials')
      return
    }

  }

  return (
    <div className='login'>
      <form onSubmit={loginUser}>
        <div className='form-group'>
          <label>Email</label>
          <input type='text' name="email" className='email' placeholder='Email' onChange={handleOnChange} />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input type='password' name="password" className='password' placeholder='Password' onChange={handleOnChange} />
        </div>

        <button type='Submit'>Login</button>
      </form>
    </div>
  )
}

export default Login