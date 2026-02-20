import { brandingData, categoriesData } from "../../../static/data"
import styles from "../../../styles/styles"
import { useNavigate } from 'react-router-dom'
const Categories = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className={`${styles.section} hidden sm:block`}>
                <div className={`leading-1 my-[12px] flex justify-between w-full shadow-sm bg-white rounded-md`}>
                    {
                        brandingData && brandingData.map((i, index) => (
                            <div key={index} className={`flex items-center`}>
                                {i.icon}
                                <div className={`px-3`}>
                                    <h3 className={`font-bold text-sm md:text-base`}>
                                        {i.title}
                                    </h3>
                                    <p className={`text-xs md:text-sm`}>
                                        {i.Description}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`}>
                <div className={`grid grid-cols-1 gap-[3px] sm:grid-cols-2 md:grid-cols-3 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]`}>
                    {
                        categoriesData && categoriesData.map((i, index) => {
                            const handleSubmit = (i) => {
                                navigate(`/products?category=${i.title}`);
                            }

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleSubmit(i)}
                                    className={`cursor-pointer w-full flex justify-between lg:justify-center items-center overflow-hidden py-10 lg:p-2`}
                                >
                                    <h3 className={`text-[18px] leading-[1.3]`}>{i.title}</h3>
                                    <img src={i.image_Url}
                                        className={`object-cover w-[170px] md:w-[100px]`}
                                        alt="" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Categories