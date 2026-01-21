import React, { useState, useRef, useEffect } from 'react'

/**
 * MiniChart - Responsive SVG-based charts with hover tooltips
 */

// Area Chart with hover tooltips - Responsive
export const AreaChart = ({ 
  data = [], 
  labels = [],
  color = '#8b5cf6',
  gradientId = 'areaGrad',
  prefix = '$'
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 500, height: 200 })
  const containerRef = useRef(null)
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const height = Math.max(180, Math.min(250, width * 0.4))
        setDimensions({ width, height })
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])
  
  if (data.length < 2) return null
  
  const { width, height } = dimensions
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  const padding = { left: 50, right: 15, top: 15, bottom: 30 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  
  const points = data.map((val, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth
    const y = padding.top + chartHeight - ((val - min) / range) * chartHeight
    return { x, y, val }
  })
  
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const areaPath = `${linePath} L${padding.left + chartWidth},${padding.top + chartHeight} L${padding.left},${padding.top + chartHeight} Z`
  
  const yTicks = 4
  const yLabels = Array.from({ length: yTicks }, (_, i) => {
    const val = min + (range * (yTicks - 1 - i)) / (yTicks - 1)
    const y = padding.top + (i / (yTicks - 1)) * chartHeight
    return { value: val, y }
  })

  const formatValue = (val) => {
    if (val >= 1000) return `${prefix}${(val/1000).toFixed(1)}k`
    return `${prefix}${Math.round(val)}`
  }

  return (
    <div ref={containerRef} className="w-full relative">
      <svg 
        width="100%" 
        height={height} 
        viewBox={`0 0 ${width} ${height}`} 
        className="block"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {yLabels.map((label, i) => (
          <g key={i}>
            <line 
              x1={padding.left} 
              y1={label.y} 
              x2={width - padding.right} 
              y2={label.y}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
            <text
              x={padding.left - 8}
              y={label.y + 4}
              textAnchor="end"
              fontSize="11"
              fill="#9ca3af"
              fontFamily="Ubuntu, sans-serif"
            >
              {formatValue(label.value)}
            </text>
          </g>
        ))}
        
        {/* Area fill */}
        <path d={areaPath} fill={`url(#${gradientId})`} />
        
        {/* Line */}
        <path 
          d={linePath} 
          stroke={color} 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Data points and hover areas */}
        {points.map((p, i) => (
          <g key={i}>
            <rect
              x={p.x - chartWidth / data.length / 2}
              y={padding.top}
              width={chartWidth / data.length}
              height={chartHeight}
              fill="transparent"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
            />
            {hoveredIndex === i && (
              <line
                x1={p.x}
                y1={padding.top}
                x2={p.x}
                y2={padding.top + chartHeight}
                stroke={color}
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.4"
              />
            )}
            <circle 
              cx={p.x} 
              cy={p.y} 
              r={hoveredIndex === i ? 5 : 3} 
              fill="white"
              stroke={color}
              strokeWidth="2"
              className="transition-all duration-150"
            />
          </g>
        ))}
        
        {/* X-axis labels */}
        {labels.length > 0 && labels.map((label, i) => {
          const x = padding.left + (i / (labels.length - 1)) * chartWidth
          return (
            <text
              key={i}
              x={x}
              y={height - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#9ca3af"
              fontFamily="Ubuntu, sans-serif"
            >
              {label}
            </text>
          )
        })}
      </svg>
      
      {/* Tooltip */}
      {hoveredIndex !== null && (
        <div 
          className="absolute bg-gray-900 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium shadow-lg pointer-events-none z-10"
          style={{
            left: points[hoveredIndex].x,
            top: points[hoveredIndex].y - 8,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="text-gray-400 text-[10px]">{labels[hoveredIndex] || ''}</div>
          <div className="font-bold">{formatValue(data[hoveredIndex])}</div>
        </div>
      )}
    </div>
  )
}

// Bar Chart with hover tooltips - Responsive
export const BarChart = ({ 
  data = [], 
  labels = [],
  color = '#8b5cf6',
  prefix = '$'
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 500, height: 200 })
  const containerRef = useRef(null)
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const height = Math.max(180, Math.min(250, width * 0.4))
        setDimensions({ width, height })
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])
  
  if (data.length === 0) return null
  
  const { width, height } = dimensions
  const max = Math.max(...data) || 1
  const padding = { left: 50, right: 15, top: 20, bottom: 30 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const barWidth = (chartWidth / data.length) * 0.65
  const gap = (chartWidth / data.length) * 0.35
  
  const yTicks = 4
  const yLabels = Array.from({ length: yTicks }, (_, i) => {
    const val = (max * (yTicks - 1 - i)) / (yTicks - 1)
    const y = padding.top + (i / (yTicks - 1)) * chartHeight
    return { value: val, y }
  })

  const formatValue = (val) => {
    if (val >= 1000) return `${prefix}${(val/1000).toFixed(1)}k`
    return `${prefix}${Math.round(val)}`
  }
  
  return (
    <div ref={containerRef} className="w-full relative">
      <svg 
        width="100%" 
        height={height} 
        viewBox={`0 0 ${width} ${height}`} 
        className="block"
      >
        {/* Grid lines */}
        {yLabels.map((label, i) => (
          <g key={i}>
            <line 
              x1={padding.left} 
              y1={label.y} 
              x2={width - padding.right} 
              y2={label.y}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
            <text
              x={padding.left - 8}
              y={label.y + 4}
              textAnchor="end"
              fontSize="11"
              fill="#9ca3af"
              fontFamily="Ubuntu, sans-serif"
            >
              {formatValue(label.value)}
            </text>
          </g>
        ))}
        
        {/* Bars */}
        {data.map((val, i) => {
          const barHeight = (val / max) * chartHeight
          const x = padding.left + i * (barWidth + gap) + gap / 2
          const y = padding.top + chartHeight - barHeight
          const isHovered = hoveredIndex === i
          
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color}
              opacity={isHovered ? 1 : 0.75}
              rx="3"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer transition-opacity duration-150"
            />
          )
        })}
        
        {/* X-axis labels */}
        {labels.length > 0 && labels.map((label, i) => {
          const x = padding.left + i * (barWidth + gap) + gap / 2 + barWidth / 2
          return (
            <text
              key={i}
              x={x}
              y={height - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#9ca3af"
              fontFamily="Ubuntu, sans-serif"
            >
              {label}
            </text>
          )
        })}
      </svg>
      
      {/* Tooltip */}
      {hoveredIndex !== null && (
        <div 
          className="absolute bg-gray-900 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium shadow-lg pointer-events-none z-10"
          style={{
            left: padding.left + hoveredIndex * (barWidth + gap) + gap / 2 + barWidth / 2,
            top: padding.top + chartHeight - (data[hoveredIndex] / max) * chartHeight - 8,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="text-gray-400 text-[10px]">{labels[hoveredIndex] || ''}</div>
          <div className="font-bold">{formatValue(data[hoveredIndex])}</div>
        </div>
      )}
    </div>
  )
}

// Donut Chart
export const DonutChart = ({ 
  value = 0, 
  max = 100, 
  size = 120,
  strokeWidth = 12,
  color = '#8b5cf6',
  bgColor = '#e5e7eb',
  label = '',
  sublabel = ''
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(value / max, 1)
  const offset = circumference - (progress * circumference)
  
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-all duration-500"
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#1f2937"
          fontFamily="Ubuntu, sans-serif"
        >
          {label}
        </text>
      </svg>
      {sublabel && <span className="text-xs text-gray-500 mt-1">{sublabel}</span>}
    </div>
  )
}

// Sparkline
export const Sparkline = ({ 
  data = [], 
  height = 40, 
  color = '#8b5cf6',
  showDot = true
}) => {
  if (data.length < 2) return null
  
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 100
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - 4 - ((val - min) / range) * (height - 8)
    return `${x},${y}`
  }).join(' ')
  
  const lastPoint = data[data.length - 1]
  const lastY = height - 4 - ((lastPoint - min) / range) * (height - 8)
  
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="block">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showDot && (
        <circle cx={width} cy={lastY} r="3" fill={color} />
      )}
    </svg>
  )
}

export default { AreaChart, BarChart, DonutChart, Sparkline }
