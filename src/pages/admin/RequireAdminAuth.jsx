import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../../utils/api'

const RequireAdminAuth = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    let mounted = true
    api.me()
      .then((u) => { if (mounted) { setUser(u) } })
      .catch(() => { if (mounted) { setUser(null) } })
      .finally(() => { if (mounted) { setLoading(false) } })
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="p-6 text-sm">Checking session…</div>
  if (!user) return <Navigate to="/admin/login" replace />
  return children
}

export default RequireAdminAuth