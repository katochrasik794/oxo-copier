import React, { useState } from 'react'
import StatCard from '../../components/master/StatCard'
import DataTablePro from '../../components/master/DataTablePro'
import Modal from '../../components/master/Modal'
import { useToast } from '../../components/ui/Toast'

const MapMT5Accounts = () => {
  const toast = useToast()
  const [showMapModal, setShowMapModal] = useState(false)
  const [selectedMaster, setSelectedMaster] = useState('')
  const [copierLogin, setCopierLogin] = useState('')
  const [copierPassword, setCopierPassword] = useState('')
  const [copierServer, setCopierServer] = useState('')
  const [loading, setLoading] = useState(false)

  // Master's MT5 accounts
  const masterAccounts = [
    { id: 1, login: 'MT5-892734', server: 'Live-Server1', balance: 15420, status: 'Active' },
    { id: 2, login: 'MT5-738291', server: 'Live-Server2', balance: 8750, status: 'Active' },
    { id: 3, login: 'MT5-482916', server: 'Live-Server1', balance: 22300, status: 'Active' },
  ]

  // Mapped accounts history
  const [mappedAccounts, setMappedAccounts] = useState([
    { 
      id: 1, 
      masterLogin: 'MT5-892734', 
      masterServer: 'Live-Server1',
      copierLogin: 'MT5-329481', 
      copierServer: 'Live-Server1',
      copierName: 'John Smith',
      status: 'Active', 
      mappedAt: '2024-12-10 14:30',
      lastSync: '2 mins ago',
      trades: 45
    },
    { 
      id: 2, 
      masterLogin: 'MT5-892734', 
      masterServer: 'Live-Server1',
      copierLogin: 'MT5-918330', 
      copierServer: 'Live-Server1',
      copierName: 'Sarah Wilson',
      status: 'Active', 
      mappedAt: '2024-12-08 10:15',
      lastSync: '5 mins ago',
      trades: 38
    },
    { 
      id: 3, 
      masterLogin: 'MT5-738291', 
      masterServer: 'Live-Server2',
      copierLogin: 'MT5-771992', 
      copierServer: 'Live-Server2',
      copierName: 'Mike Johnson',
      status: 'Paused', 
      mappedAt: '2024-12-05 09:45',
      lastSync: '3 days ago',
      trades: 22
    },
    { 
      id: 4, 
      masterLogin: 'MT5-482916', 
      masterServer: 'Live-Server1',
      copierLogin: 'MT5-639182', 
      copierServer: 'Live-Server1',
      copierName: 'Emily Davis',
      status: 'Active', 
      mappedAt: '2024-12-01 16:20',
      lastSync: '1 min ago',
      trades: 67
    },
    { 
      id: 5, 
      masterLogin: 'MT5-892734', 
      masterServer: 'Live-Server1',
      copierLogin: 'MT5-728391', 
      copierServer: 'Live-Server1',
      copierName: 'Chris Brown',
      status: 'Disconnected', 
      mappedAt: '2024-11-28 11:30',
      lastSync: '5 days ago',
      trades: 15
    },
  ])

  // Activity logs
  const activityLogs = [
    { id: 1, action: 'Account Mapped', master: 'MT5-892734', copier: 'MT5-329481', copierName: 'John Smith', timestamp: '2024-12-10 14:30', status: 'Success' },
    { id: 2, action: 'Trade Copied', master: 'MT5-892734', copier: 'MT5-329481', copierName: 'John Smith', timestamp: '2024-12-10 14:35', status: 'Success', details: 'EURUSD Buy 0.5 lots' },
    { id: 3, action: 'Account Mapped', master: 'MT5-892734', copier: 'MT5-918330', copierName: 'Sarah Wilson', timestamp: '2024-12-08 10:15', status: 'Success' },
    { id: 4, action: 'Sync Failed', master: 'MT5-892734', copier: 'MT5-728391', copierName: 'Chris Brown', timestamp: '2024-12-05 08:20', status: 'Failed', details: 'Connection timeout' },
    { id: 5, action: 'Account Paused', master: 'MT5-738291', copier: 'MT5-771992', copierName: 'Mike Johnson', timestamp: '2024-12-05 09:45', status: 'Warning' },
    { id: 6, action: 'Trade Copied', master: 'MT5-482916', copier: 'MT5-639182', copierName: 'Emily Davis', timestamp: '2024-12-10 15:00', status: 'Success', details: 'GBPUSD Sell 1.2 lots' },
    { id: 7, action: 'Password Updated', master: 'MT5-892734', copier: 'MT5-329481', copierName: 'John Smith', timestamp: '2024-12-09 12:00', status: 'Success' },
    { id: 8, action: 'Trade Copied', master: 'MT5-892734', copier: 'MT5-918330', copierName: 'Sarah Wilson', timestamp: '2024-12-10 15:10', status: 'Success', details: 'XAUUSD Buy 0.8 lots' },
  ]

  const handleMapAccount = async () => {
    if (!selectedMaster || !copierLogin || !copierPassword || !copierServer) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const masterAcc = masterAccounts.find(a => a.login === selectedMaster)
      const newMapping = {
        id: mappedAccounts.length + 1,
        masterLogin: selectedMaster,
        masterServer: masterAcc?.server || '',
        copierLogin: copierLogin,
        copierServer: copierServer,
        copierName: 'New Copier',
        status: 'Active',
        mappedAt: new Date().toLocaleString(),
        lastSync: 'Just now',
        trades: 0
      }
      setMappedAccounts([newMapping, ...mappedAccounts])
      toast.success('MT5 account mapped successfully!')
      setShowMapModal(false)
      setSelectedMaster('')
      setCopierLogin('')
      setCopierPassword('')
      setCopierServer('')
      setLoading(false)
    }, 1500)
  }

  const mappedColumns = [
    {
      key: 'masterLogin',
      label: 'Master Account',
      render: (val, row) => (
        <div>
          <p className="font-semibold text-gray-900">{val}</p>
          <p className="text-xs text-gray-500">{row.masterServer}</p>
        </div>
      )
    },
    {
      key: 'copierLogin',
      label: 'Copier Account',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 aspect-square">
            {row.copierName?.charAt(0) || 'C'}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{val}</p>
            <p className="text-xs text-gray-500">{row.copierName}</p>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => {
        let cls = 'bg-gray-100 text-gray-700'
        if (val === 'Active') cls = 'bg-emerald-100 text-emerald-700'
        else if (val === 'Paused') cls = 'bg-amber-100 text-amber-700'
        else if (val === 'Disconnected') cls = 'bg-red-100 text-red-700'
        return <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${cls}`}>{val}</span>
      }
    },
    {
      key: 'lastSync',
      label: 'Last Sync',
      render: (val) => <span className="text-gray-600 whitespace-nowrap">{val}</span>
    },
    {
      key: 'trades',
      label: 'Trades Copied',
      render: (val) => <span className="font-semibold text-violet-600">{val}</span>
    },
    {
      key: 'mappedAt',
      label: 'Mapped On',
      render: (val) => <span className="text-gray-600 text-xs whitespace-nowrap">{val}</span>
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button 
            className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-500 hover:text-violet-600 transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button 
            className={`p-1.5 rounded-lg transition-colors ${row.status === 'Paused' ? 'hover:bg-emerald-50 text-emerald-600' : 'hover:bg-amber-50 text-amber-600'}`}
            title={row.status === 'Paused' ? 'Resume' : 'Pause'}
          >
            {row.status === 'Paused' ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          <button 
            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
            title="Remove"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )
    }
  ]

  const logColumns = [
    {
      key: 'timestamp',
      label: 'Time',
      render: (val) => <span className="text-gray-600 text-xs whitespace-nowrap">{val}</span>
    },
    {
      key: 'action',
      label: 'Action',
      render: (val) => {
        let icon, bgColor
        switch(val) {
          case 'Account Mapped':
            icon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            bgColor = 'bg-violet-100 text-violet-600'
            break
          case 'Trade Copied':
            icon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            bgColor = 'bg-emerald-100 text-emerald-600'
            break
          case 'Sync Failed':
            icon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            bgColor = 'bg-red-100 text-red-600'
            break
          case 'Account Paused':
            icon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            bgColor = 'bg-amber-100 text-amber-600'
            break
          default:
            icon = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            bgColor = 'bg-gray-100 text-gray-600'
        }
        return (
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg ${bgColor} flex items-center justify-center flex-shrink-0`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">{icon}</svg>
            </div>
            <span className="font-medium text-gray-900 whitespace-nowrap">{val}</span>
          </div>
        )
      }
    },
    {
      key: 'copierName',
      label: 'Copier',
      render: (val, row) => (
        <div>
          <p className="font-medium text-gray-900">{val}</p>
          <p className="text-xs text-gray-500">{row.copier}</p>
        </div>
      )
    },
    {
      key: 'master',
      label: 'Master',
      render: (val) => <span className="text-gray-700 font-mono text-xs">{val}</span>
    },
    {
      key: 'details',
      label: 'Details',
      render: (val) => val ? <span className="text-gray-600 text-xs">{val}</span> : <span className="text-gray-400">—</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => {
        let cls = 'bg-gray-100 text-gray-700'
        if (val === 'Success') cls = 'bg-emerald-100 text-emerald-700'
        else if (val === 'Failed') cls = 'bg-red-100 text-red-700'
        else if (val === 'Warning') cls = 'bg-amber-100 text-amber-700'
        return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>{val}</span>
      }
    }
  ]

  const activeCount = mappedAccounts.filter(m => m.status === 'Active').length
  const totalTrades = mappedAccounts.reduce((sum, m) => sum + m.trades, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Map MT5 Accounts</h1>
          <p className="text-sm text-gray-500 mt-1">Connect copier accounts to your master MT5 accounts</p>
        </div>
        <button
          onClick={() => setShowMapModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Map New Account
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Mapped"
          value={mappedAccounts.length}
          subtitle="Copier accounts"
          iconBg="bg-violet-100"
          icon={
            <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          }
        />
        <StatCard
          title="Active Connections"
          value={activeCount}
          subtitle="Currently syncing"
          trend="+2"
          trendUp={true}
          iconBg="bg-emerald-100"
          icon={
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Total Trades Copied"
          value={totalTrades}
          subtitle="Across all accounts"
          iconBg="bg-blue-100"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          }
        />
        <StatCard
          title="Master Accounts"
          value={masterAccounts.length}
          subtitle="Available to map"
          iconBg="bg-amber-100"
          icon={
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          }
        />
      </div>

      {/* Mapped Accounts Table */}
      <DataTablePro
        title="Mapped Accounts"
        columns={mappedColumns}
        data={mappedAccounts}
        searchableKeys={['masterLogin', 'copierLogin', 'copierName', 'status']}
        initialSort={{ key: 'mappedAt', dir: 'desc' }}
        showExport={true}
      />

      {/* Activity Logs */}
      <DataTablePro
        title="Activity Logs"
        columns={logColumns}
        data={activityLogs}
        searchableKeys={['action', 'copierName', 'master', 'status']}
        initialSort={{ key: 'timestamp', dir: 'desc' }}
        showExport={true}
      />

      {/* Map Account Modal */}
      <Modal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        title="Map MT5 Account"
        size="md"
      >
        <div className="space-y-5">
          {/* Info Banner */}
          <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-violet-700">
                To map a copier account, you need the copier's MT5 login credentials. The password is required to establish a secure connection for trade copying.
              </p>
            </div>
          </div>

          {/* Master Account Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Master Account</label>
            <select
              value={selectedMaster}
              onChange={(e) => setSelectedMaster(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="">Choose master account...</option>
              {masterAccounts.map((acc) => (
                <option key={acc.id} value={acc.login}>
                  {acc.login} - {acc.server} (${acc.balance.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500 font-medium">COPIER DETAILS</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Copier Login */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Copier MT5 Login</label>
            <input
              type="text"
              value={copierLogin}
              onChange={(e) => setCopierLogin(e.target.value)}
              placeholder="e.g., 12345678"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          {/* Copier Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Copier MT5 Password</label>
            <input
              type="password"
              value={copierPassword}
              onChange={(e) => setCopierPassword(e.target.value)}
              placeholder="Enter copier's MT5 password"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1.5">Required to authenticate and establish connection</p>
          </div>

          {/* Copier Server */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Copier MT5 Server</label>
            <select
              value={copierServer}
              onChange={(e) => setCopierServer(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="">Select server...</option>
              <option value="Live-Server1">Live-Server1</option>
              <option value="Live-Server2">Live-Server2</option>
              <option value="Demo-Server1">Demo-Server1</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setShowMapModal(false)}
              className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleMapAccount}
              disabled={loading || !selectedMaster || !copierLogin || !copierPassword || !copierServer}
              className="flex-1 h-11 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Map Account
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default MapMT5Accounts

