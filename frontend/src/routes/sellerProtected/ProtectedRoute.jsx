import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

const SellerProtectedRoute = ({isAuthenticated, children}) => {
    const { isSellerAuthenticated } = useSelector(state => state.seller)
    if(!isSellerAuthenticated && !isAuthenticated ){
        return (
            <Navigate to={'/login-shop'} replace/>
        )
    }
    return children;
}

export default SellerProtectedRoute