import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

const SellerProtectedRoute = ({children}) => {
    const { isSellerAuthenticated } = useSelector(state => state.seller)
    if(!isSellerAuthenticated){
        return (
            <Navigate to={'/login-shop'} replace/>
        )
    }
    return children;
}

export default SellerProtectedRoute