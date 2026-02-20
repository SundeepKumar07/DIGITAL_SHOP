import { useState } from 'react'
import axios from 'axios';
import {server} from './../../../server.js'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import { toast } from 'react-toastify';

const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [avatar, setAvatar] = useState(null);

  const onChangeValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { "Content-type": "multipart/form-data" } }
    const newForm = new FormData();
    newForm.append("name", form.name);
    newForm.append("email", form.email);
    newForm.append("password", form.password);
    newForm.append("file", avatar);

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);

        //setting everything to null after success
        setForm({ name: '', email: '', password: '' });
        setAvatar(null);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      })
  }


  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-lg m-3 sm:m-0 sm:w-lg md:w-md lg:w-md bg-white rounded-md shadow-lg shadow-gray-300'>
        <form onSubmit={handleSubmit} className='flex justify-center flex-col gap-2 p-4 sm:p-6'>
          <div className='flex items-center'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnsepRSZ2Dfxh6ZdBFeZoCsm_KW5WwCFn2qw&s" alt="logo" className='w-12 h-10' />
            <h1 className='font-semibold text-2xl'>Sunny Mobile</h1>
          </div>
          <h2 className='font-medium text-gray-400'>Enter credentials To create Account</h2>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name" className='font-medium text-gray-500'>Name</label>
            <input type="text"
              name='name'
              id='name'
              required
              autoComplete='name'
              value={form.name}
              onChange={onChangeValue}
              className='outline-none ring-2 ring-gray-300 rounded-md px-3 py-2 text-gray-900' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='font-medium text-gray-500'>Email</label>
            <input type="email"
              name='email'
              id='email'
              required
              autoComplete='email'
              value={form.email}
              onChange={onChangeValue}
              className='outline-none ring-2 ring-gray-300 rounded-md px-3 py-2 text-gray-900' />
          </div>
          <div className='flex flex-col gap-2 rela'>
            <label htmlFor="password" className='font-medium text-gray-500'>Password</label>
            <div className='relative'>
              <input type={`${visible ? "text" : "password"}`}
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
          <div className='flex gap-2 items-center mt-4'>
            {
              avatar ?
                (
                  <div className='w-8 h-8'>
                    <img src={URL.createObjectURL(avatar)} alt="avatar" className='rounded-full w-full h-full overflow-hidden' />
                  </div>
                ) : (
                  <RxAvatar className='w-8 h-8 inline-block text-gray-700 rounded-full' />
                )
            }
            <label htmlFor="profile-image">
              <span>Upload picture</span>
              <input type="file" name='avatar' id='profile-image' accept='.png, .jpg, .jpeg' hidden onChange={handleAvatarChange} />
            </label>
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
            <p>Already have an account</p>
            <Link to="/login" className='font-semibold text-blue-700'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp