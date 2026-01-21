import React, { useState } from 'react'
import StatCard from '../../components/master/StatCard'
import Modal from '../../components/master/Modal'
import DataTablePro from '../../components/master/DataTablePro'

const WalletManagement = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [withdrawMethod, setWithdrawMethod] = useState('mt5')

  // Wallet balance
  const walletBalance = 8320
  const pendingWithdrawals = 2500
  const availableBalance = walletBalance - pendingWithdrawals

  // MT5 Accounts
  const mt5Accounts = [
    { id: 1, login: 'MT5-892734', balance: 15420, equity: 16200, server: 'Live-Server1', status: 'Active' },
    { id: 2, login: 'MT5-738291', balance: 8750, equity: 9100, server: 'Live-Server2', status: 'Active' },
    { id: 3, login: 'MT5-482916', balance: 22300, equity: 21800, server: 'Live-Server1', status: 'Active' },
  ]

  // Recent transactions
  const recentTransactions = [
    { id: 1, date: '2024-12-10', type: 'Withdrawal Request', amount: -2500, destination: 'MT5-892734', status: 'Pending' },
    { id: 2, date: '2024-12-08', type: 'Commission Credit', amount: 580, source: 'Trade #28391', status: 'Completed' },
    { id: 3, date: '2024-12-07', type: 'Withdrawal', amount: -1800, destination: 'MT5-738291', status: 'Completed' },
    { id: 4, date: '2024-12-06', type: 'Commission Credit', amount: 1200, source: 'Trade #28374', status: 'Completed' },
    { id: 5, date: '2024-12-05', type: 'Bank Withdrawal', amount: -5000, destination: '**** 4521', status: 'Completed' },
    { id: 6, date: '2024-12-04', type: 'Commission Credit', amount: 890, source: 'Trade #28362', status: 'Completed' },
    { id: 7, date: '2024-12-03', type: 'Commission Credit', amount: 450, source: 'Trade #28351', status: 'Completed' },
    { id: 8, date: '2024-12-02', type: 'Transfer In', amount: 3200, source: 'MT5-482916', status: 'Completed' },
  ]

  const transactionColumns = [
    {
      key: 'date',
      label: 'Date',
      render: (val) => <span className="font-medium text-gray-900">{val}</span>
    },
    {
      key: 'type',
      label: 'Type',
      render: (val) => {
        let bgColor = 'bg-gray-100 text-gray-700'
        if (val.includes('Credit') || val.includes('Transfer In')) bgColor = 'bg-emerald-100 text-emerald-700'
        else if (val.includes('Withdrawal') || val.includes('Request')) bgColor = 'bg-violet-100 text-violet-700'
        return <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${bgColor}`}>{val}</span>
      }
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (val) => (
        <span className={`font-bold ${val >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {val >= 0 ? '+' : ''}${Math.abs(val).toLocaleString()}
        </span>
      )
    },
    {
      key: 'source',
      label: 'Details',
      render: (val, row) => (
        <span className="text-sm text-gray-600">{val || row.destination || '—'}</span>
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
          <h1 className="text-xl font-bold text-gray-900">Wallet Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your earnings wallet and transfers</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTransferModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-violet-200 text-violet-700 rounded-xl text-sm font-medium hover:bg-violet-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Internal Transfer
          </button>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Withdraw
          </button>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="text-violet-200 text-sm">Master Wallet</p>
              <p className="text-xs text-violet-300">Commission earnings account</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-violet-200 text-xs uppercase tracking-wider mb-1">Total Balance</p>
              <p className="text-3xl font-bold">${walletBalance.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-violet-200 text-xs uppercase tracking-wider mb-1">Pending</p>
              <p className="text-2xl font-bold text-amber-300">${pendingWithdrawals.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-violet-200 text-xs uppercase tracking-wider mb-1">Available</p>
              <p className="text-2xl font-bold text-emerald-300">${availableBalance.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="This Month"
          value="$4,580"
          subtitle="Commission earned"
          trend="+22.4%"
          trendUp={true}
          iconBg="bg-emerald-100"
          icon={
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <StatCard
          title="Total Withdrawn"
          value="$45,800"
          subtitle="All time"
          iconBg="bg-violet-100"
          icon={
            <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <StatCard
          title="MT5 Accounts"
          value={mt5Accounts.length}
          subtitle="Connected accounts"
          iconBg="bg-blue-100"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          }
        />
        <StatCard
          title="Pending Requests"
          value="1"
          subtitle="Withdrawal requests"
          iconBg="bg-amber-100"
          icon={
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* MT5 Accounts */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Connected MT5 Accounts</h3>
          <p className="text-xs text-gray-500 mt-1">Transfer funds to/from these accounts</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mt5Accounts.map((account) => (
              <div 
                key={account.id}
                className="bg-gray-50 rounded-xl p-4 hover:bg-violet-50 hover:border-violet-200 border border-transparent transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{account.login}</p>
                      <p className="text-xs text-gray-500">{account.server}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    {account.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Balance</p>
                    <p className="font-bold text-gray-900">${account.balance.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Equity</p>
                    <p className="font-bold text-gray-900">${account.equity.toLocaleString()}</p>
                  </div>
                </div>
                <button className="mt-3 w-full py-2 rounded-lg border border-violet-200 text-violet-700 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:bg-violet-100">
                  Transfer to this account
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <DataTablePro
        title="Transaction History"
        columns={transactionColumns}
        data={recentTransactions}
        searchableKeys={['type', 'source', 'destination', 'status']}
        initialSort={{ key: 'date', dir: 'desc' }}
        showExport={true}
      />

      {/* Withdraw Modal */}
      <Modal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        title="Withdraw Funds"
        size="md"
      >
        <WithdrawForm
          availableBalance={availableBalance}
          mt5Accounts={mt5Accounts}
          withdrawMethod={withdrawMethod}
          setWithdrawMethod={setWithdrawMethod}
          onCancel={() => setShowWithdrawModal(false)}
          onSubmit={() => setShowWithdrawModal(false)}
        />
      </Modal>

      {/* Transfer Modal */}
      <Modal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        title="Internal Transfer"
        size="md"
      >
        <TransferForm
          availableBalance={availableBalance}
          mt5Accounts={mt5Accounts}
          onCancel={() => setShowTransferModal(false)}
          onSubmit={() => setShowTransferModal(false)}
        />
      </Modal>
    </div>
  )
}

// Withdraw Form Component
const WithdrawForm = ({ availableBalance, mt5Accounts, withdrawMethod, setWithdrawMethod, onCancel, onSubmit }) => {
  const [amount, setAmount] = useState('')
  const [selectedAccount, setSelectedAccount] = useState('')
  const [bankDetails, setBankDetails] = useState('')
  const [cryptoAddress, setCryptoAddress] = useState('')

  return (
    <div className="space-y-5">
      {/* Available Balance */}
      <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-violet-700">Available Balance</span>
          <span className="text-xl font-bold text-violet-700">${availableBalance.toLocaleString()}</span>
        </div>
      </div>

      {/* Method Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Method</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'mt5', label: 'MT5 Account', icon: '💹' },
            { id: 'bank', label: 'Bank Wire', icon: '🏦' },
            { id: 'crypto', label: 'Crypto', icon: '₿' },
          ].map((method) => (
            <button
              key={method.id}
              onClick={() => setWithdrawMethod(method.id)}
              className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                withdrawMethod === method.id
                  ? 'border-violet-500 bg-violet-50 text-violet-700'
                  : 'border-gray-200 hover:border-violet-200 text-gray-700'
              }`}
            >
              <span className="text-lg">{method.icon}</span>
              <span className="block mt-1">{method.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
        <div className="flex gap-2 mt-2">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              onClick={() => setAmount(Math.floor(availableBalance * pct / 100))}
              className="px-3 py-1 text-xs rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-colors"
            >
              {pct}%
            </button>
          ))}
        </div>
      </div>

      {/* Method-specific fields */}
      {withdrawMethod === 'mt5' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select MT5 Account</label>
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Select account...</option>
            {mt5Accounts.map((acc) => (
              <option key={acc.id} value={acc.login}>{acc.login} - ${acc.balance.toLocaleString()}</option>
            ))}
          </select>
        </div>
      )}

      {withdrawMethod === 'bank' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
          <select
            value={bankDetails}
            onChange={(e) => setBankDetails(e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Select saved account...</option>
            <option value="acc1">**** 4521 - Chase Bank</option>
            <option value="acc2">**** 7832 - Bank of America</option>
            <option value="new">+ Add new account</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">Processing fee: $25</p>
        </div>
      )}

      {withdrawMethod === 'crypto' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">USDT Address (TRC20)</label>
          <input
            type="text"
            value={cryptoAddress}
            onChange={(e) => setCryptoAddress(e.target.value)}
            placeholder="Enter TRC20 address"
            className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-2">Network fee: ~$1-2</p>
        </div>
      )}

      {/* Summary */}
      {amount && (
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium text-gray-900">${Number(amount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Fee</span>
            <span className="font-medium text-red-500">
              -${withdrawMethod === 'bank' ? '25' : withdrawMethod === 'crypto' ? '2' : '0'}
            </span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
            <span className="text-gray-700 font-medium">You'll receive</span>
            <span className="font-bold text-emerald-600">
              ${(Number(amount) - (withdrawMethod === 'bank' ? 25 : withdrawMethod === 'crypto' ? 2 : 0)).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={!amount || Number(amount) > availableBalance}
          className="flex-1 h-11 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Request Withdrawal
        </button>
      </div>
    </div>
  )
}

// Transfer Form Component
const TransferForm = ({ availableBalance, mt5Accounts, onCancel, onSubmit }) => {
  const [amount, setAmount] = useState('')
  const [fromAccount, setFromAccount] = useState('wallet')
  const [toAccount, setToAccount] = useState('')

  return (
    <div className="space-y-5">
      {/* From Account */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
        <select
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="wallet">Master Wallet - ${availableBalance.toLocaleString()}</option>
          {mt5Accounts.map((acc) => (
            <option key={acc.id} value={acc.login}>{acc.login} - ${acc.balance.toLocaleString()}</option>
          ))}
        </select>
      </div>

      {/* To Account */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
        <select
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Select destination...</option>
          {fromAccount !== 'wallet' && (
            <option value="wallet">Master Wallet</option>
          )}
          {mt5Accounts.filter(acc => acc.login !== fromAccount).map((acc) => (
            <option key={acc.id} value={acc.login}>{acc.login} - ${acc.balance.toLocaleString()}</option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-blue-700">
            Internal transfers between your wallet and MT5 accounts are instant and free of charge.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onCancel}
          className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={!amount || !toAccount}
          className="flex-1 h-11 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Transfer Now
        </button>
      </div>
    </div>
  )
}

export default WalletManagement

