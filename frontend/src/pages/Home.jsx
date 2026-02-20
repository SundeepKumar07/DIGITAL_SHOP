import Hero from '../components/Route/Hero/Hero'
import Header from '../components/Layout/Header'
import Categories from '../components/Route/Categories/Categories'
import BestDeals from '../components/Route/BestDeals.jsx/BestDeals'
import FeaturedProduct from '../components/Route/FeaturedProduct/FeaturedProduct'
import Events from '../components/Events/Events'
import Sponsored from '../components/Route/Sponsored/Sponsored'
import Footer from '../components/Layout/Footer'
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1}/>
      <Hero/>
      <Categories/>
      <BestDeals/>
      <Events/>
      <FeaturedProduct/>
      <Sponsored/>
      <Footer/>
    </div>
  )
}

export default HomePage