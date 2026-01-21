import React from 'react'

/**
 * TabButton - Styled tab navigation button
 */
const TabButton = ({ 
  active = false, 
  onClick, 
  children,
  icon,
  badge
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
        ${active 
          ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' 
          : 'text-gray-600 hover:bg-violet-50 hover:text-violet-700'
        }
      `}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
      {badge && (
        <span className={`
          ml-1.5 px-1.5 py-0.5 text-xs font-semibold rounded-full
          ${active ? 'bg-white/20 text-white' : 'bg-violet-100 text-violet-700'}
        `}>
          {badge}
        </span>
      )}
    </button>
  )
}

/**
 * TabGroup - Container for tabs
 */
export const TabGroup = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-wrap items-center gap-1 p-1 bg-gray-100 rounded-xl ${className}`}>
      {children}
    </div>
  )
}

export default TabButton

