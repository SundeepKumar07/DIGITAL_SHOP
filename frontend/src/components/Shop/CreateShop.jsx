import { useState } from 'react';
import axios from 'axios';
import { server } from './../../../server.js';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import { toast } from 'react-toastify';
import Logo from '../../assets/logo.png'

const CreateShop = () => {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', phoneNumber: '', address: '', zipCode: '' });
  const [avatar, setAvatar] = useState(null);

  const onChangeValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { "Content-type": "multipart/form-data" } };
    const newForm = new FormData();
    newForm.append("name", form.name);
    newForm.append("email", form.email);
    newForm.append("password", form.password);
    newForm.append("file", avatar);
    newForm.append("phoneNumber", form.phoneNumber);
    newForm.append("zipCode", form.zipCode);
    newForm.append("address", form.address);

    axios
      .post(`${server}/shop/create-shop`, newForm, config)
      .then((res) => {
        toast.success(res.data.message || "Shop created successfully!");
        setForm({ name: '', email: '', password: '', address: '', phoneNumber: '', zipCode: '' });
        setAvatar(null);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || "Registration failed";
        toast.error(errorMsg);
        console.log(err);
      });
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8'>
      {/* Max width expanded slightly to max-w-xl to perfectly support the 2-column layout */}
      <div className='w-full max-w-xl bg-white rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 transition duration-300 hover:shadow-2xl'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-6 sm:p-8'>
          
          {/* Logo Brand Header */}
          <div className='flex items-center gap-3 justify-center sm:justify-start'>
            <div className='w-12 h-10 overflow-hidden rounded-md bg-teal-50 flex items-center justify-center'>
              <img 
                src={Logo} 
                alt="logo" 
                className='w-full h-full object-cover' 
              />
            </div>
            <h1 className='font-bold text-2xl bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent'>
              Digital Shop
            </h1>
          </div>

          <div className='text-center sm:text-left mb-1'>
            <h2 className='text-xl font-bold text-gray-800'>Register Your Shop</h2>
            <p className='text-sm font-medium text-gray-400 mt-0.5'>Enter credentials to create your merchant account</p>
          </div>

          {/* Form Fields Container with Responsive Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            
            {/* Shop Name */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="name" className='font-semibold text-sm text-gray-600'>Shop Name</label>
              <input 
                type="text"
                name='name'
                id='name'
                required
                autoComplete='name'
                value={form.name}
                onChange={onChangeValue}
                placeholder="My Awesome Shop"
                className='outline-none ring-2 ring-gray-200 focus:ring-teal-400 rounded-xl px-4 py-2.5 text-gray-900 transition-all placeholder-gray-400' 
              />
            </div>

            {/* Email Address */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="email" className='font-semibold text-sm text-gray-600'>Email Address</label>
              <input 
                type="email"
                name='email'
                id='email'
                required
                autoComplete='email'
                value={form.email}
                onChange={onChangeValue}
                placeholder="vendor@shop.com"
                className='outline-none ring-2 ring-gray-200 focus:ring-teal-400 rounded-xl px-4 py-2.5 text-gray-900 transition-all placeholder-gray-400' 
              />
            </div>

            {/* Phone Number */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="phoneNumber" className='font-semibold text-sm text-gray-600'>Phone Number</label>
              <input 
                type="text" 
                name='phoneNumber'
                id='phoneNumber'
                required
                autoComplete='tel'
                value={form.phoneNumber}
                onChange={onChangeValue}
                placeholder="03XXXXXXXXX"
                className='outline-none ring-2 ring-gray-200 focus:ring-teal-400 rounded-xl px-4 py-2.5 text-gray-900 transition-all placeholder-gray-400' 
              />
            </div>

            {/* Zip Code */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor="zipCode" className='font-semibold text-sm text-gray-600'>Zip Code</label>
              <input 
                type="text"
                name='zipCode'
                id='zipCode'
                required
                autoComplete='postal-code'
                value={form.zipCode}
                onChange={onChangeValue}
                placeholder="90210"
                className='outline-none ring-2 ring-gray-200 focus:ring-teal-400 rounded-xl px-4 py-2.5 text-gray-900 transition-all placeholder-gray-400' 
              />
            </div>

            {/* Shop Address (Spans full width on desktop grid) */}
            <div className='flex flex-col gap-1.5 sm:col-span-2'>
              <label htmlFor="address" className='font-semibold text-sm text-gray-600'>Shop Address</label>
              <input 
                type="text"
                name='address'
                id='address'
                required
                autoComplete='street-address'
                value={form.address}
                onChange={onChangeValue}
                placeholder="123 Market St, Suite 100"
                className='outline-none ring-2 ring-gray-200 focus:ring-teal-400 rounded-xl px-4 py-2.5 text-gray-900 transition-all placeholder-gray-400' 
              />
            </div>

            {/* Password (Spans full width on desktop grid) */}
            <div className='flex flex-col gap-1.5 sm:col-span-2'>
              <label htmlFor="password" className='font-semibold text-sm text-gray-600'>Password</label>
              <div className='relative w-full'>
                <input 
                  type={visible ? "text" : "password"}
                  name='password'
                  id='password'
                  required
                  value={form.password}
                  onChange={onChangeValue}
                  placeholder="••••••••"
                  className='outline-none ring-2 ring-gray-200 focus:ring-teal-400 rounded-xl px-4 py-2.5 text-gray-900 w-full transition-all placeholder-gray-400 pr-12' 
                />
                <div className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-teal-500 transition-colors'>
                  {visible ? (
                    <AiOutlineEye size={22} className='cursor-pointer' onClick={() => setVisible(false)} />
                  ) : (
                    <AiOutlineEyeInvisible size={22} className='cursor-pointer' onClick={() => setVisible(true)} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Logo Upload Dashboard Section */}
          <div className='flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200 mt-1'>
            <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500 bg-white shadow-inner flex items-center justify-center flex-shrink-0'>
              {avatar ? (
                <img src={URL.createObjectURL(avatar)} alt="avatar" className='w-full h-full object-cover' />
              ) : (
                <RxAvatar className='w-full h-full text-gray-400' />
              )}
            </div>
            <label 
              htmlFor="profile-image" 
              className='cursor-pointer bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 transition-all select-none'
            >
              Upload Shop Logo
              <input 
                type="file" 
                name='avatar' 
                id='profile-image' 
                accept='.png, .jpg, .jpeg' 
                hidden 
                onChange={handleAvatarChange} 
              />
            </label>
          </div>

          {/* Options Row */}
          <div className='flex justify-between items-center text-sm pt-1'>
            <div className='flex gap-2 items-center cursor-pointer select-none'>
              <input 
                type="checkbox"
                name='remember-me'
                id='remember-me'
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-400 border-gray-300 cursor-pointer accent-teal-600"
              />
              <label htmlFor="remember-me" className='font-medium text-gray-500 cursor-pointer'>Remember me</label>
            </div>
            <Link to="/forgot-password" className='font-semibold text-teal-600 hover:text-teal-700 hover:underline transition-colors'>
              Forgot Password?
            </Link>
          </div>

          {/* Submit Action Button */}
          <button className='w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 rounded-xl font-bold shadow-md shadow-teal-100/50 hover:shadow-lg transition-all transform active:scale-[0.98] mt-2'>
            Create Shop
          </button>

          {/* Redirection Footer Link */}
          <div className='flex gap-1.5 text-sm justify-center font-medium text-gray-500 mt-1'>
            <p>Already have a shop account?</p>
            <Link to="/login-shop" className='font-bold text-teal-600 hover:text-teal-700 hover:underline transition-colors'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShop;