import styles from "../../../styles/styles.js"
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BestDeals = () => {
    const [data, setData] = useState([]);

    const { isLoading, allProducts, error } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            // Clone array before sorting (important)
            const sortedData = [...allProducts].sort(
                (a, b) => (b.sold_out || 0) - (a.sold_out || 0)
            );

            const firstFive = sortedData.slice(0, 5);
            setData(firstFive);
        }
    }, [allProducts]); // ✅ correct dependency

    if (isLoading) {
        return <h2 className="text-center py-10">Loading...</h2>;
    }

    if (error) {
        return <h2 className="text-center text-red-500 py-10">{error}</h2>;
    }

    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    Best Deals
                </div>

                <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 md:gap-[10px] lg:grid-cols-4 lg:gap-[16px] xl:grid-cols-5 mb-12">
                    {data && data.map((product) => (
                        <ProductCard data={product} key={product._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BestDeals;