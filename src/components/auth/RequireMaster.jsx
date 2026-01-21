import { Navigate, useLocation } from 'react-router-dom'
import api from '../../utils/api'

const RequireMaster = ({ children }) => {
    const user = api.getCurrentUser()
    const location = useLocation()

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (user.role !== 'master') {
        return <Navigate to="/" replace />
    }

    return children
}

export default RequireMaster
