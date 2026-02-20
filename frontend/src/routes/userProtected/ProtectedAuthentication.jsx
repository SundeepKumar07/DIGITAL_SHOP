import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedAuthentication = ({isSellerAuthenticated, children}) => {
    const { isAuthenticated } = useSelector(state => state.user)
    if(isAuthenticated || isSellerAuthenticated){
        return <Navigate to={'/'} replace />
    }
    return children
}

export default ProtectedAuthentication