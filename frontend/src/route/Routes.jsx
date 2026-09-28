// src/route/Routes.jsx
import { useSelector } from "react-redux";
import BestSelling from '../pages/BestSelling';
import EventsPage from '../pages/EventsPage';
import FAQSPage from '../pages/FAQSPage';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProductsPage from '../pages/ProductsPage';
import ProfilePage from '../pages/ProfilePage';
import SignUp from '../pages/SignUp';
import UserActivationPage from '../pages/UserActivationPage';
import ProtectedAuthentication from '../routes/userProtected/ProtectedAuthentication';
import ProtectedRoute from '../routes/userProtected/ProtectedRoute';
import CheckoutPage from "../pages/CheckoutPage";
import PaymentOrderPage from "../pages/PaymentOrderPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import OrderDetailsPage from "../pages/Order/OrderDetailPage";
import TrackOrderPage from "../pages/Order/TrackOrderPage";

const AppRoutes = () => {
  const { isSellerAuthenticated } = useSelector((state) => state.seller);
  const routes = [
    { path: '/', element: <HomePage /> },
    {
      path: '/sign-up',
      element: (
        <ProtectedAuthentication isSellerAuthenticated={isSellerAuthenticated}>
          <SignUp />
        </ProtectedAuthentication>
      ),
    },
    {
      path: '/activation/:activation_token',
      element: (
        <ProtectedAuthentication>
          <UserActivationPage />
        </ProtectedAuthentication>
      ),
    },
    {
      path: '/login',
      element: (
        <ProtectedAuthentication isSellerAuthenticated={isSellerAuthenticated}>
          <LoginPage />
        </ProtectedAuthentication>
      ),
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      ),
    },
    { path: '/products', element: <ProductsPage /> },
    { path: '/best-selling', element: <BestSelling /> },
    { path: '/events', element: <EventsPage /> },
    { path: '/faq', element: <FAQSPage /> },
    { path: '/products/:id', element: <ProductDetailPage /> },  
    {
      path: '/checkout',
      element: (
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/payment',
      element: (
        <ProtectedRoute>
          <PaymentOrderPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/order/success',
      element: (
        <ProtectedRoute>
          <PaymentSuccessPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/user/order/:id',
      element: (
        <ProtectedRoute>
          <OrderDetailsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/user/order/track/:id',
      element: (
        <ProtectedRoute>
          <TrackOrderPage />
        </ProtectedRoute>
      ),
    },
  ];

  return routes;
};

export default AppRoutes;