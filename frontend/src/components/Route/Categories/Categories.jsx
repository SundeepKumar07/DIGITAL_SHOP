import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Branding Section */}
            <div className={`${styles.section} hidden sm:block`}>
                <div className="flex justify-between items-center w-full shadow-md bg-gray-50 rounded-lg p-4 my-4">
                    {brandingData && brandingData.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            {item.icon}
                            <div>
                                <h3 className="font-bold text-sm md:text-base text-gray-800">
                                    {item.title}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500">
                                    {item.Description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories Grid */}
            <div className={`${styles.section} bg-white p-6 rounded-lg mb-12 shadow-sm`}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {categoriesData && categoriesData.map((cat, index) => {
                        const handleClick = () => {
                            navigate(`/products?category=${cat.title}`);
                        };

                        return (
                            <div
                                key={index}
                                onClick={handleClick}
                                className="cursor-pointer flex flex-col items-center justify-center gap-2 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition transform hover:scale-105"
                            >
                                <img
                                    src={cat.image_Url}
                                    alt={cat.title}
                                    className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-cover rounded-full"
                                />
                                <h3 className="text-center text-[16px] md:text-[18px] font-semibold text-gray-800">
                                    {cat.title}
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Categories;