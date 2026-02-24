import ShopAllEvents from "../pages/shop/ShopAllEvents";
import ShopAllProducts from "../pages/shop/ShopAllProducts";
import ShopCreateEvent from "../pages/shop/ShopCreateEvent";
import ShopCreateProduct from "../pages/shop/ShopCreateProduct";
import ShopDashboard from "../pages/shop/ShopDashboard";
import ShopHomePage from "../pages/shop/ShopHomePage";
import ShopActivationPage from "../pages/ShopActivationPage";
import ShopCreatePage from "../pages/ShopCreatePage";
import ShopLoginPage from "../pages/ShopLoginPage";
import SellerProtectedAuthentication from "../routes/sellerProtected/ProtectedAuthentication";
import SellerProtectedRoute from "../routes/sellerProtected/ProtectedRoute";
import { useSelector } from "react-redux";

const ShopRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const routes = [
        { path: '/create-shop', element: 
      <SellerProtectedAuthentication isAuthenticated={isAuthenticated}>
        <ShopCreatePage />
      </SellerProtectedAuthentication>
     },
     {
      path: '/shop/activation/:activation_token',
      element: (
        <ShopActivationPage />
      ),
    },
    { path: '/login-shop', element: 
      <SellerProtectedAuthentication isAuthenticated={isAuthenticated}>
        <ShopLoginPage />
      </SellerProtectedAuthentication>
     },
    { path: '/shop-dashboard', element: 
      <SellerProtectedRoute isAuthenticated={isAuthenticated}>
        <ShopDashboard />
      </SellerProtectedRoute>
     },
    { path: '/shop-homePage', element: 
      <SellerProtectedRoute isAuthenticated={isAuthenticated}>
        <ShopHomePage />
      </SellerProtectedRoute>
     },
    { path: '/shop/create-product', element: 
      <SellerProtectedRoute isAuthenticated={isAuthenticated}>
        <ShopCreateProduct />
      </SellerProtectedRoute>
     },
     { path: '/shop-dashboard-products', element: 
      <SellerProtectedRoute isAuthenticated={isAuthenticated}>
        <ShopAllProducts />
      </SellerProtectedRoute>
     },
     { path: '/shop-dashboard-events', element: 
      <SellerProtectedRoute isAuthenticated={isAuthenticated}>
        <ShopAllEvents />
      </SellerProtectedRoute>
     },
     { path: '/shop/create-event', element: 
       <SellerProtectedRoute isAuthenticated={isAuthenticated}>
         <ShopCreateEvent />
       </SellerProtectedRoute>
      },
  ]
  return routes;
};

export default ShopRoutes;