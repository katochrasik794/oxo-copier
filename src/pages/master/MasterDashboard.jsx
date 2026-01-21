import React, { useState, useEffect } from 'react'
import StatCard from '../../components/master/StatCard'
import { AreaChart, BarChart, DonutChart } from '../../components/master/MiniChart'
import DataTablePro from '../../components/master/DataTablePro'
import DateRangeFilter from '../../components/master/DateRangeFilter'
import api from '../../utils/api'

const MasterDashboard = () => {
  const [earningsRange, setEarningsRange] = useState('1M')
  const [copiersRange, setCopiersRange] = useState('1M')
  const [profitRange, setProfitRange] = useState('1M')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUser = api.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])
  // Sample data for charts
  const earningsData = [1200, 1800, 1500, 2200, 1900, 2800, 2400, 3100, 2700, 3500, 3200, 3800]
  const earningsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const copiersData = [5, 8, 12, 10, 15, 18, 22, 20, 25, 28, 30, 35]
  const copiersLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthlyProfit = [4200, 5800, 3200, 7100, 6400, 8200, 5900, 9100]
  const profitLabels = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Recent copiers data
  const recentCopiers = [
    { id: 1, name: 'John Smith', login: '392847', equity: 15000, profit: 1250, status: 'Active', joined: '2024-12-01' },
    { id: 2, name: 'Sarah Wilson', login: '482916', equity: 25000, profit: 3200, status: 'Active', joined: '2024-11-28' },
    { id: 3, name: 'Mike Johnson', login: '571829', equity: 8500, profit: -450, status: 'Active', joined: '2024-11-25' },
    { id: 4, name: 'Emily Davis', login: '639182', equity: 42000, profit: 5800, status: 'Paused', joined: '2024-11-20' },
    { id: 5, name: 'Chris Brown', login: '728391', equity: 12000, profit: 890, status: 'Active', joined: '2024-11-15' },
  ]

  // Recent earnings data
  const recentEarnings = [
    { id: 1, copier: 'John Smith', trade: 'EURUSD Buy', profit: 320, commission: 32, date: '2024-12-10' },
    { id: 2, copier: 'Sarah Wilson', trade: 'GBPUSD Sell', profit: 580, commission: 58, date: '2024-12-10' },
    { id: 3, copier: 'Emily Davis', trade: 'XAUUSD Buy', profit: 1200, commission: 120, date: '2024-12-09' },
    { id: 4, copier: 'Chris Brown', trade: 'USDJPY Sell', profit: 180, commission: 18, date: '2024-12-09' },
    { id: 5, copier: 'Mike Johnson', trade: 'EURUSD Sell', profit: -150, commission: 0, date: '2024-12-08' },
  ]

    return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-violet-700 to-purple-800 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/5 rounded-full translate-y-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.name || 'Master'}!</h1>
          <p className="text-violet-200 text-sm">Here's an overview of your trading performance and copier statistics.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Copiers"
          value="35"
          subtitle="Following your trades"
          trend="+12.5%"
          trendUp={true}
          iconBg="bg-violet-100"
          icon={
            <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        <StatCard
          title="Total Earnings"
          value="$12,450"
          subtitle="This month"
          trend="+18.3%"
          trendUp={true}
          iconBg="bg-emerald-100"
          icon={
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Wallet Balance"
          value="$8,320"
          subtitle="Available to withdraw"
          trend="+5.2%"
          trendUp={true}
          iconBg="bg-blue-100"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          }
        />
        <StatCard
          title="Commission Rate"
          value="10%"
          subtitle="On profitable trades"
          iconBg="bg-amber-100"
          icon={
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Earnings Overview</h3>
              <p className="text-xs text-gray-500 mt-0.5">Monthly commission earnings</p>
            </div>
            <div className="flex items-center gap-3">
              <DateRangeFilter 
                value={earningsRange} 
                onChange={setEarningsRange}
                options={['1D', '1W', '1M', '1Y']}
              />
              <span className="text-sm font-bold text-emerald-600">+24.5%</span>
            </div>
          </div>
          <AreaChart 
            data={earningsData} 
            labels={earningsLabels}
            color="#8b5cf6" 
            gradientId="earningsGrad"
            prefix="$"
          />
        </div>

        {/* Performance Donut */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Win Rate</h3>
            <p className="text-xs text-gray-500 mt-0.5">Profitable trades percentage</p>
          </div>
          <div className="flex justify-center">
            <DonutChart 
              value={68} 
              max={100} 
              size={140}
              color="#8b5cf6" 
              label="68%"
              sublabel="Win Rate"
            />
          </div>
          <div className="mt-4 flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-violet-500"></span>
              <span className="text-gray-600">Wins: 156</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-200"></span>
              <span className="text-gray-600">Losses: 74</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Copiers Growth */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Copiers Growth</h3>
            </div>
            <DateRangeFilter 
              value={copiersRange} 
              onChange={setCopiersRange}
              options={['1W', '1M', '3M']}
            />
          </div>
          <AreaChart 
            data={copiersData} 
            labels={copiersLabels}
            color="#10b981" 
            gradientId="copiersGrad"
            prefix=""
          />
        </div>

        {/* Monthly Profit */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Monthly Profit</h3>
            </div>
            <DateRangeFilter 
              value={profitRange} 
              onChange={setProfitRange}
              options={['1W', '1M', '3M']}
            />
          </div>
          <BarChart 
            data={monthlyProfit} 
            labels={profitLabels}
            color="#8b5cf6"
            prefix="$"
          />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs text-gray-600">Total AUM</span>
              <span className="text-sm font-semibold text-gray-900">$124,500</span>
                </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs text-gray-600">Active Trades</span>
              <span className="text-sm font-semibold text-gray-900">23</span>
                </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs text-gray-600">Pending Withdrawals</span>
              <span className="text-sm font-semibold text-amber-600">$1,200</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-gray-600">Total Withdrawn</span>
              <span className="text-sm font-semibold text-emerald-600">$45,800</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Copiers */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Recent Copiers</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Equity</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Profit</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCopiers.slice(0, 5).map((copier) => (
                  <tr key={copier.id} className="border-b border-gray-50 hover:bg-violet-50/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 aspect-square">
                          {copier.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-xs truncate">{copier.name}</p>
                          <p className="text-xs text-gray-500">#{copier.login}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-700">${copier.equity.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-semibold ${copier.profit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {copier.profit >= 0 ? '+' : ''}${copier.profit.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        copier.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {copier.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Earnings */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Recent Commissions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Copier</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Trade</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Profit</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Commission</th>
                </tr>
              </thead>
              <tbody>
                {recentEarnings.map((earning) => (
                  <tr key={earning.id} className="border-b border-gray-50 hover:bg-violet-50/30">
                    <td className="py-3 px-4 text-xs font-medium text-gray-900">{earning.copier}</td>
                    <td className="py-3 px-4 text-xs text-gray-600">{earning.trade}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-semibold ${earning.profit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {earning.profit >= 0 ? '+' : ''}${Math.abs(earning.profit)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-semibold text-violet-600">
                        ${earning.commission}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
            </div>
        </div>
    )
}

export default MasterDashboard
