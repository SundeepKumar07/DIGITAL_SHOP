import './App.css';
import { useEffect } from 'react';
import { useRoutes } from "react-router-dom";
import store from './redux/store';
import { loadSeller, loadUser } from './redux/actions/userActions';
import AppRoutes from './route/Routes';
import ShopRoutes from './route/ShopRoutes';
import { useSelector } from 'react-redux';
import Lottie from "lottie-react";
import loaderAnimation from "../src/assets/loader1.json";
import { getAllEvents } from './redux/actions/eventAction';
import { getAllProducts } from './redux/actions/productAction';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
    store.dispatch(getAllEvents());
    store.dispatch(getAllProducts());
  }, []);
  const {sellerLoading} = useSelector(state => state.seller);
  const {loading} = useSelector(state => state.user);
  const {getEventsLoading, allEvents} = useSelector(state => state.event);
  const {getProductsLoading, allProducts} = useSelector(state => state.product);

  const routes = useRoutes([
    ...AppRoutes(), 
    ...ShopRoutes()
  ]);
  return (loading || sellerLoading) ? <div className='w-full h-[90vh] flex items-center justify-center'>
    <Lottie
      animationData={loaderAnimation}
      loop={true}
      style={{ width: 200, height: 200 }}
    />
  </div> : <>{routes}</>
  ;
}

export default App;