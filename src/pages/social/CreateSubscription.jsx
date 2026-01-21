import React, { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import api from "../../utils/api"
import { useToast } from "../../components/ui/Toast"

const CreateSubscription = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [form, setForm] = useState({
    login: "",
    password: "",
    allocationMethod: "equity_ratio",
    multiplier: "1",
    agree: false,
    showPass: false,
  })

  const [trader, setTrader] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchMaster = async () => {
      try {
        const user = await api.getUser(id)
        if (user) {
          setTrader({
            id: user.id,
            name: user.name,
            strategy: "Multi-Asset Strategy",
            avatar: "https://ui-avatars.com/api/?name=" + user.name + "&background=7C3AED&color=fff",
            returnPct: (Math.random() * 100 + 20).toFixed(1),
            winRate: (Math.random() * 25 + 60).toFixed(1),
            performanceFee: Math.floor(Math.random() * 20 + 10),
            volumeFee: (Math.random() * 2).toFixed(1),
            followers: Math.floor(Math.random() * 300 + 50),
          })
        }
      } catch (error) {
        console.error("Failed to fetch master", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMaster()
  }, [id])

  const allocationMethods = [
    { value: 'balance', label: 'Proportionally to Balance' },
    { value: 'equity', label: 'Proportionally to Equity' },
    { value: 'balance_ratio', label: 'Balance x Ratio' },
    { value: 'equity_ratio', label: 'Equity x Ratio' },
    { value: 'fixed_lot', label: 'Fixed Lot' },
    { value: 'ratio_multiplier', label: 'Ratio Multiplier' },
  ]

  const onSubmit = async (e) => {
    e.preventDefault()
    
    if (!form.login || !form.password) {
      showToast('Please enter your account credentials', 'error')
      return
    }
    
    if (!form.agree) {
      showToast('Please agree to the terms and conditions', 'error')
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      showToast(`Successfully subscribed to ${trader.name}!`, 'success')
      navigate('/social/copier')
    }, 1500)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-200 border-t-violet-600"></div>
      </div>
    )
  }

  if (!trader) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Trader Not Found</h2>
        <Link to="/social" className="text-violet-600 hover:text-violet-700 font-medium">Back to Leaderboard</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/social" className="text-gray-500 hover:text-violet-600">Leaderboard</Link>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link to={`/social/trader/${id}`} className="text-gray-500 hover:text-violet-600">{trader.name}</Link>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">Subscribe</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900">Create Subscription</h1>
              <p className="text-gray-500 text-sm mt-1">Enter your trading account details to start copying</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Server Info */}
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
                <span className="text-sm text-gray-600">Server: <span className="font-semibold text-gray-900">MT5</span></span>
              </div>

              {/* Login */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">MT5 Login</label>
                <input
                  type="text"
                  value={form.login}
                  onChange={(e) => setForm({ ...form, login: e.target.value })}
                  placeholder="Enter your MT5 login"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">MT5 Password</label>
                <div className="relative">
                  <input
                    type={form.showPass ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter your MT5 password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, showPass: !form.showPass })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    {form.showPass ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Allocation Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allocation Method</label>
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-9">
                    <select
                      value={form.allocationMethod}
                      onChange={(e) => setForm({ ...form, allocationMethod: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-white appearance-none"
                    >
                      {allocationMethods.map((method) => (
                        <option key={method.value} value={method.value}>{method.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      value={form.multiplier}
                      onChange={(e) => setForm({ ...form, multiplier: e.target.value })}
                      min="0.1"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-center"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {form.allocationMethod === 'equity_ratio' && 'Trades will be copied proportionally based on your equity multiplied by the ratio'}
                  {form.allocationMethod === 'balance' && 'Trades will be copied proportionally based on your balance'}
                  {form.allocationMethod === 'equity' && 'Trades will be copied proportionally based on your equity'}
                  {form.allocationMethod === 'balance_ratio' && 'Trades will be copied based on your balance multiplied by the ratio'}
                  {form.allocationMethod === 'fixed_lot' && 'All trades will be copied with a fixed lot size'}
                  {form.allocationMethod === 'ratio_multiplier' && 'Master\'s lot size will be multiplied by the ratio'}
                </p>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                  className="mt-0.5 w-5 h-5 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
                <span className="text-sm text-gray-700">
                  I acknowledge and agree to the <a href="#" className="text-violet-600 hover:underline">terms and conditions</a> of using the copy trading service. I understand the risks involved in copy trading.
                </span>
              </label>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate(`/social/trader/${id}`)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!form.agree || submitting}
                  className="flex-1 px-4 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Subscribe
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Trader Info Sidebar */}
        <div className="lg:col-span-2 space-y-4">
          {/* Master Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Master Account</h3>
            
            <div className="flex items-center gap-3 mb-4">
              <img src={trader.avatar} alt={trader.name} className="w-12 h-12 rounded-full" />
              <div>
                <Link to={`/social/trader/${id}`} className="font-semibold text-violet-600 hover:underline">
                  {trader.name}
                </Link>
                <p className="text-sm text-gray-500">{trader.strategy}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-emerald-600">+{trader.returnPct}%</p>
                <p className="text-xs text-gray-500">Return</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-gray-900">{trader.winRate}%</p>
                <p className="text-xs text-gray-500">Win Rate</p>
              </div>
            </div>
          </div>

          {/* Fees Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Fees</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Performance Fee</p>
                  <p className="text-xs text-gray-500">% from net profit</p>
                </div>
                <p className="text-lg font-bold text-violet-600">{trader.performanceFee}%</p>
              </div>
              <div className="border-t border-gray-100"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Volume Fee</p>
                  <p className="text-xs text-gray-500">USD per lot</p>
                </div>
                <p className="text-lg font-bold text-gray-900">${trader.volumeFee}</p>
              </div>
              <div className="border-t border-gray-100"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Joining Fee</p>
                  <p className="text-xs text-gray-500">One-time</p>
                </div>
                <p className="text-lg font-bold text-emerald-600">Free</p>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-violet-50 rounded-xl border border-violet-200 p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-violet-800">
                <p className="font-semibold mb-1">Copy Trading Notice</p>
                <p>Past performance is not indicative of future results. Only invest what you can afford to lose.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateSubscription
