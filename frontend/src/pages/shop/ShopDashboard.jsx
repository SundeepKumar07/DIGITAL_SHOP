import React from "react";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../assets/loader1.json";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";

const ShopDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardHeader />
      
      <div className="flex w-full items-start">
        {/* Sidebar wrapper handles fluid responsiveness seamlessly */}
        <div className="w-[60px] md:w-[260px] flex-shrink-0 transition-all duration-300">
          <DashboardSidebar active={1} />
        </div>

        {/* Dynamic Inner Dashboard Panel Screen Viewport */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          {/* Main layout contents render injected here */}
          
          {/* Example Loader Container Usage: 
          <div className="flex items-center justify-center py-20">
            <Lottie
              animationData={loaderAnimation}
              loop={true}
              style={{ width: 200, height: 200 }}
            />
          </div> 
          */}
        </main>
      </div>
    </div>
  );
};

export default ShopDashboard;