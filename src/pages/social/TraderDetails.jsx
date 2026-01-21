import React, { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import api from "../../utils/api"
import DataTable from "../../components/social/DataTable"

const TraderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("performance")
  const [trader, setTrader] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrader = async () => {
      try {
        const user = await api.getUser(id)
        if (user) {
          setTrader({
            id: user.id,
            name: user.name,
            strategy: "Multi-Asset Strategy",
            avatar: "https://ui-avatars.com/api/?name=" + user.name + "&background=7C3AED&color=fff",
            returnPct: (Math.random() * 100 + 20).toFixed(1),
            drawdown: (Math.random() * 15 + 5).toFixed(1),
            risk: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
            trades: Math.floor(Math.random() * 500 + 100),
            equityUSD: Math.floor(Math.random() * 50000 + 10000),
            activeSince: new Date(user.created_at).toLocaleDateString(),
            score: Math.floor(Math.random() * 30 + 70),
            winRate: (Math.random() * 25 + 60).toFixed(1),
            profitFactor: (Math.random() * 1.5 + 1).toFixed(2),
            avgTrade: (Math.random() * 50 + 20).toFixed(2),
            followers: Math.floor(Math.random() * 300 + 50),
            aum: Math.floor(Math.random() * 200000 + 50000),
            performanceFee: Math.floor(Math.random() * 20 + 10),
            volumeFee: (Math.random() * 2).toFixed(1),
            chartData: Array.from({ length: 30 }, () => Math.random() * 100 + 50),
            monthly: Array.from({ length: 12 }, (_, i) => ({ m: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i], v: (Math.random() * 20 - 5).toFixed(1) })),
            history: [
              { id: 1, symbol: 'EUR/USD', type: 'Buy', volume: 0.5, openTime: '2024-12-09 10:30', closeTime: '2024-12-09 14:45', profit: 125.50 },
              { id: 2, symbol: 'GBP/JPY', type: 'Sell', volume: 0.3, openTime: '2024-12-08 09:15', closeTime: '2024-12-08 11:30', profit: -45.20 },
              { id: 3, symbol: 'XAU/USD', type: 'Buy', volume: 0.1, openTime: '2024-12-07 15:00', closeTime: '2024-12-07 18:30', profit: 89.00 },
              { id: 4, symbol: 'USD/CAD', type: 'Sell', volume: 0.4, openTime: '2024-12-06 11:45', closeTime: '2024-12-06 16:20', profit: 67.80 },
              { id: 5, symbol: 'EUR/GBP', type: 'Buy', volume: 0.2, openTime: '2024-12-05 14:30', closeTime: '2024-12-05 17:00', profit: -28.50 },
            ],
          })
        }
      } catch (error) {
        console.error("Failed to fetch trader", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrader()
  }, [id])

  const historyColumns = [
    { header: 'Symbol', accessor: 'symbol', render: (row) => <span className="font-medium text-gray-900">{row.symbol}</span> },
    {
      header: 'Type', accessor: 'type', align: 'center',
      render: (row) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${row.type === 'Buy' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
          {row.type}
        </span>
      )
    },
    { header: 'Volume', accessor: 'volume', align: 'center', hideOnMobile: true, render: (row) => <span className="text-gray-700">{row.volume}</span> },
    { header: 'Open', accessor: 'openTime', align: 'center', hideOnMobile: true, render: (row) => <span className="text-gray-600 text-sm">{row.openTime}</span> },
    { header: 'Close', accessor: 'closeTime', align: 'center', hideOnMobile: true, render: (row) => <span className="text-gray-600 text-sm">{row.closeTime}</span> },
    {
      header: 'Profit', accessor: 'profit', align: 'center', sortType: 'number',
      render: (row) => <span className={`font-bold ${row.profit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{row.profit >= 0 ? '+' : ''}${row.profit.toFixed(2)}</span>
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-200 border-t-violet-600"></div>
      </div>
    )
  }

  if (!trader) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Trader Not Found</h2>
        <Link to="/social" className="text-violet-600 hover:text-violet-700 font-medium">Back to Leaderboard</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <Link to="/social" className="text-gray-500 hover:text-violet-600">Leaderboard</Link>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-900 font-medium">{trader.name}</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
            <img src={trader.avatar} alt={trader.name} className="w-16 h-16 rounded-full ring-4 ring-violet-100" />
              <div>
                <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">{trader.name}</h1>
                <RiskBadge level={trader.risk} />
              </div>
              <p className="text-gray-500">{trader.strategy}</p>
              <p className="text-sm text-gray-400 mt-1">Active since {trader.activeSince}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center px-4"><ScoreRing score={trader.score} /><p className="text-xs text-gray-500 mt-1">Score</p></div>
            <button onClick={() => navigate(`/social/subscribe/${id}`)} className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Follow Trader
            </button>
          </div>
        </div>
          </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <StatCard label="Return" value={`+${trader.returnPct}%`} valueColor="text-emerald-600" />
        <StatCard label="Win Rate" value={`${trader.winRate}%`} />
        <StatCard label="Profit Factor" value={trader.profitFactor} valueColor="text-violet-600" />
        <StatCard label="Max Drawdown" value={`-${trader.drawdown}%`} valueColor="text-red-500" />
        <StatCard label="Followers" value={trader.followers} />
        <StatCard label="AUM" value={`$${(trader.aum / 1000).toFixed(0)}K`} />
        </div>

      <div className="bg-white rounded-xl border border-gray-200">
          <div className="border-b border-gray-200">
          <div className="flex gap-1 p-1">
            {[{ id: 'performance', label: 'Performance' }, { id: 'statistics', label: 'Statistics' }, { id: 'history', label: 'Trade History' }, { id: 'fees', label: 'Fees' }].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-violet-100 text-violet-700' : 'text-gray-600 hover:bg-gray-100'}`}>{tab.label}</button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div><h3 className="text-lg font-semibold text-gray-900 mb-4">Equity Curve</h3><PerformanceChart data={trader.chartData} /></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Returns</h3>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                  {trader.monthly.map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="h-20 flex items-end justify-center pb-1">
                        <div className={`w-full max-w-[24px] rounded-t ${parseFloat(m.v) >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ height: `${Math.abs(parseFloat(m.v)) * 4}%`, minHeight: '4px' }} />
              </div>
                      <p className={`text-xs font-medium ${parseFloat(m.v) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{m.v}%</p>
                      <p className="text-xs text-gray-400">{m.m}</p>
          </div>
                  ))}
            </div>
          </div>
        </div>
          )}

          {activeTab === 'statistics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                <MetricRow label="Total Return" value={`+${trader.returnPct}%`} positive />
                <MetricRow label="Win Rate" value={`${trader.winRate}%`} neutral />
                <MetricRow label="Profit Factor" value={trader.profitFactor} neutral />
                <MetricRow label="Max Drawdown" value={`-${trader.drawdown}%`} positive={false} />
                <MetricRow label="Sharpe Ratio" value="1.42" neutral />
      </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Trading</h3>
                <MetricRow label="Total Trades" value={trader.trades} neutral />
                <MetricRow label="Avg Trade" value={`$${trader.avgTrade}`} positive />
                <MetricRow label="Equity" value={`$${trader.equityUSD.toLocaleString()}`} neutral />
                <MetricRow label="Followers" value={trader.followers} neutral />
                <MetricRow label="AUM" value={`$${trader.aum.toLocaleString()}`} neutral />
          </div>
        </div>
      )}

          {activeTab === 'history' && (
            <DataTable
              columns={historyColumns}
              data={trader.history}
              searchable={true}
              searchPlaceholder="Search trades..."
              pagination={true}
              pageSize={10}
              exportable={true}
              emptyMessage="No trade history"
            />
          )}

          {activeTab === 'fees' && (
            <div className="max-w-md space-y-4">
              {[{ title: 'Performance Fee', subtitle: '% from net profit', value: `${trader.performanceFee}%`, color: 'text-violet-600' }, { title: 'Volume Fee', subtitle: 'USD per lot', value: `$${trader.volumeFee}`, color: 'text-gray-900' }, { title: 'Joining Fee', subtitle: 'One-time payment', value: 'Free', color: 'text-emerald-600' }].map((fee, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div><div className="font-medium text-gray-900">{fee.title}</div><div className="text-sm text-gray-500">{fee.subtitle}</div></div>
                  <div className={`text-xl font-bold ${fee.color}`}>{fee.value}</div>
        </div>
      ))}
    </div>
          )}
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ label, value, valueColor = 'text-gray-900' }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-xl font-bold mt-1 ${valueColor}`}>{value}</p>
  </div>
)

const RiskBadge = ({ level }) => {
  const colors = { low: 'bg-emerald-100 text-emerald-700 border-emerald-200', medium: 'bg-amber-100 text-amber-700 border-amber-200', high: 'bg-red-100 text-red-700 border-red-200' }
  return <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${colors[level]}`}>{level.charAt(0).toUpperCase() + level.slice(1)} Risk</span>
}

const ScoreRing = ({ score }) => {
  const circumference = 2 * Math.PI * 28
  const offset = circumference - (score / 100) * circumference
  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="none" stroke="#E5E7EB" strokeWidth="4" />
        <circle cx="32" cy="32" r="28" fill="none" stroke="#7C3AED" strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg font-bold text-gray-900">{score}</span></div>
    </div>
  )
}

const MetricRow = ({ label, value, positive, neutral }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-600">{label}</span>
    <span className={`font-semibold ${neutral ? 'text-gray-900' : positive ? 'text-emerald-600' : 'text-red-500'}`}>{value}</span>
  </div>
)

const PerformanceChart = ({ data }) => {
  const W = 800, H = 200, padding = { top: 20, right: 20, bottom: 30, left: 50 }
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1
  const xScale = (i) => padding.left + (i / (data.length - 1)) * (W - padding.left - padding.right)
  const yScale = (v) => padding.top + (1 - (v - min) / range) * (H - padding.top - padding.bottom)
  const linePath = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(v)}`).join(' ')
  const areaPath = `${linePath} L${xScale(data.length - 1)},${H - padding.bottom} L${xScale(0)},${H - padding.bottom} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-48">
      <defs><linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" /><stop offset="100%" stopColor="#7C3AED" stopOpacity="0.02" /></linearGradient></defs>
      {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (<line key={i} x1={padding.left} y1={padding.top + pct * (H - padding.top - padding.bottom)} x2={W - padding.right} y2={padding.top + pct * (H - padding.top - padding.bottom)} stroke="#E5E7EB" strokeDasharray="4,4" />))}
      <path d={areaPath} fill="url(#chartGradient)" />
      <path d={linePath} fill="none" stroke="#7C3AED" strokeWidth="2.5" />
    </svg>
  )
}

export default TraderDetails
