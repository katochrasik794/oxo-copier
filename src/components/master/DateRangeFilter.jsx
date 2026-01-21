import React, { useState } from 'react'

/**
 * DateRangeFilter - Reusable date range selector for charts
 */
const DateRangeFilter = ({ 
  value = '1M', 
  onChange,
  options = ['1D', '1W', '1M', '3M', '1Y', 'All']
}) => {
  const [showCustom, setShowCustom] = useState(false)
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')

  const handleSelect = (option) => {
    if (option === 'Custom') {
      setShowCustom(true)
    } else {
      setShowCustom(false)
      onChange(option)
    }
  }

  const handleCustomApply = () => {
    if (customFrom && customTo) {
      onChange(`${customFrom} - ${customTo}`)
      setShowCustom(false)
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              value === option
                ? 'bg-white text-violet-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {option}
          </button>
        ))}
        <button
          onClick={() => setShowCustom(!showCustom)}
          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${
            showCustom || value.includes('-')
              ? 'bg-white text-violet-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Custom
        </button>
      </div>

      {/* Custom Date Picker Dropdown */}
      {showCustom && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-20 min-w-[280px]">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="w-full h-9 px-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="w-full h-9 px-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowCustom(false)}
                className="flex-1 h-8 text-xs font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomApply}
                className="flex-1 h-8 text-xs font-medium rounded-lg bg-violet-600 text-white hover:bg-violet-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateRangeFilter

