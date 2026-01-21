import React, { useState, useMemo } from 'react'
import StatCard from '../../components/master/StatCard'
import DataTablePro from '../../components/master/DataTablePro'
import { AreaChart } from '../../components/master/MiniChart'
import DateRangeFilter from '../../components/master/DateRangeFilter'

const WithdrawalReport = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [chartRange, setChartRange] = useState('1Y')

  // Sample withdrawal data
  const allWithdrawals = [
    { id: 1, date: '2024-12-10', amount: 2500, method: 'MT5 Transfer', destination: 'MT5-892734', status: 'Pending', processedDate: null, fee: 0 },
    { id: 2, date: '2024-12-08', amount: 5000, method: 'Bank Wire', destination: '**** 4521', status: 'Completed', processedDate: '2024-12-09', fee: 25 },
    { id: 3, date: '2024-12-05', amount: 1800, method: 'MT5 Transfer', destination: 'MT5-738291', status: 'Completed', processedDate: '2024-12-05', fee: 0 },
    { id: 4, date: '2024-12-01', amount: 3200, method: 'Bank Wire', destination: '**** 4521', status: 'Completed', processedDate: '2024-12-02', fee: 25 },
    { id: 5, date: '2024-11-28', amount: 1500, method: 'Crypto (USDT)', destination: 'TRC20...8f2d', status: 'Completed', processedDate: '2024-11-28', fee: 5 },
    { id: 6, date: '2024-11-25', amount: 4200, method: 'MT5 Transfer', destination: 'MT5-482916', status: 'Completed', processedDate: '2024-11-25', fee: 0 },
    { id: 7, date: '2024-11-20', amount: 2800, method: 'Bank Wire', destination: '**** 7832', status: 'Rejected', processedDate: null, fee: 0 },
    { id: 8, date: '2024-11-15', amount: 6500, method: 'Bank Wire', destination: '**** 4521', status: 'Completed', processedDate: '2024-11-16', fee: 25 },
    { id: 9, date: '2024-11-10', amount: 1200, method: 'MT5 Transfer', destination: 'MT5-571829', status: 'Completed', processedDate: '2024-11-10', fee: 0 },
    { id: 10, date: '2024-11-05', amount: 3800, method: 'Crypto (USDT)', destination: 'TRC20...4a1b', status: 'Completed', processedDate: '2024-11-05', fee: 8 },
    { id: 11, date: '2024-10-28', amount: 2200, method: 'Bank Wire', destination: '**** 4521', status: 'Completed', processedDate: '2024-10-29', fee: 25 },
    { id: 12, date: '2024-10-20', amount: 4500, method: 'MT5 Transfer', destination: 'MT5-293847', status: 'Completed', processedDate: '2024-10-20', fee: 0 },
  ]

  // Filter withdrawals
  const filteredWithdrawals = useMemo(() => {
    let data = [...allWithdrawals]
    if (statusFilter !== 'all') {
      data = data.filter(w => w.status.toLowerCase() === statusFilter)
    }
    return data
  }, [statusFilter])

  // Calculate stats
  const totalWithdrawn = filteredWithdrawals.filter(w => w.status === 'Completed').reduce((sum, w) => sum + w.amount, 0)
  const pendingAmount = filteredWithdrawals.filter(w => w.status === 'Pending').reduce((sum, w) => sum + w.amount, 0)
  const totalFees = filteredWithdrawals.filter(w => w.status === 'Completed').reduce((sum, w) => sum + w.fee, 0)
  const completedCount = filteredWithdrawals.filter(w => w.status === 'Completed').length

  // Chart data
  const withdrawalTrend = [2200, 4500, 3800, 1200, 6500, 4200, 1500, 3200, 1800, 5000, 2500]
  const withdrawalLabels = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (val) => (
        <span className="text-gray-900 font-medium">{val}</span>
      )
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (val) => (
        <span className="text-lg font-bold text-gray-900">${val.toLocaleString()}</span>
      )
    },
    {
      key: 'method',
      label: 'Method',
      render: (val) => {
        let icon, bgColor
        switch(val) {
          case 'MT5 Transfer':
            icon = (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            )
            bgColor = 'bg-blue-100 text-blue-700'
            break
          case 'Bank Wire':
            icon = (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            )
            bgColor = 'bg-violet-100 text-violet-700'
            break
          default:
            icon = (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )
            bgColor = 'bg-amber-100 text-amber-700'
        }
        return (
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${bgColor}`}>
            {icon}
            <span className="text-xs font-medium">{val}</span>
          </div>
        )
      }
    },
    {
      key: 'destination',
      label: 'Destination',
      render: (val) => (
        <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{val}</span>
      )
    },
    {
      key: 'fee',
      label: 'Fee',
      render: (val) => (
        <span className={`text-sm ${val > 0 ? 'text-red-500' : 'text-gray-400'}`}>
          {val > 0 ? `-$${val}` : 'Free'}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => {
        let cls = 'bg-gray-100 text-gray-700 border-gray-200'
        if (val === 'Completed') cls = 'bg-emerald-100 text-emerald-700 border-emerald-200'
        else if (val === 'Pending') cls = 'bg-amber-100 text-amber-700 border-amber-200'
        else if (val === 'Rejected') cls = 'bg-red-100 text-red-700 border-red-200'
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${cls}`}>
            {val}
          </span>
        )
      }
    },
    {
      key: 'processedDate',
      label: 'Processed',
      render: (val) => (
        <span className="text-sm text-gray-600">{val || '—'}</span>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Withdrawal Report</h1>
          <p className="text-sm text-gray-500 mt-1">Track all your withdrawal requests and history</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Withdrawn"
          value={`$${totalWithdrawn.toLocaleString()}`}
          subtitle="All time"
          trend="+8.2%"
          trendUp={true}
          iconBg="bg-emerald-100"
          icon={
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Pending"
          value={`$${pendingAmount.toLocaleString()}`}
          subtitle="Awaiting processing"
          iconBg="bg-amber-100"
          icon={
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Total Fees"
          value={`$${totalFees}`}
          subtitle="Processing fees paid"
          iconBg="bg-red-100"
          icon={
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Completed"
          value={completedCount}
          subtitle="Successful withdrawals"
          iconBg="bg-violet-100"
          icon={
            <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          }
        />
      </div>

      {/* Chart and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Withdrawal Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Withdrawal Trend</h3>
              <p className="text-xs text-gray-500 mt-0.5">Amount withdrawn over time</p>
            </div>
            <div className="flex items-center gap-3">
              <DateRangeFilter 
                value={chartRange} 
                onChange={setChartRange}
                options={['1M', '3M', '6M', '1Y']}
              />
              <span className="text-sm font-bold text-emerald-600">$36,700</span>
            </div>
          </div>
          <AreaChart 
            data={withdrawalTrend} 
            labels={withdrawalLabels}
            color="#8b5cf6" 
            gradientId="withdrawGrad"
            prefix="$"
          />
        </div>

        {/* Method Breakdown */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">By Method</h3>
          <div className="space-y-4">
            {[
              { method: 'MT5 Transfer', amount: 14200, count: 5, color: 'bg-blue-500' },
              { method: 'Bank Wire', amount: 17200, count: 4, color: 'bg-violet-500' },
              { method: 'Crypto (USDT)', amount: 5300, count: 2, color: 'bg-amber-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-700">{item.method}</span>
                  <span className="text-sm font-semibold text-gray-900">${item.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full`} 
                      style={{ width: `${(item.amount / 36700) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Transactions</span>
              <span className="font-bold text-gray-900">11</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Avg. Amount</span>
              <span className="font-bold text-gray-900">$3,336</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Completed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Pending
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Rejected
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            {allWithdrawals.slice(0, 5).map((withdrawal) => (
              <div key={withdrawal.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-violet-50/50 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  withdrawal.status === 'Completed' ? 'bg-emerald-100' :
                  withdrawal.status === 'Pending' ? 'bg-amber-100' : 'bg-red-100'
                }`}>
                  <svg className={`w-5 h-5 ${
                    withdrawal.status === 'Completed' ? 'text-emerald-600' :
                    withdrawal.status === 'Pending' ? 'text-amber-600' : 'text-red-600'
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {withdrawal.status === 'Completed' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : withdrawal.status === 'Pending' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    )}
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">${withdrawal.amount.toLocaleString()}</span>
                    <span className="text-xs text-gray-500">{withdrawal.date}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-gray-500">{withdrawal.method} → {withdrawal.destination}</span>
                    <span className={`text-xs font-medium ${
                      withdrawal.status === 'Completed' ? 'text-emerald-600' :
                      withdrawal.status === 'Pending' ? 'text-amber-600' : 'text-red-600'
                    }`}>{withdrawal.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Table */}
      <DataTablePro
        title="All Withdrawals"
        columns={columns}
        data={filteredWithdrawals}
        searchableKeys={['method', 'destination', 'status']}
        initialSort={{ key: 'date', dir: 'desc' }}
        showExport={true}
      />
    </div>
  )
}

export default WithdrawalReport

