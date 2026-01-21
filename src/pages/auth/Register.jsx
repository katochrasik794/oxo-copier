import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast'
import api from '../../utils/api'

const Register = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('copier')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.register({ name, email, password, role })
      toast.success('Registration successful! Please login to continue.')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-screen flex-wrap text-slate-800 min-h-screen">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col md:w-1/2 bg-white">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-violet-600">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
          <p className="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
            Create your <br />
            <span className="text-violet-600">account</span>
          </p>
          <p className="mt-6 text-center font-medium md:text-left">Start your copy trading journey today.</p>

          <form onSubmit={onSubmit} className="flex flex-col items-stretch pt-3 md:pt-8 space-y-4">
            <div className="flex flex-col">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-700 placeholder-gray-400 focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:outline-none transition-colors"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="flex flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-700 placeholder-gray-400 focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:outline-none transition-colors"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-700 placeholder-gray-400 focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:outline-none transition-colors"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex gap-6 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="copier"
                  checked={role === 'copier'}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-4 h-4 text-violet-600 focus:ring-violet-500 border-gray-300"
                />
                <span className="text-gray-700">Register as Copier</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="master"
                  checked={role === 'master'}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-4 h-4 text-violet-600 focus:ring-violet-500 border-gray-300"
                />
                <span className="text-gray-700">Register as Master</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-violet-600 px-4 py-3 text-center text-base font-semibold text-white shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all disabled:opacity-60 w-32"
            >
              {loading ? 'Creating...' : 'Sign up'}
            </button>
          </form>
          <div className="py-12 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="whitespace-nowrap font-semibold text-gray-900 underline underline-offset-4 hover:text-violet-600">
                Sign in here.
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Feature */}
      <div className="relative hidden h-screen select-none bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 md:block md:w-1/2">
        <div className="py-16 px-8 text-white xl:w-[40rem] mx-auto">
          <span className="rounded-full bg-white px-3 py-1 font-medium text-violet-600">Join Now</span>
          <p className="my-6 text-3xl font-semibold leading-10">
            Access global markets with <span className="whitespace-nowrap py-2 text-violet-200">OXO Markets</span>.
          </p>
          <p className="mb-4 text-violet-100">
            Create an account to start following top traders, manage your portfolio, and track your performance in real-time.
          </p>
          <a href="#" className="font-semibold tracking-wide text-white underline underline-offset-4 hover:text-violet-200">Learn More</a>
        </div>
        {/* Placeholder for image or illustration */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-10">
          <div className="w-3/4 h-64 bg-white/10 backdrop-blur-sm rounded-t-xl border-t border-l border-r border-white/20 shadow-2xl"></div>
        </div>
      </div>
    </div>
  )
}

export default Register
