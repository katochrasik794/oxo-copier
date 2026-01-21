import React, { useState } from 'react'
import { useToast } from '../../components/ui/Toast'
import DataTable from '../../components/social/DataTable'

const Withdrawal = () => {
  const { showToast } = useToast()
  const [amount, setAmount] = useState('')
  const [withdrawMethod, setWithdrawMethod] = useState('crypto')
  const [selectedCrypto, setSelectedCrypto] = useState('USDT')
  const [walletAddress, setWalletAddress] = useState('')
  const [mt5Account, setMt5Account] = useState('')
  const [loading, setLoading] = useState(false)

  const availableBalance = 5842.50

  const [withdrawalHistory] = useState([
    { id: 1, date: '2024-12-08 16:30', amount: 500, method: 'USDT', destination: 'TQn9...bLSE', status: 'completed' },
    { id: 2, date: '2024-12-05 11:45', amount: 1000, method: 'Bank', destination: '****7890', status: 'completed' },
    { id: 3, date: '2024-12-03 09:15', amount: 250, method: 'MT5', destination: '12345678', status: 'completed' },
    { id: 4, date: '2024-12-01 14:00', amount: 300, method: 'USDT', destination: 'TJkV...4mWP', status: 'pending' },
  ])

  const handleWithdraw = async (e) => {
    e.preventDefault()
    if (!amount || parseFloat(amount) <= 0) { showToast('Please enter a valid amount', 'error'); return }
    if (parseFloat(amount) > availableBalance) { showToast('Insufficient balance', 'error'); return }
    if (withdrawMethod === 'crypto' && !walletAddress) { showToast('Please enter wallet address', 'error'); return }
    if (withdrawMethod === 'mt5' && !mt5Account) { showToast('Please enter MT5 account', 'error'); return }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showToast(`Withdrawal of $${amount} submitted successfully!`, 'success')
      setAmount('')
      setWalletAddress('')
      setMt5Account('')
    }, 1500)
  }

  const handleMaxAmount = () => setAmount(availableBalance.toString())

  const withdrawalColumns = [
    { header: 'Date', accessor: 'date', render: (row) => <span className="text-sm text-gray-900">{row.date}</span> },
    { header: 'Amount', accessor: 'amount', align: 'center', sortType: 'number', render: (row) => <span className="font-semibold text-red-500">-${row.amount}</span> },
    { header: 'Method', accessor: 'method', align: 'center', hideOnMobile: true, render: (row) => <span className="text-gray-700">{row.method}</span> },
    { header: 'Destination', accessor: 'destination', align: 'center', hideOnMobile: true, render: (row) => <code className="text-xs text-gray-500 font-mono">{row.destination}</code> },
    { header: 'Status', accessor: 'status', align: 'center', render: (row) => <StatusBadge status={row.status} /> },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Withdraw Funds</h1>
        <p className="text-gray-500 text-sm mt-1">Transfer funds from your trading account</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-200 text-sm">Available Balance</p>
                <p className="text-3xl font-bold mt-1">${availableBalance.toFixed(2)}</p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Details</h2>
            <form onSubmit={handleWithdraw} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">$</span>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" max={availableBalance} className="w-full pl-10 pr-20 py-3 border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500" />
                  <button type="button" onClick={handleMaxAmount} className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-sm font-medium text-violet-600 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors">MAX</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Method</label>
                <div className="grid grid-cols-3 gap-3">
                  {[{ id: 'crypto', label: 'Crypto', icon: '💰', bg: 'bg-amber-100 text-amber-600' }, { id: 'bank', label: 'Bank', icon: '🏦', bg: 'bg-blue-100 text-blue-600' }, { id: 'mt5', label: 'MT5', icon: '📊', bg: 'bg-emerald-100 text-emerald-600' }].map(m => (
                    <button key={m.id} type="button" onClick={() => setWithdrawMethod(m.id)} className={`p-4 rounded-xl border-2 text-center transition-all ${withdrawMethod === m.id ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center mx-auto mb-2 text-sm`}>{m.icon}</div>
                      <div className="font-semibold text-gray-900 text-sm">{m.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {withdrawMethod === 'crypto' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cryptocurrency</label>
                    <div className="flex gap-2">
                      {['USDT', 'BTC', 'ETH'].map((crypto) => (
                        <button key={crypto} type="button" onClick={() => setSelectedCrypto(crypto)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${selectedCrypto === crypto ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>{crypto}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wallet Address</label>
                    <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} placeholder={`Enter your ${selectedCrypto} wallet address`} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500" />
                  </div>
                </>
              )}

              {withdrawMethod === 'bank' && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600">Bank withdrawals will be sent to your registered bank account.</p>
                </div>
              )}

              {withdrawMethod === 'mt5' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MT5 Account Number</label>
                  <input type="text" value={mt5Account} onChange={(e) => setMt5Account(e.target.value)} placeholder="Enter MT5 account number" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500" />
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (<><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Processing...</>) : (<><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>Withdraw Now</>)}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Structure</h3>
            <div className="space-y-3">
              {[{ label: 'Crypto (USDT)', value: '$1.00' }, { label: 'Crypto (BTC/ETH)', value: '0.1%' }, { label: 'Bank Transfer', value: '$25.00' }, { label: 'MT5 Transfer', value: 'Free', color: 'text-emerald-600' }].map((fee, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">{fee.label}</span>
                  <span className={`font-semibold ${fee.color || 'text-gray-900'}`}>{fee.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Time</h3>
            <div className="space-y-3">
              {[{ label: 'Crypto', time: 'Within 1 hour', color: 'bg-emerald-500' }, { label: 'Bank Transfer', time: '3-5 business days', color: 'bg-amber-500' }, { label: 'MT5 Transfer', time: 'Instant', color: 'bg-emerald-500' }].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <div className="text-sm text-amber-800"><p className="font-semibold mb-1">Security Notice</p><p>Please double-check your withdrawal address.</p></div>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        title="Recent Withdrawals"
        columns={withdrawalColumns}
        data={withdrawalHistory}
        searchable={true}
        searchPlaceholder="Search withdrawals..."
        pagination={true}
        pageSize={10}
        exportable={true}
        emptyMessage="No withdrawals yet"
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

export default Withdrawal
