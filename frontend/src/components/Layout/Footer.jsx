import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter, AiOutlineYoutube } from 'react-icons/ai'
import { footercompanyLinks, footerProductLinks, footerSupportLinks } from "../../static/data"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-gray-900 text-gray-100'>
      
      {/* Subscribe Section */}
      <div className='md:flex md:justify-between md:items-center sm:px-12 px-4 bg-gray-800 py-8'>
        <h1 className='lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold'>
          <span className='text-[#56d879]'>Subscribe</span> us for news
          <br/>
          Events and Offers
        </h1>
        <div className='flex justify-center w-full md:w-auto'>
          <input 
            type="text" 
            placeholder='Your email...' 
            className='bg-gray-700 text-gray-100 w-full sm:mr-5 mr-1 py-2.5 rounded-l px-3 focus:outline-none placeholder-gray-400'
          />
          <button className='bg-[#56d879] hover:bg-teal-500 duration-300 px-5 text-white rounded-r'>
            Submit
          </button>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:px-8 px-5 py-16'>
        
        {/* Brand + Social */}
        <div className='flex flex-col items-center sm:items-start text-center sm:text-left'>
          <img 
            src="https://img.freepik.com/premium-vector/online-shopping-logo-design-template-simple-minimal-style-mouse-cursor-with-bag-concepts_502185-289.jpg" 
            alt="logo" 
            className='w-36 mb-3 filter brightness-0 invert'
          />
          <p className='text-gray-400'>The home and elements needed to create beautiful products</p>
          <div className='flex gap-3 mt-3'>
            <AiOutlineFacebook size={25} className='cursor-pointer hover:text-[#56d879] transition'/>
            <AiOutlineInstagram size={25} className='cursor-pointer hover:text-[#56d879] transition'/>
            <AiOutlineTwitter size={25} className='cursor-pointer hover:text-[#56d879] transition'/>
            <AiOutlineYoutube size={25} className='cursor-pointer hover:text-[#56d879] transition'/>
          </div>
        </div>

        {/* Product Links */}
        <ul className='text-center sm:text-start'>
          <h1 className='mb-4 font-semibold text-white'>Products</h1>
          {footerProductLinks.map((item, index) => (
            <li key={index} className='text-gray-400 hover:text-[#56d879] mb-2 transition'>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {/* Company Links */}
        <ul className='text-center sm:text-start'>
          <h1 className='mb-4 font-semibold text-white'>Company</h1>
          {footercompanyLinks.map((item, index) => (
            <li key={index} className='text-gray-400 hover:text-[#56d879] mb-2 transition'>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {/* Support Links */}
        <ul className='text-center sm:text-start'>
          <h1 className='mb-4 font-semibold text-white'>Support</h1>
          {footerSupportLinks.map((item, index) => (
            <li key={index} className='text-gray-400 hover:text-[#56d879] mb-2 transition'>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>

      </div>

      {/* Bottom Bar */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left border-t border-gray-700 px-5 py-6 text-gray-400 text-sm'>
        <span>©2025 Eshop, All rights reserved</span>
        <span>Terms . Privacy Policy</span>
        <div className='flex justify-center md:justify-end items-center'>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWEwz7Tc2NJXB1p9QIEwS4RUGiJ8HKGOVmaEDOqsj6j3lYdrSC2c2OS6Nf7fpZnJ4Qog&usqp=CAU.png" 
            alt="payment" 
            className='h-10 filter brightness-0 invert'
          />
        </div>
      </div>
    </div>
  )
}

export default Footer;