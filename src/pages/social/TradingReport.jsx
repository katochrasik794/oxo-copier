import React, { useState, useMemo } from 'react'
import DataTable from '../../components/social/DataTable'

const TradingReport = () => {
  const [dateRange, setDateRange] = useState('1M')
  const [selectedMaster, setSelectedMaster] = useState('all')

  // Mock stats data
  const stats = {
    totalProfit: 2485.70,
    totalTrades: 279,
    winRate: 68.5,
    avgProfit: 45.20,
    avgLoss: -32.15,
    maxDrawdown: -8.2,
    profitFactor: 1.85,
    sharpeRatio: 1.42,
  }

  // Mock chart data
  const equityData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    equity: 10000 + Math.random() * 3000 + i * 50,
  }))

  // Mock trade history
  const [tradeHistory] = useState([
    { id: 1, symbol: 'EUR/USD', type: 'Buy', volume: 0.5, openTime: '2024-12-09 10:30', closeTime: '2024-12-09 14:45', profit: 125.50, pips: 25.1, master: 'Alex Trading' },
    { id: 2, symbol: 'GBP/JPY', type: 'Sell', volume: 0.3, openTime: '2024-12-09 09:15', closeTime: '2024-12-09 11:30', profit: -45.20, pips: -15.1, master: 'Pro Trader FX' },
    { id: 3, symbol: 'XAU/USD', type: 'Buy', volume: 0.1, openTime: '2024-12-08 15:00', closeTime: '2024-12-08 18:30', profit: 89.00, pips: 8.9, master: 'Alex Trading' },
    { id: 4, symbol: 'USD/CAD', type: 'Sell', volume: 0.4, openTime: '2024-12-08 11:45', closeTime: '2024-12-08 16:20', profit: 67.80, pips: 16.95, master: 'Pro Trader FX' },
    { id: 5, symbol: 'EUR/GBP', type: 'Buy', volume: 0.2, openTime: '2024-12-07 14:30', closeTime: '2024-12-07 17:00', profit: -28.50, pips: -14.25, master: 'Crypto Master' },
    { id: 6, symbol: 'AUD/USD', type: 'Buy', volume: 0.6, openTime: '2024-12-07 09:00', closeTime: '2024-12-07 13:45', profit: 156.30, pips: 26.05, master: 'Alex Trading' },
    { id: 7, symbol: 'NZD/USD', type: 'Sell', volume: 0.25, openTime: '2024-12-06 16:15', closeTime: '2024-12-06 19:30', profit: 42.00, pips: 16.8, master: 'Pro Trader FX' },
    { id: 8, symbol: 'USD/JPY', type: 'Buy', volume: 0.35, openTime: '2024-12-06 10:00', closeTime: '2024-12-06 14:15', profit: 78.25, pips: 22.36, master: 'Alex Trading' },
  ])

  const masters = ['all', 'Alex Trading', 'Pro Trader FX', 'Crypto Master']

  const filteredTrades = useMemo(() => {
    if (selectedMaster === 'all') return tradeHistory
    return tradeHistory.filter(t => t.master === selectedMaster)
  }, [selectedMaster, tradeHistory])

  const tradeColumns = [
    {
      header: 'Symbol',
      accessor: 'symbol',
      render: (row) => <span className="font-semibold text-gray-900">{row.symbol}</span>
    },
    {
      header: 'Type',
      accessor: 'type',
      align: 'center',
      render: (row) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
          row.type === 'Buy' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${row.type === 'Buy' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
          {row.type}
        </span>
      )
    },
    {
      header: 'Volume',
      accessor: 'volume',
      align: 'center',
      hideOnMobile: true,
      render: (row) => <span className="text-gray-700">{row.volume}</span>
    },
    {
      header: 'Open Time',
      accessor: 'openTime',
      align: 'center',
      hideOnMobile: true,
      render: (row) => <span className="text-gray-600 text-sm">{row.openTime}</span>
    },
    {
      header: 'Close Time',
      accessor: 'closeTime',
      align: 'center',
      hideOnMobile: true,
      render: (row) => <span className="text-gray-600 text-sm">{row.closeTime}</span>
    },
    {
      header: 'Pips',
      accessor: 'pips',
      align: 'center',
      sortType: 'number',
      hideOnTablet: true,
      render: (row) => (
        <span className={row.pips >= 0 ? 'text-emerald-600' : 'text-red-500'}>
          {row.pips >= 0 ? '+' : ''}{row.pips}
        </span>
      )
    },
    {
      header: 'Profit',
      accessor: 'profit',
      align: 'center',
      sortType: 'number',
      render: (row) => (
        <span className={`font-bold ${row.profit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {row.profit >= 0 ? '+' : ''}${row.profit.toFixed(2)}
        </span>
      )
    },
    {
      header: 'Master',
      accessor: 'master',
      align: 'center',
      hideOnTablet: true,
      render: (row) => <span className="text-sm text-gray-600">{row.master}</span>
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trading Report</h1>
          <p className="text-gray-500 text-sm mt-1">Analyze your copy trading performance</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            {['1D', '1W', '1M', '3M', '1Y', 'All'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  dateRange === range ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <select
            value={selectedMaster}
            onChange={(e) => setSelectedMaster(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-white"
          >
            {masters.map((master) => (
              <option key={master} value={master}>{master === 'all' ? 'All Masters' : master}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Profit" value={`$${stats.totalProfit.toFixed(2)}`} valueColor={stats.totalProfit >= 0 ? 'text-emerald-600' : 'text-red-500'} subtitle="All time" />
        <StatCard title="Win Rate" value={`${stats.winRate}%`} valueColor="text-gray-900" subtitle={`${stats.totalTrades} trades`} />
        <StatCard title="Profit Factor" value={stats.profitFactor.toFixed(2)} valueColor="text-violet-600" subtitle="Risk/Reward" />
        <StatCard title="Max Drawdown" value={`${stats.maxDrawdown}%`} valueColor="text-red-500" subtitle="Peak to trough" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Equity Curve</h3>
          <EquityChart data={equityData} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <MetricRow label="Average Profit" value={`$${stats.avgProfit.toFixed(2)}`} positive />
            <MetricRow label="Average Loss" value={`$${Math.abs(stats.avgLoss).toFixed(2)}`} positive={false} />
            <MetricRow label="Sharpe Ratio" value={stats.sharpeRatio.toFixed(2)} neutral />
            <MetricRow label="Total Trades" value={stats.totalTrades} neutral />
            <MetricRow label="Winning Trades" value={Math.round(stats.totalTrades * stats.winRate / 100)} positive />
            <MetricRow label="Losing Trades" value={Math.round(stats.totalTrades * (100 - stats.winRate) / 100)} positive={false} />
          </div>
        </div>
      </div>

      {/* Win/Loss Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Win/Loss Distribution</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex h-8 rounded-lg overflow-hidden">
              <div className="bg-emerald-500" style={{ width: `${stats.winRate}%` }}></div>
              <div className="bg-red-500" style={{ width: `${100 - stats.winRate}%` }}></div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500"></span>
              Wins: {stats.winRate}%
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-red-500"></span>
              Losses: {(100 - stats.winRate).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Trade History DataTable */}
      <DataTable
        title="Trade History"
        columns={tradeColumns}
        data={filteredTrades}
        searchable={true}
        searchPlaceholder="Search trades..."
        pagination={true}
        pageSize={10}
        exportable={true}
        emptyMessage="No trades found"
      />
    </div>
  )
}

// Stat Card
const StatCard = ({ title, value, valueColor, subtitle }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{value}</p>
    <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
  </div>
)

// Metric Row
const MetricRow = ({ label, value, positive, neutral }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-600">{label}</span>
    <span className={`font-semibold ${neutral ? 'text-gray-900' : positive ? 'text-emerald-600' : 'text-red-500'}`}>{value}</span>
  </div>
)

// Equity Chart
const EquityChart = ({ data }) => {
  const W = 500
  const H = 200
  const padding = { top: 20, right: 20, bottom: 40, left: 60 }
  const values = data.map(d => d.equity)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const xScale = (i) => padding.left + (i / (data.length - 1)) * (W - padding.left - padding.right)
  const yScale = (v) => padding.top + (1 - (v - min) / range) * (H - padding.top - padding.bottom)
  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.equity)}`).join(' ')
  const areaPath = `${linePath} L${xScale(data.length - 1)},${H - padding.bottom} L${xScale(0)},${H - padding.bottom} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-48">
      <defs>
        <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
        <line key={i} x1={padding.left} y1={padding.top + pct * (H - padding.top - padding.bottom)} x2={W - padding.right} y2={padding.top + pct * (H - padding.top - padding.bottom)} stroke="#E5E7EB" strokeDasharray="4,4" />
      ))}
      {[0, 0.5, 1].map((pct, i) => (
        <text key={i} x={padding.left - 10} y={padding.top + pct * (H - padding.top - padding.bottom) + 4} textAnchor="end" className="text-[10px] fill-gray-400">
          ${(max - pct * range).toFixed(0)}
        </text>
      ))}
      <path d={areaPath} fill="url(#equityGradient)" />
      <path d={linePath} fill="none" stroke="#7C3AED" strokeWidth="2" />
      {data.filter((_, i) => i % 7 === 0).map((d, i) => (
        <text key={i} x={xScale(i * 7)} y={H - 10} textAnchor="middle" className="text-[10px] fill-gray-400">{d.date}</text>
      ))}
    </svg>
  )
}

export default TradingReport
