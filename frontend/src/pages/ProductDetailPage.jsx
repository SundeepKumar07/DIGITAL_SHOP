import { useEffect, useState } from "react";
import { productData } from "../static/data"
import {useParams} from 'react-router-dom'
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import SuggestedProducts from "../components/Products/SuggestedProducts";

const ProductDetailPage = () => {
  const {name} = useParams();
  const [data, setData] = useState(null);
  const productName = name?.replace(/-/g, " ");
  
  useEffect(() => {
    const data = productData.find((i) => i.name === productName);
    setData(data);
  })
  return (
    <div>
      <Header/>
      <ProductDetail data={data} />
      {
        data && <SuggestedProducts data={data}/>
      }
      <Footer/>
    </div>
  )
}

export default ProductDetailPage