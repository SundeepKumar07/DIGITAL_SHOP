import styles from '../../styles/styles.js'
import { navItems } from '../../static/data.jsx'
import { Link } from 'react-router-dom'

const Navbar = ({active}) => {
  return (
    <div className={`${styles.noramlFlex} flex-col sm:flex-row items-start sm:justify-center mt-10 sm:mt-0`}>
        {
            navItems && navItems.map((i, index) => (
                <div key={index} className='flex'>
                    <Link 
                        to={i.url}
                        className={`${active === (index+1) ? "text-[#17dd1f]" : "text-gray-700"} px-6 cursor-pointer py-2 sm:py-0`}
                    >
                        {i.title}
                    </Link>
                </div>
            ))
        }
    </div>
  )
}

export default Navbar