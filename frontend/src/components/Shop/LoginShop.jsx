import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../../server.js';
import { toast } from 'react-toastify';
import Logo from '../../assets/logo.png'

const LoginShop = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const onChangeValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/shop/login-shop`, {
        email: form.email,
        password: form.password
      }, {
        withCredentials: true
      })
      .then((res) => {
        toast.success(res.data.message || "Logged in successfully!");
        navigate('/shop-dashboard'); // Tip: Usually you'd navigate to dashboard, adjust as needed
        window.location.reload();
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || "Login failed";
        toast.error(errorMsg);
        console.log(err);
      });
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 transition duration-300 hover:shadow-2xl'>
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
            <h2 className='text-xl font-bold text-gray-800'>Shop Login</h2>
            <p className='text-sm font-medium text-gray-400 mt-0.5'>Login to your shop merchant account</p>
          </div>

          {/* Email Input */}
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="email" className='font-semibold text-sm text-gray-600'>Email Address</label>
            <input 
              type="email"
              name='email'
              id='email'
              required
              value={form.email}
              onChange={onChangeValue}
              placeholder="merchant@shop.com"
              className='outline-none ring-2 ring-gray-200 focus:ring-teal-400 rounded-xl px-4 py-2.5 text-gray-900 transition-all placeholder-gray-400' 
            />
          </div>

          {/* Password Input */}
          <div className='flex flex-col gap-1.5'>
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
            Login to Shop
          </button>

          {/* Redirection Footer Link */}
          <div className='flex gap-1.5 text-sm justify-center font-medium text-gray-500 mt-1'>
            <p>Don't have a shop account?</p>
            <Link to="/create-shop" className='font-bold text-teal-600 hover:text-teal-700 hover:underline transition-colors'>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginShop;