import Lottie from "lottie-react";
import loaderAnimation from "../../assets/loader1.json";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";

const ShopDashboard = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className="flex items-center justify-between w-full">
        <div className="md:w-[280px] w-[50px]">
          <DashboardSidebar active={1}/>
        </div>
      </div>
    </div>
  );
};

{/* <Lottie
          animationData={loaderAnimation}
          loop={true}
          style={{ width: 200, height: 200 }}
        /> */}

export default ShopDashboard;