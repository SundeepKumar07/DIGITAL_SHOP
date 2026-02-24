import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import AllEvents from '../../components/Shop/AllEvents'

const ShopAllEvents = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className="flex items-center justify-between w-full">
        <div className="md:w-[280px] w-[50px]">
          <DashboardSidebar active={5}/>
        </div>
        <div className='w-[750px] lg:w-full justify-center flex overflow-x-scroll'>
            <AllEvents/>
        </div>
      </div>
    </div>
  )
}

export default ShopAllEvents