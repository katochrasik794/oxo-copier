import { Navigate } from 'react-router-dom'
import api from '../../utils/api'

const RequireGuest = ({ children }) => {
    const user = api.getCurrentUser()

    if (user) {
        if (user.role === 'master') {
            return <Navigate to="/master/dashboard" replace />
        }
        return <Navigate to="/" replace />
    }

    return children
}

export default RequireGuest
