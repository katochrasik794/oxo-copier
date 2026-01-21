import { Navigate, useLocation } from 'react-router-dom'
import api from '../../utils/api'

const RequireAuth = ({ children }) => {
    const user = api.getCurrentUser()
    const location = useLocation()

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (user.role === 'master') {
        return <Navigate to="/master/dashboard" replace />
    }

    return children
}

export default RequireAuth
