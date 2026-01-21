import React, { useState } from 'react'
import StatCard from '../../components/master/StatCard'
import Modal from '../../components/master/Modal'

const CommissionSettings = () => {
  const [showModal, setShowModal] = useState(false)
  const [editingTier, setEditingTier] = useState(null)
  const [globalRate, setGlobalRate] = useState(10)
  const [showGlobalModal, setShowGlobalModal] = useState(false)

  // Commission tiers
  const [tiers, setTiers] = useState([
    { id: 1, name: 'Bronze', minEquity: 0, maxEquity: 5000, rate: 8, copiers: 12 },
    { id: 2, name: 'Silver', minEquity: 5001, maxEquity: 15000, rate: 10, copiers: 18 },
    { id: 3, name: 'Gold', minEquity: 15001, maxEquity: 50000, rate: 12, copiers: 8 },
    { id: 4, name: 'Platinum', minEquity: 50001, maxEquity: null, rate: 15, copiers: 3 },
  ])

  // Individual copier rates
  const [copierRates, setCopierRates] = useState([
    { id: 1, name: 'John Smith', login: '392847', equity: 15000, tier: 'Silver', customRate: null, effectiveRate: 10 },
    { id: 2, name: 'Sarah Wilson', login: '482916', equity: 25000, tier: 'Gold', customRate: 11, effectiveRate: 11 },
    { id: 3, name: 'Mike Johnson', login: '571829', equity: 8500, tier: 'Silver', customRate: null, effectiveRate: 10 },
    { id: 4, name: 'Emily Davis', login: '639182', equity: 42000, tier: 'Gold', customRate: null, effectiveRate: 12 },
    { id: 5, name: 'Chris Brown', login: '728391', equity: 12000, tier: 'Silver', customRate: 9, effectiveRate: 9 },
    { id: 6, name: 'Robert Garcia', login: '293847', equity: 55000, tier: 'Platinum', customRate: null, effectiveRate: 15 },
  ])

  const [editingCopier, setEditingCopier] = useState(null)
  const [showCopierModal, setShowCopierModal] = useState(false)

  const handleSaveTier = (tierId, newRate) => {
    setTiers(tiers.map(t => t.id === tierId ? { ...t, rate: newRate } : t))
    setShowModal(false)
    setEditingTier(null)
  }

  const handleSaveCopierRate = (copierId, newRate) => {
    setCopierRates(copierRates.map(c => 
      c.id === copierId 
        ? { ...c, customRate: newRate || null, effectiveRate: newRate || tiers.find(t => t.name === c.tier)?.rate || globalRate }
        : c
    ))
    setShowCopierModal(false)
    setEditingCopier(null)
  }

  const getTierColor = (tierName) => {
    switch(tierName) {
      case 'Bronze': return 'from-amber-600 to-amber-700'
      case 'Silver': return 'from-gray-400 to-gray-500'
      case 'Gold': return 'from-yellow-500 to-yellow-600'
      case 'Platinum': return 'from-violet-500 to-violet-600'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getTierBgColor = (tierName) => {
    switch(tierName) {
      case 'Bronze': return 'bg-amber-50 border-amber-200 text-amber-700'
      case 'Silver': return 'bg-gray-50 border-gray-200 text-gray-700'
      case 'Gold': return 'bg-yellow-50 border-yellow-200 text-yellow-700'
      case 'Platinum': return 'bg-violet-50 border-violet-200 text-violet-700'
      default: return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Commission Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure commission rates for copy trading profits</p>
        </div>
        <button
          onClick={() => setShowGlobalModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Global Settings
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Default Rate"
          value={`${globalRate}%`}
          subtitle="Global commission"
          iconBg="bg-violet-100"
          icon={
            <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Active Tiers"
          value={tiers.length}
          subtitle="Commission brackets"
          iconBg="bg-blue-100"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        <StatCard
          title="Custom Rates"
          value={copierRates.filter(c => c.customRate).length}
          subtitle="Individual overrides"
          iconBg="bg-amber-100"
          icon={
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
        />
        <StatCard
          title="Avg. Rate"
          value={`${(copierRates.reduce((sum, c) => sum + c.effectiveRate, 0) / copierRates.length).toFixed(1)}%`}
          subtitle="Across all copiers"
          iconBg="bg-emerald-100"
          icon={
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
      </div>

      {/* Commission Tiers */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Commission Tiers</h3>
          <p className="text-xs text-gray-500 mt-1">Set different rates based on copier equity levels</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <div 
                key={tier.id}
                className="relative bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-300 group"
              >
                {/* Tier Badge */}
                <div className={`absolute -top-3 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${getTierColor(tier.name)} text-white text-xs font-semibold shadow-lg`}>
                  {tier.name}
                </div>
                
                {/* Content */}
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{tier.rate}%</div>
                  <div className="text-xs text-gray-500 mb-4">Commission Rate</div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-500">Min Equity</span>
                      <span className="font-medium text-gray-900">${tier.minEquity.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-500">Max Equity</span>
                      <span className="font-medium text-gray-900">
                        {tier.maxEquity ? `$${tier.maxEquity.toLocaleString()}` : 'Unlimited'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-gray-500">Copiers</span>
                      <span className="font-medium text-violet-600">{tier.copiers}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => { setEditingTier(tier); setShowModal(true) }}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-gray-100 hover:bg-violet-100 text-gray-500 hover:text-violet-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Copier Rates */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Individual Copier Rates</h3>
          <p className="text-xs text-gray-500 mt-1">Override tier rates for specific copiers</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-3 px-5 text-xs font-semibold text-gray-600">Copier</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-gray-600">Equity</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-gray-600">Tier</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-gray-600">Tier Rate</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-gray-600">Custom Rate</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-gray-600">Effective Rate</th>
                <th className="text-left py-3 px-5 text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {copierRates.map((copier) => (
                <tr key={copier.id} className="border-b border-gray-50 hover:bg-violet-50/30 transition-colors">
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 aspect-square">
                        {copier.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{copier.name}</p>
                        <p className="text-xs text-gray-500">#{copier.login}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5 font-medium text-gray-900 whitespace-nowrap">${copier.equity.toLocaleString()}</td>
                  <td className="py-3 px-5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getTierBgColor(copier.tier)}`}>
                      {copier.tier}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-gray-600 whitespace-nowrap">
                    {tiers.find(t => t.name === copier.tier)?.rate || globalRate}%
                  </td>
                  <td className="py-3 px-5">
                    {copier.customRate ? (
                      <span className="px-2.5 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium whitespace-nowrap">
                        {copier.customRate}% (custom)
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-lg font-bold text-violet-600">{copier.effectiveRate}%</span>
                  </td>
                  <td className="py-3 px-5">
                    <button
                      onClick={() => { setEditingCopier(copier); setShowCopierModal(true) }}
                      className="p-2 rounded-lg hover:bg-violet-100 text-gray-500 hover:text-violet-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Tier Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingTier(null) }}
        title={`Edit ${editingTier?.name} Tier Rate`}
        size="sm"
      >
        {editingTier && (
          <EditTierForm 
            tier={editingTier} 
            onSave={handleSaveTier} 
            onCancel={() => { setShowModal(false); setEditingTier(null) }}
          />
        )}
      </Modal>

      {/* Edit Copier Rate Modal */}
      <Modal
        isOpen={showCopierModal}
        onClose={() => { setShowCopierModal(false); setEditingCopier(null) }}
        title="Edit Custom Rate"
        size="sm"
      >
        {editingCopier && (
          <EditCopierRateForm 
            copier={editingCopier}
            tiers={tiers}
            onSave={handleSaveCopierRate} 
            onCancel={() => { setShowCopierModal(false); setEditingCopier(null) }}
          />
        )}
      </Modal>

      {/* Global Settings Modal */}
      <Modal
        isOpen={showGlobalModal}
        onClose={() => setShowGlobalModal(false)}
        title="Global Commission Settings"
        size="sm"
      >
        <GlobalSettingsForm 
          currentRate={globalRate}
          onSave={(rate) => { setGlobalRate(rate); setShowGlobalModal(false) }}
          onCancel={() => setShowGlobalModal(false)}
        />
      </Modal>
    </div>
  )
}

// Edit Tier Form Component
const EditTierForm = ({ tier, onSave, onCancel }) => {
  const [rate, setRate] = useState(tier.rate)

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          step="0.5"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
          className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-2">
          This rate applies to copiers with equity between ${tier.minEquity.toLocaleString()} 
          {tier.maxEquity ? ` and $${tier.maxEquity.toLocaleString()}` : '+'}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(tier.id, rate)}
          className="flex-1 h-11 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

// Edit Copier Rate Form Component
const EditCopierRateForm = ({ copier, tiers, onSave, onCancel }) => {
  const [customRate, setCustomRate] = useState(copier.customRate || '')
  const tierRate = tiers.find(t => t.name === copier.tier)?.rate || 10

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-bold">
          {copier.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{copier.name}</p>
          <p className="text-xs text-gray-500">Current tier rate: {tierRate}%</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Custom Rate (%) - Leave empty to use tier rate</label>
        <input
          type="number"
          min="0"
          max="100"
          step="0.5"
          value={customRate}
          onChange={(e) => setCustomRate(e.target.value)}
          placeholder={`Tier rate: ${tierRate}%`}
          className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(copier.id, customRate ? parseFloat(customRate) : null)}
          className="flex-1 h-11 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

// Global Settings Form Component
const GlobalSettingsForm = ({ currentRate, onSave, onCancel }) => {
  const [rate, setRate] = useState(currentRate)

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Default Commission Rate (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          step="0.5"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
          className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-2">
          This rate applies when no tier or custom rate is set
        </p>
      </div>
      
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xs text-amber-700">
            Changing the global rate will affect all copiers who don't have a tier or custom rate assigned.
          </p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(rate)}
          className="flex-1 h-11 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}

export default CommissionSettings

