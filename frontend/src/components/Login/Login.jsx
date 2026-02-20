import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {server} from '../../../server.js'
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const onChangeValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = new FormData();
    newForm.append("email", form.email);
    newForm.append("password", form.password);
    //axios request
    axios
      .post(`${server}/user/login-user`, {
        email: form.email,
        password: form.password
      }, {
        withCredentials: true
      })
      .then((res) => {
        navigate('/');
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return console.log(err.response.data.message);
      })
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-lg m-3 sm:m-0 sm:w-lg md:w-md lg:w-md bg-white rounded-md shadow-lg shadow-gray-300'>
        <form onSubmit={handleSubmit} className='flex justify-center flex-col gap-4 p-4 sm:p-6'>
          <div className='flex items-center'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnsepRSZ2Dfxh6ZdBFeZoCsm_KW5WwCFn2qw&s" alt="logo" className='w-12 h-10' />
            <h1 className='font-semibold text-2xl'>Sunny Mobile</h1>
          </div>
          <h2 className='font-medium text-gray-400'>Login To Your Account</h2>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='font-medium text-gray-500'>Email</label>
            <input type="text"
              name='email'
              id='email'
              required
              value={form.email}
              onChange={onChangeValue}
              className='outline-none ring-2 ring-gray-300 rounded-md px-3 py-2 text-gray-900' />
          </div>
          <div className='flex flex-col gap-2 rela'>
            <label htmlFor="password" className='font-medium text-gray-500'>Password</label>
            <div className='relative'>
              <input type={`${visible? "text" : "password"}`}
                name='password'
                id='password'
                required
                value={form.password}
                onChange={onChangeValue}
                className='outline-none ring-2 ring-gray-300 rounded-md px-3 py-2 text-gray-900 w-full' />
              {visible ?
                <AiOutlineEye
                  className='absolute top-2 right-1 cursor-pointer'
                  size={25}
                  onClick={() => setVisible(false)}
                />
                :
                <AiOutlineEyeInvisible
                  className='absolute top-2 right-1 cursor-pointer'
                  size={25}
                  onClick={() => setVisible(true)}
                />
              }
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-2 items-center text-sm'>
              <label htmlFor="remember-me" className='font-medium text-gray-500'>Remember me</label>
              <input type="checkbox"
                name='remember-me'
                id='remember-me'
              />
            </div>
            <a href="" className='font-semibold text-blue-700 text-sm'>Forgot Password</a>
          </div>
          <button className='w-full bg-blue-400 py-2 rounded-md font-semibold'>Submit</button>
          <div className='flex gap-2 text-sm'>
            <p>Not have any account</p>
            <Link to="/sign-up" className='font-semibold text-blue-700'>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login