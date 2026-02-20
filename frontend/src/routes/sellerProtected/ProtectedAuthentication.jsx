import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const SellerProtectedAuthentication = ({isAuthenticated, children}) => {
    const { isSellerAuthenticated } = useSelector(state => state.seller)
    if(isSellerAuthenticated || isAuthenticated){
        return <Navigate to={'/'} replace />
    }
    return children
}

export default SellerProtectedAuthentication