import AllProducts from '../../components/Shop/AllProducts'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className="flex items-center justify-between w-full">
        <div className="md:w-[280px] w-[50px]">
          <DashboardSidebar active={3}/>
        </div>
        <div className='w-[750px] lg:w-full justify-center flex overflow-x-scroll'>
            <AllProducts/>
        </div>
      </div>
    </div>
  )
}

export default ShopAllProducts