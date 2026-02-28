import { useSelector } from "react-redux"
import styles from "../../../styles/styles"
import ProductCard from "../ProductCard/ProductCard"

const FeaturedProduct = () => {
    const { isLoading, allProducts, error } = useSelector(
        (state) => state.product
    )
    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    Featured Products
                </div>
                <div className={`grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 md:gap-[10px] lg:grid-cols-4 lg:gap-[16px] xl:grid-cols-5 mb-12`}>
                    {
                        allProducts && allProducts.map((i, index) => (
                            <ProductCard data={i} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FeaturedProduct