import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { useEffect, useState } from "react";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [data, setData] = useState([]);

  const { allProducts = [], isLoading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (!allProducts) return;

    let filteredProducts = [];

    if (!category) {
      filteredProducts = [...allProducts].sort(
        (a, b) => b.total_sell - a.total_sell
      );
    } else {
      filteredProducts = allProducts.filter(
        (product) => product.category === category
      );
    }

    setData(filteredProducts);
  }, [category, allProducts]);

  return (
    <div>
      <Header activeHeading={3} />

      <br />
      <br />

      {isLoading ? (
        <div className="text-center text-xl mt-10">Loading...</div>
      ) : (
        <div className={styles.section}>
          <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 md:gap-[10px] lg:grid-cols-4 lg:gap-[16px] xl:grid-cols-5 mb-12">
            {data.length > 0 &&
              data.map((product) => (
                <ProductCard data={product} key={product._id} />
              ))}
          </div>

          {data.length === 0 && (
            <p className="text-2xl mt-12 text-gray-600 text-center">
              No products available
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;