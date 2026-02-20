import { productData } from "../../../static/data"
import styles from "../../../styles/styles"
import ProductCard from "../ProductCard/ProductCard"

const FeaturedProduct = () => {
    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    Featured Products
                </div>
                <div className={`grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 md:gap-[10px] lg:grid-cols-4 lg:gap-[16px] xl:grid-cols-5 mb-12`}>
                    {
                        productData && productData.map((i, index) => (
                            <ProductCard data={i} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FeaturedProduct