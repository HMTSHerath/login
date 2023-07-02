import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import LoginValidation from './LoginValidation'
import axios from 'axios'

function Login() {
  const[values,setValues] = useState({
    email:'',
    password:''
  })

  const navigate = useNavigate();
  const[errors,setErrors] = useState({})

  const handleInput = (event) =>{
    setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(LoginValidation(values));
    if( errors.email === "" && errors.password === ""){
      axios.post('http://localhost:8081/login',values)
      .then(res => {
        if(res.data === "Success"){
          navigate('/Home')
        }
        else{
          alert("Invalid Credentials")
        } 
      })
      .catch(err => console.log(err));
    }
  }


  return (
    <div  className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white  p-3 rounded w-25'>
        <h2 className='text-center'>Login</h2> 
         <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" name='email' placeholder="Enter email" onChange={handleInput} className='form-control rounded-0' />
                {errors.email && <span className='text-danger'> {errors.email}</span>}
            </div>
            <div className='mb-3'> 
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" name='password'  placeholder="Enter Password" onChange={handleInput} className='form-control rounded-0' />
                {errors.password && <span className='text-danger'> {errors.password}</span>}
            </div>
            <button type='submit' className="btn btn-success w-100 rounded-0"><strong>Login</strong></button>
            <p></p>
            <Link to = "/Signup" className="btn btn-default boder w-100 bg-light rounded-0 text-decoration-none">Create Account</Link>
          </form>
      </div>
    </div> 
  )
}

export default Login