import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({isSellerAuthenticated, children}) => {
    const { isAuthenticated } = useSelector(state => state.user)
    if(!isAuthenticated && !isSellerAuthenticated){
        return (
            <Navigate to={'/login'} replace/>
        )
    }
    return children;
}

export default ProtectedRoute