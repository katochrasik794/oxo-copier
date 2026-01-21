import React, { useState } from 'react'
import { useToast } from '../../components/ui/Toast'
import DataTable from '../../components/social/DataTable'

const Deposit = () => {
  const { showToast } = useToast()
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('crypto')
  const [selectedCrypto, setSelectedCrypto] = useState('USDT')
  const [loading, setLoading] = useState(false)

  const walletAddresses = {
    USDT: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
    BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  }

  const [depositHistory] = useState([
    { id: 1, date: '2024-12-09 14:30', amount: 500, method: 'USDT', status: 'completed', txHash: '0x1234...5678' },
    { id: 2, date: '2024-12-07 10:15', amount: 1000, method: 'Bank Transfer', status: 'completed', txHash: '-' },
    { id: 3, date: '2024-12-05 16:45', amount: 250, method: 'BTC', status: 'completed', txHash: '3FZbgi...9LkS' },
    { id: 4, date: '2024-12-03 09:00', amount: 750, method: 'USDT', status: 'pending', txHash: '0xabcd...ef12' },
  ])

  const quickAmounts = [100, 250, 500, 1000, 2500, 5000]

  const handleDeposit = async (e) => {
    e.preventDefault()
    if (!amount || parseFloat(amount) <= 0) {
      showToast('Please enter a valid amount', 'error')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showToast(`Deposit of $${amount} initiated successfully!`, 'success')
      setAmount('')
    }, 1500)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    showToast('Address copied to clipboard!', 'success')
  }

  const depositColumns = [
    {
      header: 'Date',
      accessor: 'date',
      render: (row) => <span className="text-sm text-gray-900">{row.date}</span>
    },
    {
      header: 'Amount',
      accessor: 'amount',
      align: 'center',
      sortType: 'number',
      render: (row) => <span className="font-semibold text-emerald-600">+${row.amount}</span>
    },
    {
      header: 'Method',
      accessor: 'method',
      align: 'center',
      hideOnMobile: true,
      render: (row) => <span className="text-gray-700">{row.method}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      align: 'center',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'TX Hash',
      accessor: 'txHash',
      align: 'center',
      hideOnMobile: true,
      render: (row) => <code className="text-xs text-gray-500 font-mono">{row.txHash}</code>
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Deposit Funds</h1>
        <p className="text-gray-500 text-sm mt-1">Add funds to your trading account</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Deposit Amount</h2>
            <form onSubmit={handleDeposit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">$</span>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" min="10" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((amt) => (
                  <button key={amt} type="button" onClick={() => setAmount(amt.toString())} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${amount === amt.toString() ? 'bg-violet-100 border-violet-300 text-violet-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>${amt}</button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setPaymentMethod('crypto')} className={`p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === 'crypto' ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Cryptocurrency</div>
                        <div className="text-xs text-gray-500">USDT, BTC, ETH</div>
                      </div>
                    </div>
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('bank')} className={`p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === 'bank' ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Bank Transfer</div>
                        <div className="text-xs text-gray-500">Wire transfer</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {paymentMethod === 'crypto' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Cryptocurrency</label>
                  <div className="flex gap-2">
                    {['USDT', 'BTC', 'ETH'].map((crypto) => (
                      <button key={crypto} type="button" onClick={() => setSelectedCrypto(crypto)} className={`flex-1 py-3 rounded-lg text-sm font-medium border transition-colors ${selectedCrypto === crypto ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>{crypto}</button>
                    ))}
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (<><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Processing...</>) : (<><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>Deposit Now</>)}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          {paymentMethod === 'crypto' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Deposit Address</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="text-xs text-gray-500 mb-1">{selectedCrypto} Address (TRC20)</div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm font-mono text-gray-900 break-all">{walletAddresses[selectedCrypto]}</code>
                  <button onClick={() => copyToClipboard(walletAddresses[selectedCrypto])} className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800"><span className="font-semibold">Important:</span> Only send {selectedCrypto} to this address.</p>
              </div>
            </div>
          )}

          {paymentMethod === 'bank' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Details</h3>
              <div className="space-y-4 text-sm">
                <div><div className="text-gray-500">Bank Name</div><div className="font-semibold text-gray-900">International Trading Bank</div></div>
                <div><div className="text-gray-500">Account Number</div><div className="font-semibold text-gray-900">1234567890</div></div>
                <div><div className="text-gray-500">SWIFT Code</div><div className="font-semibold text-gray-900">ITBKUS33</div></div>
              </div>
            </div>
          )}

          <div className="bg-violet-50 rounded-xl border border-violet-200 p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div className="text-sm text-violet-800"><p className="font-semibold mb-1">Processing Time</p><p>Crypto: ~10 minutes</p><p>Bank: 1-3 business days</p></div>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        title="Recent Deposits"
        columns={depositColumns}
        data={depositHistory}
        searchable={true}
        searchPlaceholder="Search deposits..."
        pagination={true}
        pageSize={10}
        exportable={true}
        emptyMessage="No deposits yet"
      />
    </div>
  )
}

const StatusBadge = ({ status }) => {
  const styles = {
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    failed: 'bg-red-100 text-red-700 border-red-200',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'completed' ? 'bg-emerald-500' : status === 'pending' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default Deposit
