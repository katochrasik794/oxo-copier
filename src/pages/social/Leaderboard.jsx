import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../utils/api"
import DataTable from "../../components/social/DataTable"

const Leaderboard = () => {
  const navigate = useNavigate()
  const [traders, setTraders] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("table")

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const masters = await api.getMasters()
        const formattedMasters = masters.map(m => ({
          id: m.id,
          name: m.name,
          strategy: "Multi-Asset Strategy",
          avatar: "https://ui-avatars.com/api/?name=" + m.name + "&background=7C3AED&color=fff",
          days: Math.floor(Math.random() * 365) + 30,
          returnTotal: (Math.random() * 150 + 20).toFixed(1),
          return7d: (Math.random() * 20 - 5).toFixed(1),
          score: Math.floor(Math.random() * 40 + 60),
          followers: Math.floor(Math.random() * 500 + 50),
          aum: (Math.random() * 100000 + 10000).toFixed(0),
          risk: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
          winRate: (Math.random() * 30 + 60).toFixed(1),
          chartData: Array.from({ length: 12 }, () => Math.random() * 100 + 20),
        }))
        setTraders(formattedMasters)
      } catch (error) {
        console.error("Failed to fetch masters", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMasters()
  }, [])

  const columns = [
    {
      header: 'Trader',
      accessor: 'name',
      render: (row) => (
        <button onClick={() => navigate(`/social/trader/${row.id}`)} className="flex items-center gap-3 text-left group">
          <img src={row.avatar} alt={row.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow" />
          <div>
            <div className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{row.name}</div>
            <div className="text-xs text-gray-500">{row.strategy}</div>
          </div>
        </button>
      )
    },
    {
      header: 'Risk',
      accessor: 'risk',
      align: 'center',
      render: (row) => <RiskBadge level={row.risk} />
    },
    {
      header: 'Return',
      accessor: 'returnTotal',
      align: 'center',
      sortType: 'number',
      render: (row) => <span className="font-bold text-emerald-600">+{row.returnTotal}%</span>
    },
    {
      header: '7D Return',
      accessor: 'return7d',
      align: 'center',
      sortType: 'number',
      hideOnMobile: true,
      render: (row) => {
        const positive = parseFloat(row.return7d) >= 0
        return <span className={`font-semibold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>{positive ? '+' : ''}{row.return7d}%</span>
      }
    },
    {
      header: 'Score',
      accessor: 'score',
      align: 'center',
      sortType: 'number',
      hideOnMobile: true,
      render: (row) => (
        <div className="inline-flex items-center gap-1.5">
          <ScoreRing score={row.score} size="sm" />
          <span className="font-semibold text-gray-900">{row.score}</span>
        </div>
      )
    },
    {
      header: 'Followers',
      accessor: 'followers',
      align: 'center',
      sortType: 'number',
      hideOnTablet: true,
      render: (row) => <span className="text-gray-700 font-medium">{row.followers}</span>
    },
    {
      header: 'Chart',
      accessor: 'chartData',
      align: 'center',
      sortable: false,
      hideOnTablet: true,
      render: (row) => <MiniSparkline data={row.chartData} />
    },
    {
      header: 'Action',
      accessor: 'action',
      align: 'center',
      sortable: false,
      render: (row) => (
        <button
          onClick={() => navigate(`/social/subscribe/${row.id}`)}
          className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors shadow-sm"
        >
          Follow
        </button>
      )
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-200 border-t-violet-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-gray-500 text-sm mt-1">Discover top performing traders and start copying</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "table" ? "bg-violet-100 text-violet-600" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "cards" ? "bg-violet-100 text-violet-600" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <DataTable
          columns={columns}
          data={traders}
          searchable={true}
          searchPlaceholder="Search traders by name or strategy..."
          pagination={true}
          pageSize={10}
          emptyMessage="No traders found"
        />
      )}

      {/* Cards View */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {traders.map((trader) => (
            <TraderCard 
              key={trader.id} 
              trader={trader} 
              onView={() => navigate(`/social/trader/${trader.id}`)}
              onFollow={() => navigate(`/social/subscribe/${trader.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Card Component
const TraderCard = ({ trader, onView, onFollow }) => {
  const positive7d = parseFloat(trader.return7d) >= 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-violet-200 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <button onClick={onView} className="flex items-center gap-3 text-left group">
          <img src={trader.avatar} alt={trader.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow" />
          <div>
            <div className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{trader.name}</div>
            <div className="text-xs text-gray-500">{trader.days} days</div>
          </div>
        </button>
        <RiskBadge level={trader.risk} />
      </div>

      <div className="mb-4">
        <MiniSparkline data={trader.chartData} height={60} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-emerald-600">+{trader.returnTotal}%</div>
          <div className="text-xs text-gray-500">Total Return</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className={`text-lg font-bold ${positive7d ? 'text-emerald-600' : 'text-red-500'}`}>
            {positive7d ? '+' : ''}{trader.return7d}%
          </div>
          <div className="text-xs text-gray-500">7D Return</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">{trader.winRate}%</div>
          <div className="text-xs text-gray-500">Win Rate</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {trader.followers}
          </span>
          <span className="flex items-center gap-1">
            <ScoreRing score={trader.score} size="xs" />
            {trader.score}
          </span>
        </div>
        <button
          onClick={onFollow}
          className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors shadow-sm"
        >
          Follow
        </button>
      </div>
    </div>
  )
}

// Risk Badge
const RiskBadge = ({ level }) => {
  const colors = {
    low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    high: 'bg-red-100 text-red-700 border-red-200',
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${colors[level]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${level === 'low' ? 'bg-emerald-500' : level === 'medium' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  )
}

// Score Ring
const ScoreRing = ({ score, size = "sm" }) => {
  const sizes = { xs: "w-5 h-5", sm: "w-6 h-6" }
  const circumference = 2 * Math.PI * 8
  const offset = circumference - (score / 100) * circumference

  return (
    <svg className={sizes[size]} viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8" fill="none" stroke="#E5E7EB" strokeWidth="2" />
      <circle cx="10" cy="10" r="8" fill="none" stroke="#7C3AED" strokeWidth="2" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 10 10)" />
    </svg>
  )
}

// Mini Sparkline
const MiniSparkline = ({ data = [], height = 40 }) => {
  const W = 120
  const H = height
  if (!data || data.length < 2) return null

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = Math.max(1, max - min)

  const x = (i) => (i / (data.length - 1)) * (W - 4) + 2
  const y = (v) => H - 4 - ((v - min) / range) * (H - 8)

  const line = data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(" ")
  const area = `${line} L${x(data.length - 1).toFixed(2)},${H - 2} L${x(0).toFixed(2)},${H - 2} Z`
  const positive = data[data.length - 1] >= data[0]
  const stroke = positive ? "#10b981" : "#ef4444"

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block">
      <defs>
        <linearGradient id={`spark-grad-${positive ? 'up' : 'down'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.2" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-grad-${positive ? 'up' : 'down'})`} />
      <path d={line} fill="none" stroke={stroke} strokeWidth="2" />
    </svg>
  )
}

export default Leaderboard
