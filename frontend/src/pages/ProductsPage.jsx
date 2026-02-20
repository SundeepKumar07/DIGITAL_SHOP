import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { useEffect, useState } from "react";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const categoriesData = searchParams.get("category");
    const [data, setData] = useState([]);

    useEffect(() => {
        let d = [];
        if (!categoriesData) {
            d = [...productData].sort((a, b) => a.total_sell - b.total_sell);
        } else {
            d = productData.filter((i) => i.category === categoriesData);
        }
        setData(d);
    }, [categoriesData]); // important: add dependency

    return (
        <div>
            <Header activeHeading={3} />
            <br />
            <br />
            <div className={styles.section}>
                <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 md:gap-[10px] lg:grid-cols-4 lg:gap-[16px] xl:grid-cols-5 mb-12">
                    {data.length !== 0 && (
                        data.map((i, index) => <ProductCard data={i} key={index} />)
                    )}
                </div>
                {
                    data.length === 0 && <p className="text-2xl mt-12 text-gray-600 text-center">
                        No products available
                    </p>
                }
            </div>
        </div>
    );
};

export default ProductsPage;