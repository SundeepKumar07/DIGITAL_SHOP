import styles from "../../../styles/styles"

const Sponsored = () => {
  return (
    <div className={styles.section}>
      <div className="hidden md:flex justify-between bg-white mb-12">
        <img src={'/sony.png'} alt="" className="w-[100px] lg:w-[150px]"/>
        <img src={'/lg.png'} alt="" className="w-[130px] lg:w-[250px]"/>
        <img src={'/dell.png'} alt="" className="w-[100px] lg:w-[150px]"/>
        <img src={'/microsoft.png'} alt="" className="w-[100px] lg:w-[150px]"/>
        <img src={'/apple.png'} alt="" className="w-[100px] lg:w-[150px]"/>
      </div>
    </div>
  )
}

export default Sponsored