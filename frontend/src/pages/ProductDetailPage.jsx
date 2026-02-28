import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import SuggestedProducts from "../components/Products/SuggestedProducts";
import { useSelector } from "react-redux";

const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = id;

  const { allProducts } = useSelector((state) => state.product); // fix name
  const [data, setData] = useState(null);

  useEffect(() => {
    if (allProducts && productId) {
      const product = allProducts.find((i) => i._id === productId);
      setData(product);
    }
  }, [allProducts, productId]);

  return (
    <div>
      <Header />
      <ProductDetail data={data} />
      {data && <SuggestedProducts data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;