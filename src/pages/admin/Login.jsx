import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import api from '../../utils/api'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@fincopy.io')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await api.adminLogin({ email, password })
      await Swal.fire({
        icon: 'success',
        title: `Welcome, ${user.name}!`,
        text: 'You are now logged in.',
        timer: 1500,
        showConfirmButton: false,
      })
      navigate('/admin')
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Login failed', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-xs text-gray-500">Sign in to access the admin panel.</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Email or Login ID</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com or admin"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-md py-2 text-sm disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
