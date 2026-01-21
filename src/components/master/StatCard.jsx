import React from 'react'

/**
 * StatCard - Beautiful stat card with icon, value, trend, and hover effects
 * @param {string} title - Card title
 * @param {string|number} value - Main value to display
 * @param {string} subtitle - Optional subtitle/description
 * @param {string} trend - Trend indicator (e.g., "+12.5%")
 * @param {boolean} trendUp - Whether trend is positive
 * @param {React.ReactNode} icon - Icon component
 * @param {string} iconBg - Background color class for icon container
 */
const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendUp = true, 
  icon,
  iconBg = 'bg-violet-100'
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
              <svg 
                className={`w-3 h-3 ${trendUp ? '' : 'rotate-180'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {trend}
            </div>
          )}
        </div>
        {icon && (
          <div className={`${iconBg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard

