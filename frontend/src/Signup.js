import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SignupValidation from './SignupValidation'
import axios from 'axios'

function Signup() {
    const[values,setValues] = useState({
    name:'',
    email:'',
    password:'',
    phone:''
    })

    const navigate = useNavigate();

    const[errors,setErrors] = useState({})

    const handleInput = (event) =>{
    setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      setErrors(SignupValidation(values));
      if(errors.name === "" && errors.email === "" && errors.password === "" && errors.phone === ""){
        axios.post('http://localhost:8081/signup',values)
        .then(res => {
          navigate('/')
        })
        .catch(err => console.log(err));
      }
  }

  const [file,setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  } 

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image',file);
    axios.post('http://localhost:8081/upload',formData)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }

  const handleSubmitAndUpload = (event) => {
    handleSubmit(event);
    handleUpload();
  };

  return (
    <div  className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white  p-3 rounded w-25'>
        <h2 className='text-center'>Signup</h2>
         <form action="" onSubmit={handleSubmitAndUpload}>
         <div className='mb-3'>
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text"  placeholder="Enter name" name='name' onChange={handleInput} className='form-control rounded-0' />
                {errors.name && <span className='text-danger'> {errors.name}</span>}

            </div>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email"  placeholder="Enter email" name='email' onChange={handleInput} className='form-control rounded-0' />
                {errors.email && <span className='text-danger'> {errors.email}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor="phone"><strong>Phone Number</strong></label>
                <input type="text"  placeholder="Enter Phone Number" name='phone' onChange={handleInput} className='form-control rounded-0' />
                {errors.phone && <span className='text-danger'> {errors.phone}</span>}
            </div>
            <div className='mb-3'> 
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password"  placeholder="Enter Password" name ='password' onChange={handleInput} className='form-control rounded-0' />
                {errors.password && <span className='text-danger'> {errors.password}</span>}
            </div>
            <div className='mb-3'> 
                <label htmlFor="image"><strong>Image</strong></label>
                <input type="file"  placeholder="Enter Password" name ='password'onChange={handleFile}  className='form-control rounded-0' />
                {/* {errors.password && <span className='text-danger'> {errors.password}</span>} */}
                {/* <button onClick={handleUpload}>Upload</button> */}
            </div>
            <button type='submit' className="btn btn-success w-100 rounded-0"><strong>Signup</strong></button>
            <p></p>
            <Link to="/" className="btn btn-default boder w-100 bg-light rounded-0 text-decoration-none">Login</Link>
          </form>
      </div>
    </div> 
  )
}

export default Signup
