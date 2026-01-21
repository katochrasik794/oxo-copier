import React, { useState } from 'react'
import StatCard from '../../components/master/StatCard'
import DataTablePro from '../../components/master/DataTablePro'
import Modal from '../../components/master/Modal'
import { Sparkline } from '../../components/master/MiniChart'

const FollowedCopiers = () => {
  const [selectedCopier, setSelectedCopier] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Sample copiers data
  const copiers = [
    { 
      id: 1, 
      name: 'John Smith', 
      login: '392847', 
      email: 'john@example.com',
      equity: 15000, 
      balance: 14500,
      profit: 1250, 
      profitPercent: 8.62,
      lots: 2.5,
      openTrades: 3,
      status: 'Active', 
      joined: '2024-12-01',
      lastActivity: '2 hours ago',
      performance: [100, 120, 115, 140, 135, 160, 155, 180]
    },
    { 
      id: 2, 
      name: 'Sarah Wilson', 
      login: '482916', 
      email: 'sarah@example.com',
      equity: 25000, 
      balance: 24200,
      profit: 3200, 
      profitPercent: 13.22,
      lots: 4.2,
      openTrades: 5,
      status: 'Active', 
      joined: '2024-11-28',
      lastActivity: '30 minutes ago',
      performance: [200, 220, 240, 230, 260, 280, 290, 320]
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      login: '571829', 
      email: 'mike@example.com',
      equity: 8500, 
      balance: 8800,
      profit: -450, 
      profitPercent: -5.11,
      lots: 1.2,
      openTrades: 2,
      status: 'Active', 
      joined: '2024-11-25',
      lastActivity: '1 hour ago',
      performance: [90, 85, 88, 82, 80, 78, 75, 85]
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      login: '639182', 
      email: 'emily@example.com',
      equity: 42000, 
      balance: 40500,
      profit: 5800, 
      profitPercent: 14.32,
      lots: 6.8,
      openTrades: 8,
      status: 'Paused', 
      joined: '2024-11-20',
      lastActivity: '3 days ago',
      performance: [400, 420, 450, 480, 510, 540, 560, 580]
    },
    { 
      id: 5, 
      name: 'Chris Brown', 
      login: '728391', 
      email: 'chris@example.com',
      equity: 12000, 
      balance: 11800,
      profit: 890, 
      profitPercent: 7.54,
      lots: 2.1,
      openTrades: 4,
      status: 'Active', 
      joined: '2024-11-15',
      lastActivity: '5 hours ago',
      performance: [110, 115, 120, 118, 125, 130, 128, 139]
    },
    { 
      id: 6, 
      name: 'Lisa Anderson', 
      login: '837291', 
      email: 'lisa@example.com',
      equity: 18500, 
      balance: 18000,
      profit: 2100, 
      profitPercent: 11.67,
      lots: 3.2,
      openTrades: 4,
      status: 'Active', 
      joined: '2024-11-10',
      lastActivity: '1 hour ago',
      performance: [170, 175, 185, 190, 195, 200, 205, 210]
    },
    { 
      id: 7, 
      name: 'David Miller', 
      login: '918273', 
      email: 'david@example.com',
      equity: 32000, 
      balance: 31500,
      profit: 4200, 
      profitPercent: 13.33,
      lots: 5.5,
      openTrades: 6,
      status: 'Active', 
      joined: '2024-11-05',
      lastActivity: '45 minutes ago',
      performance: [300, 310, 330, 350, 370, 390, 410, 420]
    },
    { 
      id: 8, 
      name: 'Jennifer Taylor', 
      login: '102938', 
      email: 'jennifer@example.com',
      equity: 9800, 
      balance: 10200,
      profit: -320, 
      profitPercent: -3.14,
      lots: 1.5,
      openTrades: 2,
      status: 'Active', 
      joined: '2024-10-28',
      lastActivity: '4 hours ago',
      performance: [100, 98, 95, 97, 94, 96, 93, 98]
    },
    { 
      id: 9, 
      name: 'Robert Garcia', 
      login: '293847', 
      email: 'robert@example.com',
      equity: 55000, 
      balance: 53000,
      profit: 7500, 
      profitPercent: 14.15,
      lots: 8.2,
      openTrades: 10,
      status: 'Active', 
      joined: '2024-10-20',
      lastActivity: '20 minutes ago',
      performance: [500, 520, 550, 580, 610, 650, 700, 750]
    },
    { 
      id: 10, 
      name: 'Amanda Martinez', 
      login: '384756', 
      email: 'amanda@example.com',
      equity: 21000, 
      balance: 20500,
      profit: 1800, 
      profitPercent: 8.78,
      lots: 3.8,
      openTrades: 5,
      status: 'Paused', 
      joined: '2024-10-15',
      lastActivity: '1 week ago',
      performance: [200, 205, 210, 215, 212, 218, 215, 218]
    },
  ]

  const columns = [
    {
      key: 'name',
      label: 'Copier',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm flex-shrink-0 aspect-square">
            {val.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">{val}</p>
            <p className="text-xs text-gray-500">#{row.login}</p>
          </div>
        </div>
      )
    },
    {
      key: 'equity',
      label: 'Equity',
      render: (val) => (
        <span className="font-semibold text-gray-900">${val.toLocaleString()}</span>
      )
    },
    {
      key: 'profit',
      label: 'Profit/Loss',
      render: (val, row) => (
        <div>
          <span className={`font-semibold ${val >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {val >= 0 ? '+' : ''}${val.toLocaleString()}
          </span>
          <span className={`ml-2 text-xs ${val >= 0 ? 'text-emerald-500' : 'text-red-400'}`}>
            ({row.profitPercent >= 0 ? '+' : ''}{row.profitPercent}%)
          </span>
        </div>
      )
    },
    {
      key: 'performance',
      label: 'Performance',
      sortable: false,
      render: (val, row) => (
        <div className="w-24">
          <Sparkline 
            data={val} 
            color={row.profit >= 0 ? '#10b981' : '#ef4444'} 
            height={30}
          />
        </div>
      )
    },
    {
      key: 'openTrades',
      label: 'Open Trades',
      render: (val) => (
        <span className="px-2.5 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-medium whitespace-nowrap">
          {val} trades
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status'
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <button
          onClick={() => { setSelectedCopier(row); setShowModal(true) }}
          className="p-2 rounded-lg hover:bg-violet-50 text-violet-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      )
    }
  ]

  const activeCopiers = copiers.filter(c => c.status === 'Active').length
  const totalEquity = copiers.reduce((sum, c) => sum + c.equity, 0)
  const totalProfit = copiers.reduce((sum, c) => sum + c.profit, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Followed Copiers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor all traders copying your signals</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Copiers"
          value={copiers.length}
          subtitle={`${activeCopiers} active`}
          iconBg="bg-violet-100"
          icon={
            <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        <StatCard
          title="Total AUM"
          value={`$${(totalEquity / 1000).toFixed(1)}K`}
          subtitle="Assets Under Management"
          iconBg="bg-blue-100"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
        <StatCard
          title="Total Profit"
          value={`$${totalProfit.toLocaleString()}`}
          subtitle="Copiers combined profit"
          trend="+12.4%"
          trendUp={true}
          iconBg="bg-emerald-100"
          icon={
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <StatCard
          title="Open Positions"
          value={copiers.reduce((sum, c) => sum + c.openTrades, 0)}
          subtitle="Across all copiers"
          iconBg="bg-amber-100"
          icon={
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
      </div>

      {/* Data Table */}
      <DataTablePro
        title="All Copiers"
        columns={columns}
        data={copiers}
        searchableKeys={['name', 'login', 'email', 'status']}
        initialSort={{ key: 'equity', dir: 'desc' }}
        showExport={true}
      />

      {/* Copier Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Copier Details"
        size="lg"
      >
        {selectedCopier && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-14 h-14 min-w-[56px] min-h-[56px] rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0 aspect-square">
                {selectedCopier.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">{selectedCopier.name}</h4>
                <p className="text-sm text-gray-500">Login: #{selectedCopier.login}</p>
              </div>
              <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${
                selectedCopier.status === 'Active' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {selectedCopier.status}
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Equity</p>
                <p className="text-lg font-bold text-gray-900">${selectedCopier.equity.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Balance</p>
                <p className="text-lg font-bold text-gray-900">${selectedCopier.balance.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Profit/Loss</p>
                <p className={`text-lg font-bold ${selectedCopier.profit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {selectedCopier.profit >= 0 ? '+' : ''}${selectedCopier.profit.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Open Trades</p>
                <p className="text-lg font-bold text-gray-900">{selectedCopier.openTrades}</p>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-3">Performance (Last 8 periods)</p>
              <Sparkline 
                data={selectedCopier.performance} 
                color={selectedCopier.profit >= 0 ? '#10b981' : '#ef4444'} 
                height={60}
              />
            </div>

            {/* Info */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Email</span>
                <span className="text-gray-900 font-medium">{selectedCopier.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Joined</span>
                <span className="text-gray-900 font-medium">{selectedCopier.joined}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Last Activity</span>
                <span className="text-gray-900 font-medium">{selectedCopier.lastActivity}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Total Lots</span>
                <span className="text-gray-900 font-medium">{selectedCopier.lots}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default FollowedCopiers

