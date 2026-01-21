import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../../components/social/DataTable'

const CopierDashboard = () => {
  const [activeTab, setActiveTab] = useState('subscriptions')

  // Mock data for subscriptions
  const [subscriptions] = useState([
    {
      id: 1,
      masterName: 'Alex Trading',
      masterAvatar: 'https://ui-avatars.com/api/?name=Alex+Trading&background=7C3AED&color=fff',
      status: 'active',
      startDate: '2024-10-15',
      totalProfit: 1245.50,
      profitPercent: 12.5,
      copiedTrades: 145,
      winRate: 68.5,
      allocation: 'Proportional',
      multiplier: 1.0,
    },
    {
      id: 2,
      masterName: 'Pro Trader FX',
      masterAvatar: 'https://ui-avatars.com/api/?name=Pro+Trader&background=10B981&color=fff',
      status: 'active',
      startDate: '2024-11-01',
      totalProfit: 856.20,
      profitPercent: 8.6,
      copiedTrades: 89,
      winRate: 72.3,
      allocation: 'Fixed Lot',
      multiplier: 0.5,
    },
    {
      id: 3,
      masterName: 'Crypto Master',
      masterAvatar: 'https://ui-avatars.com/api/?name=Crypto+Master&background=F59E0B&color=fff',
      status: 'paused',
      startDate: '2024-09-20',
      totalProfit: -120.80,
      profitPercent: -2.4,
      copiedTrades: 45,
      winRate: 48.9,
      allocation: 'Ratio',
      multiplier: 2.0,
    },
  ])

  // Mock active positions
  const [positions] = useState([
    { id: 1, symbol: 'EUR/USD', type: 'Buy', volume: 0.5, openPrice: 1.0865, currentPrice: 1.0892, profit: 135.00, masterName: 'Alex Trading', openTime: '2024-12-10 09:30:00' },
    { id: 2, symbol: 'GBP/JPY', type: 'Sell', volume: 0.3, openPrice: 188.45, currentPrice: 188.12, profit: 99.00, masterName: 'Alex Trading', openTime: '2024-12-10 10:15:00' },
    { id: 3, symbol: 'XAU/USD', type: 'Buy', volume: 0.1, openPrice: 2045.50, currentPrice: 2048.30, profit: 28.00, masterName: 'Pro Trader FX', openTime: '2024-12-10 11:00:00' },
  ])

  // Stats
  const stats = {
    totalProfit: subscriptions.reduce((acc, s) => acc + s.totalProfit, 0),
    activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
    openPositions: positions.length,
    totalCopiedTrades: subscriptions.reduce((acc, s) => acc + s.copiedTrades, 0),
    avgWinRate: (subscriptions.reduce((acc, s) => acc + s.winRate, 0) / subscriptions.length).toFixed(1),
  }

  const subscriptionColumns = [
    {
      header: 'Master',
      accessor: 'masterName',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.masterAvatar} alt={row.masterName} className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-medium text-gray-900">{row.masterName}</div>
            <div className="text-xs text-gray-500">Since {row.startDate}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      align: 'center',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Profit',
      accessor: 'totalProfit',
      align: 'center',
      sortType: 'number',
      hideOnMobile: true,
      render: (row) => (
        <div>
          <div className={`font-semibold ${row.totalProfit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {row.totalProfit >= 0 ? '+' : ''}${row.totalProfit.toFixed(2)}
          </div>
          <div className={`text-xs ${row.profitPercent >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {row.profitPercent >= 0 ? '+' : ''}{row.profitPercent}%
          </div>
        </div>
      )
    },
    {
      header: 'Win Rate',
      accessor: 'winRate',
      align: 'center',
      sortType: 'number',
      hideOnMobile: true,
      render: (row) => <span className="font-medium text-gray-900">{row.winRate}%</span>
    },
    {
      header: 'Trades',
      accessor: 'copiedTrades',
      align: 'center',
      sortType: 'number',
      hideOnTablet: true,
      render: (row) => <span className="text-gray-700">{row.copiedTrades}</span>
    },
    {
      header: 'Allocation',
      accessor: 'allocation',
      align: 'center',
      hideOnTablet: true,
      render: (row) => <span className="text-sm text-gray-600">{row.allocation} ({row.multiplier}x)</span>
    },
    {
      header: 'Actions',
      accessor: 'actions',
      align: 'center',
      sortable: false,
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors" title="Settings">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          {row.status === 'active' ? (
            <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Pause">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          ) : (
            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Resume">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Unsubscribe">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )
    },
  ]

  const positionColumns = [
    {
      header: 'Symbol',
      accessor: 'symbol',
      render: (row) => (
        <div>
          <div className="font-semibold text-gray-900">{row.symbol}</div>
          <div className="text-xs text-gray-500">{row.openTime}</div>
        </div>
      )
    },
    {
      header: 'Type',
      accessor: 'type',
      align: 'center',
      render: (row) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
          row.type === 'Buy' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${row.type === 'Buy' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
          {row.type}
        </span>
      )
    },
    {
      header: 'Volume',
      accessor: 'volume',
      align: 'center',
      hideOnMobile: true,
      render: (row) => <span className="font-medium text-gray-900">{row.volume}</span>
    },
    {
      header: 'Open Price',
      accessor: 'openPrice',
      align: 'center',
      hideOnMobile: true,
      render: (row) => <span className="text-gray-700">{row.openPrice}</span>
    },
    {
      header: 'Current',
      accessor: 'currentPrice',
      align: 'center',
      hideOnMobile: true,
      render: (row) => <span className="text-gray-900 font-medium">{row.currentPrice}</span>
    },
    {
      header: 'Profit',
      accessor: 'profit',
      align: 'center',
      sortType: 'number',
      render: (row) => (
        <span className={`font-bold ${row.profit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {row.profit >= 0 ? '+' : ''}${row.profit.toFixed(2)}
        </span>
      )
    },
    {
      header: 'Master',
      accessor: 'masterName',
      align: 'center',
      hideOnTablet: true,
      render: (row) => <span className="text-sm text-gray-600">{row.masterName}</span>
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Copier Area</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your copy trading subscriptions and positions</p>
        </div>
        <Link
          to="/social"
          className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Find Traders
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Profit" value={`$${stats.totalProfit.toFixed(2)}`} valueColor={stats.totalProfit >= 0 ? 'text-emerald-600' : 'text-red-500'} iconBg="bg-emerald-100 text-emerald-600" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <StatCard title="Active Subscriptions" value={stats.activeSubscriptions} iconBg="bg-violet-100 text-violet-600" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
        <StatCard title="Open Positions" value={stats.openPositions} iconBg="bg-blue-100 text-blue-600" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
        <StatCard title="Total Trades" value={stats.totalCopiedTrades} iconBg="bg-amber-100 text-amber-600" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} />
        <StatCard title="Avg Win Rate" value={`${stats.avgWinRate}%`} iconBg="bg-teal-100 text-teal-600" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        <TabButton active={activeTab === 'subscriptions'} onClick={() => setActiveTab('subscriptions')} label="My Subscriptions" count={subscriptions.length} />
        <TabButton active={activeTab === 'positions'} onClick={() => setActiveTab('positions')} label="Open Positions" count={positions.length} />
      </div>

      {/* Tables */}
      {activeTab === 'subscriptions' && (
        <DataTable
          columns={subscriptionColumns}
          data={subscriptions}
          searchable={true}
          searchPlaceholder="Search subscriptions..."
          pagination={true}
          pageSize={10}
          emptyMessage="No subscriptions yet"
        />
      )}

      {activeTab === 'positions' && (
        <DataTable
          columns={positionColumns}
          data={positions}
          searchable={true}
          searchPlaceholder="Search positions..."
          pagination={true}
          pageSize={10}
          emptyMessage="No open positions"
        />
      )}
    </div>
  )
}

// Stat Card Component
const StatCard = ({ title, value, valueColor = 'text-gray-900', icon, iconBg }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-xl font-bold mt-1 ${valueColor}`}>{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>{icon}</div>
    </div>
  </div>
)

// Tab Button
const TabButton = ({ active, onClick, label, count }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
    {label}
    <span className={`px-2 py-0.5 rounded-full text-xs ${active ? 'bg-violet-100 text-violet-800' : 'bg-gray-200 text-gray-600'}`}>{count}</span>
  </button>
)

// Status Badge
const StatusBadge = ({ status }) => {
  const styles = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    paused: 'bg-amber-100 text-amber-700 border-amber-200',
    stopped: 'bg-red-100 text-red-700 border-red-200',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-emerald-500' : status === 'paused' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default CopierDashboard
