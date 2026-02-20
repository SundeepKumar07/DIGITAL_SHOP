import {AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter, AiOutlineYoutube} from 'react-icons/ai'
import {footercompanyLinks, footerProductLinks, footerSupportLinks} from "../../static/data"
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <div className='bg-black text-white'>
        <div className='md:flex md:justify-between md:items-center sm:px-12 px-4 bg-blue-700 py-7'>
            <h1 className='lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/3'>
                <span className='text-[#56d879]'>
                    Subscribe
                </span> us for news
                <br/>
                Events and Offers
            </h1>
            <div className='flex justify-center'>
                <input type="text" placeholder='Email...' className='bg-white text-gray-800 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none'/>
                <button className='bg-[#56d879] hover:bg-teal-500 duration-300 px-5 text-white md:w-auto w-2/3 h-12'>
                    Submit
                </button>
            </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center'>
            <ul className='px-5 text-center sm:text-start flex sm:block flex-col items-center'>
                <img src="https://img.freepik.com/premium-vector/online-shopping-logo-design-template-simple-minimal-style-mouse-cursor-with-bag-concepts_502185-289.jpg" alt="" style={{filter: "invert(1)", width: "150px"}}/>
                <p>The home and elements needed to create beautiful products</p>
                <div className="flex item-center mt-3">
                    <AiOutlineFacebook size={25} className={`ml-2 cursor-pointer`}/>
                    <AiOutlineInstagram size={25} className={`ml-2 cursor-pointer`}/>
                    <AiOutlineTwitter size={25} className={`ml-2 cursor-pointer`}/>
                    <AiOutlineYoutube size={25} className={`ml-2 cursor-pointer`}/>
                </div>
            </ul>

            <ul className='text-center sm:text-start'>
                <h1 className='mb-1 font-semibold'>Company</h1>
                {footerProductLinks.map((item, index) => (
                    <li key={index} className='text-gray-400'>
                        <Link to={item.link}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <ul className='text-center sm:text-start'>
                <h1 className='mb-1 font-semibold'>Shop</h1>
                {footercompanyLinks.map((item, index) => (
                    <li key={index} className='text-gray-400'>
                        <Link to={item.link}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <ul className='text-center sm:text-start'>
                <h1 className='mb-1 font-semibold'>Support</h1>
                {footerSupportLinks.map((item, index) => (
                    <li key={index} className='text-gray-400'>
                        <Link to={item.link}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-4 pb-8 pr-2 text-gray-400 text-sm'>
            <span>©2025 Eshop, All rights resrved</span>
            <span> Terms . Privacy Policy</span>
            <div className='w-full flex sm:block justify-center items-center'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWEwz7Tc2NJXB1p9QIEwS4RUGiJ8HKGOVmaEDOqsj6j3lYdrSC2c2OS6Nf7fpZnJ4Qog&usqp=CAU.png" alt="" style={{filter: "invert(1)"}} className='h-10'/>
            </div>
        </div>
    </div>
  )
}

export default Footer