import styles from "../../../styles/styles.js"
import { productData } from "../../../static/data.jsx"
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useEffect, useState } from "react";
const BestDeals = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const allProductsData = productData;
        const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
        const firstFive = sortedData && sortedData.slice(0, 5);
        setData(firstFive);
    }, [productData]);
    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    Best Deals
                </div>
                <div className={`grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 md:gap-[10px] lg:grid-cols-4 lg:gap-[16px] xl:grid-cols-5 mb-12`}>
                    {
                        data && data.map((i, index) => (
                            <ProductCard data={i} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BestDeals