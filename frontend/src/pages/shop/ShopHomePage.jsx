import Lottie from "lottie-react";
import loaderAnimation from "../../assets/loader1.json";
import styles from '../../styles/styles'
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex py-10 gap-6">
        <div className="w-[25%] bg-white rounded-[4px] shadow-sm overflow-y-auto no-scrollbar h-[90vh] sticky top-2 left-0 z-10">
          <ShopInfo isOwner={true}/>
        </div>
        <div className="w-[72%] rounded-]4px]">
          <ShopProfileData isOwner={true}/>
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

export default ShopHomePage;