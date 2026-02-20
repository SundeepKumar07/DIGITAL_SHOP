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
        <ProtectedRoute isSellerAuthenticated={isSellerAuthenticated}>
          <ProfilePage />
        </ProtectedRoute>
      ),
    },
    { path: '/products', element: <ProductsPage /> },
    { path: '/best-selling', element: <BestSelling /> },
    { path: '/events', element: <EventsPage /> },
    { path: '/faq', element: <FAQSPage /> },
    { path: '/products/:name', element: <ProductDetailPage /> },  
  ];

  return routes;
};

export default AppRoutes;