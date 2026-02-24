import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar'
import CreateEvent from '../../components/Shop/CreateEvent'

const ShopCreateEvent = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className="flex items-center justify-between w-full">
        <div className="md:w-[280px] w-[50px]">
          <DashboardSidebar active={4}/>
        </div>
        <div className='w-full justify-center flex'>
            <CreateEvent/>
        </div>
      </div>
    </div>
  )
}

export default ShopCreateEvent