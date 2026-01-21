import React, { useState, useEffect, useMemo } from 'react'
import { useToast } from '../../components/ui/Toast'
import DataTable from '../../components/social/DataTable'
import api from '../../utils/api'
import Swal from 'sweetalert2'

const MyAccount = () => {
  const { showToast } = useToast()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [creating, setCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [activeGroups, setActiveGroups] = useState([])
  const [showPasswords, setShowPasswords] = useState({})
  
  const [createForm, setCreateForm] = useState({
    name: '',
    group: '',
    leverage: '1:100',
    masterPassword: ''
  })

  // Password validation
  const passwordValidation = useMemo(() => {
    const password = createForm.masterPassword
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      isValid: password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }
  }, [createForm.masterPassword])

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const password = createForm.masterPassword
    if (!password) return { level: 0, label: '', color: '' }
    
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++

    if (strength <= 2) return { level: strength, label: 'Weak', color: 'bg-red-500' }
    if (strength <= 3) return { level: strength, label: 'Fair', color: 'bg-yellow-500' }
    if (strength <= 4) return { level: strength, label: 'Good', color: 'bg-blue-500' }
    return { level: strength, label: 'Strong', color: 'bg-green-500' }
  }, [createForm.masterPassword])

  useEffect(() => {
    fetchAccounts()
    fetchActiveGroups()
  }, [])

  const fetchAccounts = async () => {
    setLoading(true)
    try {
      const data = await api.getMyMT5Accounts()
      setAccounts(data)
    } catch (error) {
      showToast('Failed to load MT5 accounts', 'error')
    } finally {
      setLoading(false)
    }
  }

  const fetchActiveGroups = async () => {
    try {
      const groups = await api.getActiveGroups()
      setActiveGroups(groups)
    } catch (error) {
      console.error('Failed to load active groups:', error)
    }
  }

  const stats = {
    totalAccounts: accounts.length,
    activeAccounts: accounts.filter(a => a.copying).length,
    totalBalance: accounts.reduce((acc, a) => acc + (parseFloat(a.balance) || 0), 0),
    totalEquity: accounts.reduce((acc, a) => acc + (parseFloat(a.equity) || 0), 0),
  }

  const handleCreateAccount = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!createForm.name || !createForm.group || !createForm.leverage || !createForm.masterPassword) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Please fill all required fields' })
      return
    }

    // Password validation
    if (!passwordValidation.isValid) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Invalid Password', 
        text: 'Master password must meet all requirements: at least 8 characters with uppercase, lowercase, numbers, and special characters.' 
      })
      return
    }

    setCreating(true)
    try {
      const result = await api.createMT5Account({
        name: createForm.name,
        group: createForm.group,
        leverage: createForm.leverage,
        masterPassword: createForm.masterPassword
      })
      
      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'MT5 Account created successfully!',
        timer: 1500,
        showConfirmButton: false
      })
      
      setShowCreateModal(false)
      setCreateForm({ name: '', group: '', leverage: '1:100', masterPassword: '' })
      await fetchAccounts()
      showToast('MT5 Account created successfully!', 'success')
    } catch (error) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Error', 
        text: error.message || 'Failed to create MT5 account' 
      })
    } finally {
      setCreating(false)
    }
  }

  const handleStopCopying = (accountId) => {
    // TODO: Implement stop copying functionality
    showToast('Copying stopped successfully', 'success')
  }

  const togglePassword = (accountId, field) => {
    setShowPasswords(prev => ({ ...prev, [`${accountId}-${field}`]: !prev[`${accountId}-${field}`] }))
  }

  const columns = [
    {
      header: 'Account ID', accessor: 'accountId',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            {String(row.accountId || '').slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{row.accountId}</div>
            <div className="text-xs text-gray-500">{row.server || 'MT5-Live'} • 1:{row.leverage}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Password', accessor: 'password', align: 'center',
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <code className="text-sm font-mono text-gray-600">{showPasswords[`${row.id}-password`] ? row.password : '••••••••'}</code>
          <button onClick={() => togglePassword(row.id, 'password')} className="p-1 text-gray-400 hover:text-violet-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPasswords[`${row.id}-password`] ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} /></svg>
          </button>
        </div>
      )
    },
    {
      header: 'Investor Pass', accessor: 'investorPassword', align: 'center', hideOnMobile: true,
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <code className="text-sm font-mono text-gray-600">{showPasswords[`${row.id}-investor`] ? row.investorPassword : '••••••••'}</code>
          <button onClick={() => togglePassword(row.id, 'investor')} className="p-1 text-gray-400 hover:text-violet-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPasswords[`${row.id}-investor`] ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} /></svg>
          </button>
        </div>
      )
    },
    { 
      header: 'Balance', 
      accessor: 'balance', 
      align: 'center', 
      sortType: 'number', 
      render: (row) => <span className="font-semibold text-gray-900">${(parseFloat(row.balance) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> 
    },
    { 
      header: 'Equity', 
      accessor: 'equity', 
      align: 'center', 
      sortType: 'number', 
      hideOnMobile: true, 
      render: (row) => {
        const equity = parseFloat(row.equity) || 0
        const balance = parseFloat(row.balance) || 0
        return <span className={`font-semibold ${equity >= balance ? 'text-emerald-600' : 'text-red-500'}`}>${equity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      }
    },
    { 
      header: 'Margin', 
      accessor: 'margin', 
      align: 'center', 
      sortType: 'number', 
      hideOnTablet: true, 
      render: (row) => <span className="text-gray-700">${(parseFloat(row.margin) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> 
    },
    { 
      header: 'Free Margin', 
      accessor: 'freeMargin', 
      align: 'center', 
      sortType: 'number', 
      hideOnTablet: true, 
      render: (row) => <span className="text-gray-700">${(parseFloat(row.freeMargin) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> 
    },
    {
      header: 'Copying', accessor: 'copying', align: 'center',
      render: (row) => row.copying ? (
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>Active
          </span>
          <p className="text-xs text-gray-500 mt-1">{row.masterName || '—'}</p>
        </div>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 border border-gray-200">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>Inactive
        </span>
      )
    },
    {
      header: 'Action', accessor: 'action', align: 'center', sortable: false,
      render: (row) => row.copying ? (
        <button onClick={() => handleStopCopying(row.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>Stop
        </button>
      ) : (
        <button onClick={() => window.location.href = '/social'} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-violet-600 bg-violet-50 border border-violet-200 rounded-lg hover:bg-violet-100 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>Start Copy
        </button>
      )
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">Loading accounts...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your MT5 trading accounts</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Create MT5 Account
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Accounts', value: stats.totalAccounts, icon: '👤', bg: 'bg-violet-100 text-violet-600' },
          { title: 'Active Copying', value: stats.activeAccounts, icon: '✓', bg: 'bg-emerald-100 text-emerald-600' },
          { title: 'Total Balance', value: `$${stats.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: '💰', bg: 'bg-blue-100 text-blue-600' },
          { title: 'Total Equity', value: `$${stats.totalEquity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: '📈', bg: 'bg-amber-100 text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center text-xl`}>{stat.icon}</div>
              <div><p className="text-sm text-gray-500">{stat.title}</p><p className="text-2xl font-bold text-gray-900">{stat.value}</p></div>
            </div>
          </div>
        ))}
      </div>

      <DataTable
        title="My MT5 Accounts"
        columns={columns}
        data={accounts}
        searchable={true}
        searchPlaceholder="Search accounts..."
        pagination={true}
        pageSize={10}
        exportable={true}
        emptyMessage="No MT5 accounts yet. Click 'Create MT5 Account' to get started."
      />

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create MT5 Account</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleCreateAccount} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="Enter account name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group <span className="text-red-500">*</span></label>
                <select
                  value={createForm.group}
                  onChange={(e) => setCreateForm({ ...createForm, group: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-white"
                >
                  <option value="">Select a group</option>
                  {activeGroups.map(group => (
                    <option key={group.id} value={group.group_name}>
                      {group.display_name || group.group_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leverage <span className="text-red-500">*</span></label>
                <select
                  value={createForm.leverage}
                  onChange={(e) => setCreateForm({ ...createForm, leverage: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-white"
                >
                  {['1:50', '1:100', '1:200', '1:500', '1:1000'].map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Master Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={createForm.masterPassword}
                  onChange={(e) => setCreateForm({ ...createForm, masterPassword: e.target.value })}
                  placeholder="Enter master password"
                  required
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-white ${
                    createForm.masterPassword && !passwordValidation.isValid
                      ? 'border-red-300 focus:border-red-500'
                      : createForm.masterPassword && passwordValidation.isValid
                      ? 'border-green-300 focus:border-green-500'
                      : 'border-gray-200'
                  }`}
                />
                
                {/* Password Strength Indicator */}
                {createForm.masterPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600">Password Strength:</span>
                      <span className={`text-xs font-semibold ${
                        passwordStrength.label === 'Weak' ? 'text-red-600' :
                        passwordStrength.label === 'Fair' ? 'text-yellow-600' :
                        passwordStrength.label === 'Good' ? 'text-blue-600' :
                        'text-green-600'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Password Rules */}
                <div className="mt-3 space-y-1.5">
                  <p className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</p>
                  <div className="space-y-1">
                    <div className={`flex items-center gap-2 text-xs ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                      <svg className={`w-4 h-4 ${passwordValidation.minLength ? 'text-green-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {passwordValidation.minLength ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                      </svg>
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                      <svg className={`w-4 h-4 ${passwordValidation.hasUpperCase ? 'text-green-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {passwordValidation.hasUpperCase ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                      </svg>
                      <span>At least one uppercase letter (A-Z)</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                      <svg className={`w-4 h-4 ${passwordValidation.hasLowerCase ? 'text-green-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {passwordValidation.hasLowerCase ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                      </svg>
                      <span>At least one lowercase letter (a-z)</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                      <svg className={`w-4 h-4 ${passwordValidation.hasNumber ? 'text-green-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {passwordValidation.hasNumber ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                      </svg>
                      <span>At least one number (0-9)</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                      <svg className={`w-4 h-4 ${passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {passwordValidation.hasSpecialChar ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                      </svg>
                      <span>At least one special character (!@#$%^&*...)</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Investor password will be auto-generated.</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={creating || !createForm.name || !createForm.group || !createForm.masterPassword || !passwordValidation.isValid} className="flex-1 px-4 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {creating ? (<><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Creating...</>) : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyAccount
