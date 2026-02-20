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

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
  }, []);
  const {sellerLoading} = useSelector(state => state.seller);
  const {loading} = useSelector(state => state.user);

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