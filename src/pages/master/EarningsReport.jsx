import React, { useState, useMemo } from 'react'
import StatCard from '../../components/master/StatCard'
import DataTablePro from '../../components/master/DataTablePro'
import { AreaChart, BarChart } from '../../components/master/MiniChart'
import DateRangeFilter from '../../components/master/DateRangeFilter'

const EarningsReport = () => {
  const [dateRange, setDateRange] = useState('30days')
  const [selectedCopier, setSelectedCopier] = useState('all')
  const [dailyRange, setDailyRange] = useState('1W')
  const [monthlyRange, setMonthlyRange] = useState('1Y')

  // Sample earnings data
  const allEarnings = [
    { id: 1, date: '2024-12-10', copier: 'John Smith', login: '392847', trade: 'EURUSD', action: 'Buy', lots: 0.5, profit: 320, commission: 32, status: 'Completed' },
    { id: 2, date: '2024-12-10', copier: 'Sarah Wilson', login: '482916', trade: 'GBPUSD', action: 'Sell', lots: 1.2, profit: 580, commission: 58, status: 'Completed' },
    { id: 3, date: '2024-12-09', copier: 'Emily Davis', login: '639182', trade: 'XAUUSD', action: 'Buy', lots: 0.8, profit: 1200, commission: 144, status: 'Completed' },
    { id: 4, date: '2024-12-09', copier: 'Chris Brown', login: '728391', trade: 'USDJPY', action: 'Sell', lots: 0.3, profit: 180, commission: 16, status: 'Completed' },
    { id: 5, date: '2024-12-08', copier: 'Mike Johnson', login: '571829', trade: 'EURUSD', action: 'Sell', lots: 0.4, profit: -150, commission: 0, status: 'Loss' },
    { id: 6, date: '2024-12-08', copier: 'Robert Garcia', login: '293847', trade: 'GBPJPY', action: 'Buy', lots: 2.0, profit: 2400, commission: 360, status: 'Completed' },
    { id: 7, date: '2024-12-07', copier: 'Lisa Anderson', login: '837291', trade: 'AUDUSD', action: 'Buy', lots: 0.6, profit: 420, commission: 50, status: 'Completed' },
    { id: 8, date: '2024-12-07', copier: 'David Miller', login: '918273', trade: 'NZDUSD', action: 'Sell', lots: 0.9, profit: 680, commission: 82, status: 'Completed' },
    { id: 9, date: '2024-12-06', copier: 'Jennifer Taylor', login: '102938', trade: 'USDCAD', action: 'Buy', lots: 0.4, profit: -220, commission: 0, status: 'Loss' },
    { id: 10, date: '2024-12-06', copier: 'Amanda Martinez', login: '384756', trade: 'EURJPY', action: 'Sell', lots: 1.1, profit: 890, commission: 89, status: 'Completed' },
    { id: 11, date: '2024-12-05', copier: 'John Smith', login: '392847', trade: 'GBPUSD', action: 'Buy', lots: 0.7, profit: 540, commission: 54, status: 'Completed' },
    { id: 12, date: '2024-12-05', copier: 'Sarah Wilson', login: '482916', trade: 'XAUUSD', action: 'Sell', lots: 1.5, profit: 1800, commission: 180, status: 'Completed' },
    { id: 13, date: '2024-12-04', copier: 'Emily Davis', login: '639182', trade: 'EURUSD', action: 'Buy', lots: 0.6, profit: 280, commission: 34, status: 'Completed' },
    { id: 14, date: '2024-12-04', copier: 'Chris Brown', login: '728391', trade: 'USDJPY', action: 'Buy', lots: 0.5, profit: 350, commission: 32, status: 'Completed' },
    { id: 15, date: '2024-12-03', copier: 'Robert Garcia', login: '293847', trade: 'GBPUSD', action: 'Sell', lots: 1.8, profit: 1650, commission: 248, status: 'Completed' },
  ]

  // Get unique copiers for filter
  const uniqueCopiers = [...new Set(allEarnings.map(e => e.copier))]

  // Filter earnings
  const filteredEarnings = useMemo(() => {
    let data = [...allEarnings]
    if (selectedCopier !== 'all') {
      data = data.filter(e => e.copier === selectedCopier)
    }
    return data
  }, [selectedCopier])

  // Calculate stats
  const totalCommission = filteredEarnings.reduce((sum, e) => sum + e.commission, 0)
  const totalProfit = filteredEarnings.reduce((sum, e) => sum + e.profit, 0)
  const profitableTrades = filteredEarnings.filter(e => e.profit > 0).length
  const avgCommission = filteredEarnings.length > 0 ? totalCommission / filteredEarnings.filter(e => e.commission > 0).length : 0

  // Chart data
  const dailyCommissions = [320, 580, 450, 890, 1200, 780, 950, 1100, 680, 420]
  const dailyLabels = ['Dec 1', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5', 'Dec 6', 'Dec 7', 'Dec 8', 'Dec 9', 'Dec 10']
  const monthlyEarnings = [2800, 3500, 4200, 3800, 5100, 4600, 5800, 4900, 6200, 5500, 7100, 6800]
  const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (val) => (
        <span className="text-gray-900 font-medium">{val}</span>
      )
    },
    {
      key: 'copier',
      label: 'Copier',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 aspect-square">
            {val.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 text-xs truncate">{val}</p>
            <p className="text-xs text-gray-500">#{row.login}</p>
          </div>
        </div>
      )
    },
    {
      key: 'trade',
      label: 'Symbol',
      render: (val) => (
        <span className="font-medium text-gray-900">{val}</span>
      )
    },
    {
      key: 'action',
      label: 'Action',
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          val === 'Buy' 
            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {val}
        </span>
      )
    },
    {
      key: 'lots',
      label: 'Lots',
      render: (val) => (
        <span className="text-gray-700">{val}</span>
      )
    },
    {
      key: 'profit',
      label: 'Trade Profit',
      render: (val) => (
        <span className={`font-semibold ${val >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {val >= 0 ? '+' : ''}${val.toLocaleString()}
        </span>
      )
    },
    {
      key: 'commission',
      label: 'Your Commission',
      render: (val) => (
        <span className={`font-bold ${val > 0 ? 'text-violet-600' : 'text-gray-400'}`}>
          ${val.toLocaleString()}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Earnings Report</h1>
          <p className="text-sm text-gray-500 mt-1">Track your commission earnings from copy trades</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Date Range Filter */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          
          {/* Copier Filter */}
          <select
            value={selectedCopier}
            onChange={(e) => setSelectedCopier(e.target.value)}
            className="h-10 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="all">All Copiers</option>
            {uniqueCopiers.map(copier => (
              <option key={copier} value={copier}>{copier}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Commission"
          value={`$${totalCommission.toLocaleString()}`}
          subtitle="From all trades"
          trend="+18.3%"
          trendUp={true}
          iconBg="bg-violet-100"
          icon={
            <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Copiers Profit"
          value={`$${totalProfit.toLocaleString()}`}
          subtitle="Total generated profit"
          trend="+24.5%"
          trendUp={true}
          iconBg="bg-emerald-100"
          icon={
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <StatCard
          title="Profitable Trades"
          value={profitableTrades}
          subtitle={`Out of ${filteredEarnings.length} total`}
          iconBg="bg-blue-100"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Avg Commission"
          value={`$${avgCommission.toFixed(2)}`}
          subtitle="Per profitable trade"
          iconBg="bg-amber-100"
          icon={
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Commission Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Daily Commissions</h3>
              <p className="text-xs text-gray-500 mt-0.5">Commission earned per day</p>
            </div>
            <div className="flex items-center gap-3">
              <DateRangeFilter 
                value={dailyRange} 
                onChange={setDailyRange}
                options={['1D', '1W', '1M']}
              />
              <span className="text-sm font-bold text-emerald-600">+12.4%</span>
            </div>
          </div>
          <AreaChart 
            data={dailyCommissions} 
            labels={dailyLabels}
            color="#8b5cf6" 
            gradientId="dailyCommGrad"
            prefix="$"
          />
        </div>

        {/* Monthly Earnings Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Monthly Earnings</h3>
              <p className="text-xs text-gray-500 mt-0.5">Total earnings per month</p>
            </div>
            <div className="flex items-center gap-3">
              <DateRangeFilter 
                value={monthlyRange} 
                onChange={setMonthlyRange}
                options={['3M', '6M', '1Y']}
              />
              <span className="text-sm font-bold text-emerald-600">+28.7%</span>
            </div>
          </div>
          <BarChart 
            data={monthlyEarnings} 
            labels={monthlyLabels}
            color="#8b5cf6"
            prefix="$"
          />
        </div>
      </div>

      {/* Top Earners */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Top Earning Copiers</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Robert Garcia', commission: 608, trades: 4 },
              { name: 'Sarah Wilson', commission: 238, trades: 3 },
              { name: 'Emily Davis', commission: 178, trades: 2 },
              { name: 'Amanda Martinez', commission: 89, trades: 1 },
            ].map((copier, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-semibold shadow-lg">
                  {copier.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{copier.name}</p>
                  <p className="text-xs text-gray-500">{copier.trades} trades</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-violet-600">${copier.commission}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Earnings Table */}
      <DataTablePro
        title="Commission History"
        columns={columns}
        data={filteredEarnings}
        searchableKeys={['copier', 'login', 'trade', 'status']}
        initialSort={{ key: 'date', dir: 'desc' }}
        showExport={true}
      />
    </div>
  )
}

export default EarningsReport

