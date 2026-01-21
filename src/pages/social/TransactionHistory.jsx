import React, { useState, useMemo } from 'react'
import DataTable from '../../components/social/DataTable'

const TransactionHistory = () => {
  const [activeTab, setActiveTab] = useState('all')

  const [transactions] = useState([
    { id: 1, date: '2024-12-10 09:30', type: 'deposit', amount: 1000, method: 'USDT', status: 'completed', reference: 'TXN-001234' },
    { id: 2, date: '2024-12-09 16:30', type: 'withdrawal', amount: 500, method: 'USDT', status: 'completed', reference: 'TXN-001235' },
    { id: 3, date: '2024-12-09 14:15', type: 'deposit', amount: 250, method: 'BTC', status: 'completed', reference: 'TXN-001236' },
    { id: 4, date: '2024-12-08 11:45', type: 'withdrawal', amount: 1000, method: 'Bank', status: 'completed', reference: 'TXN-001237' },
    { id: 5, date: '2024-12-07 10:00', type: 'deposit', amount: 2000, method: 'Bank', status: 'completed', reference: 'TXN-001238' },
    { id: 6, date: '2024-12-06 15:30', type: 'withdrawal', amount: 300, method: 'MT5', status: 'completed', reference: 'TXN-001239' },
    { id: 7, date: '2024-12-05 09:15', type: 'deposit', amount: 500, method: 'ETH', status: 'pending', reference: 'TXN-001240' },
    { id: 8, date: '2024-12-04 14:00', type: 'withdrawal', amount: 750, method: 'USDT', status: 'pending', reference: 'TXN-001241' },
    { id: 9, date: '2024-12-03 11:30', type: 'deposit', amount: 1500, method: 'USDT', status: 'completed', reference: 'TXN-001242' },
    { id: 10, date: '2024-12-02 16:45', type: 'withdrawal', amount: 200, method: 'BTC', status: 'failed', reference: 'TXN-001243' },
    { id: 11, date: '2024-12-01 10:30', type: 'deposit', amount: 3000, method: 'Bank', status: 'completed', reference: 'TXN-001244' },
    { id: 12, date: '2024-11-30 14:15', type: 'withdrawal', amount: 500, method: 'USDT', status: 'completed', reference: 'TXN-001245' },
  ])

  const filteredTransactions = useMemo(() => {
    if (activeTab === 'all') return transactions
    return transactions.filter(t => t.type === activeTab)
  }, [transactions, activeTab])

  const stats = useMemo(() => {
    const deposits = transactions.filter(t => t.type === 'deposit' && t.status === 'completed')
    const withdrawals = transactions.filter(t => t.type === 'withdrawal' && t.status === 'completed')
    return {
      totalDeposits: deposits.reduce((acc, t) => acc + t.amount, 0),
      totalWithdrawals: withdrawals.reduce((acc, t) => acc + t.amount, 0),
      depositCount: deposits.length,
      withdrawalCount: withdrawals.length,
      pendingCount: transactions.filter(t => t.status === 'pending').length,
    }
  }, [transactions])

  const columns = [
    { header: 'Date', accessor: 'date', render: (row) => <span className="text-sm text-gray-900">{row.date}</span> },
    {
      header: 'Type',
      accessor: 'type',
      align: 'center',
      render: (row) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border ${row.type === 'deposit' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
          {row.type === 'deposit' ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
          )}
          {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
        </span>
      )
    },
    {
      header: 'Amount',
      accessor: 'amount',
      align: 'center',
      sortType: 'number',
      render: (row) => (
        <span className={`font-bold ${row.type === 'deposit' ? 'text-emerald-600' : 'text-red-500'}`}>
          {row.type === 'deposit' ? '+' : '-'}${row.amount.toLocaleString()}
        </span>
      )
    },
    { header: 'Method', accessor: 'method', align: 'center', hideOnMobile: true, render: (row) => <span className="text-gray-700">{row.method}</span> },
    { header: 'Status', accessor: 'status', align: 'center', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Reference', accessor: 'reference', align: 'center', hideOnMobile: true, render: (row) => <code className="text-xs text-gray-500 font-mono">{row.reference}</code> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-500 text-sm mt-1">View all your deposits and withdrawals</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Deposits</p>
          <p className="text-xl font-bold text-emerald-600 mt-1">+${stats.totalDeposits.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{stats.depositCount} transactions</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Withdrawals</p>
          <p className="text-xl font-bold text-red-500 mt-1">-${stats.totalWithdrawals.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{stats.withdrawalCount} transactions</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Net Flow</p>
          <p className={`text-xl font-bold mt-1 ${stats.totalDeposits - stats.totalWithdrawals >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            ${(stats.totalDeposits - stats.totalWithdrawals).toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">Current period</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-xl font-bold text-amber-600 mt-1">{stats.pendingCount}</p>
          <p className="text-xs text-gray-400 mt-1">Awaiting processing</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{transactions.length}</p>
          <p className="text-xs text-gray-400 mt-1">All time</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {[{ id: 'all', label: 'All' }, { id: 'deposit', label: 'Deposits' }, { id: 'withdrawal', label: 'Withdrawals' }].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filteredTransactions}
        searchable={true}
        searchPlaceholder="Search by reference..."
        pagination={true}
        pageSize={10}
        exportable={true}
        emptyMessage="No transactions found"
      />
    </div>
  )
}

const StatusBadge = ({ status }) => {
  const styles = { completed: 'bg-emerald-100 text-emerald-700 border-emerald-200', pending: 'bg-amber-100 text-amber-700 border-amber-200', failed: 'bg-red-100 text-red-700 border-red-200' }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'completed' ? 'bg-emerald-500' : status === 'pending' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default TransactionHistory
