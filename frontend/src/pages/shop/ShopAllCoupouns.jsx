import AllCouponsCodes from '../../components/Shop/AllCouponsCodes'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'

const ShopAllCoupouns = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className="flex items-center justify-between w-full">
        <div className="md:w-[280px] w-[50px]">
          <DashboardSidebar active={9}/>
        </div>
        <div className='w-[750px] lg:w-full justify-center flex overflow-x-scroll'>
            <AllCouponsCodes/>
        </div>
      </div>
    </div>
  )
}

export default ShopAllCoupouns