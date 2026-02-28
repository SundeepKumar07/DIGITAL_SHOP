import { useEffect, useState } from 'react'
import styles from '../../styles/styles';
import ProductCard from '../Route/ProductCard/ProductCard';
import { useSelector } from 'react-redux';

const SuggestedProducts = ({data}) => {
    const [products, setProducts] = useState([]);
    const {allProducts} = useSelector(state => state.product);
    useEffect(()=> {
        const d = allProducts.filter((i) => i.category === data.category);
        setProducts(d);
    },[])
  return (
    <div>
        {data && (
            <div className={`${styles.section} p-4`}>
                <div className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
                    Related Product
                </div>
                <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 md:gap-[10px] lg:grid-cols-4 lg:gap-[16px] xl:grid-cols-5 mb-12">
                    {
                        products && products.map((product, index) => (
                            <ProductCard data={product} key={index}/>
                        ))
                    }
                </div>
            </div>
        )}
    </div>
  )
}

export default SuggestedProducts