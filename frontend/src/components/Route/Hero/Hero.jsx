import { Link } from 'react-router-dom'
import styles from '../../../styles/styles'

const Hero = () => {
  return (
    <div className={`${styles.noramlFlex} relative min-h-[70vh] md:min-h-[80vh] bg-no-repeat w-full`} style={{
      backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg) "
    }}>
      <div className={`${styles.section} w-[90%] md:w-[60%]`}>
        <h1 className={`text-[15px] leading-[1.2] md:text-[60px] text-gray-800 font-[600] capitalize`}>
          Best collections for <br/> home Decoration
        </h1>
        <p className={`pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]`}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid maxime sit quia, eaque quaerat unde debitis voluptatum corporis iusto id beatae ab voluptas quo praesentium error, quibusdam repudiandae libero mollitia.
        </p>
        <Link to={'/products'} className={`inline-block`}>
          <div className={`${styles.button} mt-5 text-white`}>
            Shop Now
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Hero