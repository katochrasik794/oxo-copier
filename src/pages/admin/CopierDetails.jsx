import React from 'react'
import { useParams, Link } from 'react-router-dom'
import DataTable from '../../components/admin/DataTable'

const copiersData = {
  'COP-11293': {
    id: 'COP-11293', login: '329481', status: 'Active', master: 'Quant Copy', started: '2025-07-22',
    accounts: [{ login: '329481', broker: 'MT5 Demo', balance: '$3,208' }],
    earningsByManager: [
      { manager: 'Quant Copy', earned: 338.12, commission: 0 },
      { manager: 'TechEdge', earned: 128.50, commission: 12.85 },
    ],
    summary: { totalEarned: 466.62, totalCommission: 12.85, netPnl: 453.77 },
    trades: [
      { time: '12:03:11', manager: 'Quant Copy', symbol: 'EURUSD', action: 'BUY', volume: 0.30, price: 1.09381, result: '+23.6', commission: 0, swap: 0 },
      { time: '12:01:02', manager: 'TechEdge', symbol: 'GBPUSD', action: 'SELL', volume: 0.10, price: 1.28640, result: '+2.4', commission: 0.24, swap: 0 },
      { time: '11:59:40', manager: 'TechEdge', symbol: 'USDJPY', action: 'BUY', volume: 0.25, price: 155.21, result: '-8.1', commission: 0, swap: 0 },
    ],
  },
  'COP-00821': {
    id: 'COP-00821', login: '918330', status: 'Active', master: 'TechEdge', started: '2025-07-20',
    accounts: [{ login: '918330', broker: 'MT5 Live', balance: '$15,620' }],
    earningsByManager: [ { manager: 'TechEdge', earned: 1028.20, commission: 102.82 } ],
    summary: { totalEarned: 1028.20, totalCommission: 102.82, netPnl: 925.38 },
    trades: [],
  },
  'COP-10311': {
    id: 'COP-10311', login: '771992', status: 'Paused', master: 'FX Momentum', started: '2025-07-18',
    accounts: [{ login: '771992', broker: 'MT5 Demo', balance: '$980' }],
    earningsByManager: [ { manager: 'FX Momentum', earned: 68.35, commission: 6.83 } ],
    summary: { totalEarned: 68.35, totalCommission: 6.83, netPnl: 61.52 },
    trades: [],
  },
}

export default function CopierDetails() {
  const { id } = useParams()
  const cop = copiersData[id] || copiersData['COP-11293']

  const tradesCount = cop.trades.length
  const positiveTrades = cop.trades.filter(t => String(t.result).startsWith('+')).length
  const winRate = tradesCount ? Math.round((positiveTrades / tradesCount) * 100) : 0

  const monthlyBars = [4, 12, 6, 10, 0, 0, 0, 0, 0, 0, 0, 0]

  const MiniArea = () => (
    <svg width="100%" height="140" viewBox="0 0 200 120" className="block">
      <defs>
        <linearGradient id="cop-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="120" rx="8" fill="#f8fafc" />
      <path d="M10,90 L40,60 L80,70 L120,65 L160,50 L190,62 L190,110 L10,110 Z" fill="url(#cop-grad)" />
      <path d="M10,90 L40,60 L80,70 L120,65 L160,50 L190,62" stroke="#3b82f6" strokeWidth="2" fill="none" />
    </svg>
  )

  const Bars = ({ values }) => (
    <div className="flex items-end gap-1 h-24">
      {values.map((v, i) => (
        <div key={i} className="w-4 bg-green-500/80" style={{ height: `${Math.min(100, v * 4)}%` }} />
      ))}
    </div>
  )

  const Gauge = ({ value }) => (
    <svg width="160" height="90" viewBox="0 0 160 90">
      <path d="M10 80 A70 70 0 0 1 150 80" stroke="#e5e7eb" strokeWidth="14" fill="none" />
      <path d="M10 80 A70 70 0 0 1 150 80" stroke="#10B981" strokeWidth="14" fill="none" strokeDasharray={`${value*100},200`} />
      <text x="80" y="60" textAnchor="middle" fontSize="18" fill="#111827">{value.toFixed(2)}</text>
    </svg>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-black">{cop.id}</div>
            <div className="text-xs text-gray-600">Login {cop.login} • {cop.status} • Master {cop.master}</div>
          </div>
          <Link to="/admin/copiers" className="px-3 py-1 rounded bg-gray-100 border border-gray-200 text-xs">Back to Copiers</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-gray-600">Total Earned</div>
            <div className="text-black font-semibold">${cop.summary.totalEarned.toFixed(2)}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-gray-600">Commission Paid</div>
            <div className="text-black font-semibold">${cop.summary.totalCommission.toFixed(2)}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-gray-600">Net PnL</div>
            <div className="text-black font-semibold">${cop.summary.netPnl.toFixed(2)}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-gray-600">Started</div>
            <div className="text-black font-semibold">{cop.started}</div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-black">Equity Trend</div>
            <div className="text-xs text-black">Static</div>
          </div>
          <MiniArea />
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-black">Win Rate</div>
            <div className="text-xs text-black">{tradesCount} trades</div>
          </div>
          <Gauge value={isNaN(winRate) ? 0 : winRate/100} />
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-black">Monthly Return</div>
          <Bars values={monthlyBars} />
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-black">Managers Followed</div>
          <div className="text-xs mt-2">Active Master: <span className="font-semibold">{cop.master}</span></div>
          <div className="text-xs mt-1">Managers count: <span className="font-semibold">{cop.earningsByManager.length}</span></div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-black">Trading Instruments</div>
          <div className="mt-2 text-xs space-y-1">
            {Array.from(new Set(cop.trades.map(t=>t.symbol))).map((sym, idx)=> (
              <div key={idx} className="flex items-center justify-between">
                <span>{sym}</span>
                <span className="font-semibold">{cop.trades.filter(t=>t.symbol===sym).length}</span>
              </div>
            ))}
            {cop.trades.length === 0 && <div className="text-gray-600">No trades yet</div>}
          </div>
        </div>
      </div>

      {/* Accounts */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="text-sm font-medium text-black mb-2">MT5 Accounts</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {cop.accounts.map((acc, i)=> (
            <div key={i} className="border border-gray-200 rounded-lg p-3">
              <div className="font-semibold text-black">{acc.login}</div>
              <div className="text-gray-600">{acc.broker}</div>
              <div className="text-gray-600">Balance {acc.balance}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings by Manager */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="text-sm font-medium text-black mb-2">Earnings by Manager</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {cop.earningsByManager.map((e, i)=> (
            <div key={i} className="border border-gray-200 rounded-lg p-3">
              <div className="font-semibold text-black">{e.manager}</div>
              <div className="mt-1">Earned: <span className="font-semibold">${e.earned.toFixed(2)}</span></div>
              <div>Commission: <span className="font-semibold">${e.commission.toFixed(2)}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Trades table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="text-sm font-medium text-black">Trades</div>
          <div className="text-xs text-black">Static sample</div>
        </div>
        <div className="p-4">
          <DataTable
            columns={[
              { key: 'time', label: 'Time' },
              { key: 'manager', label: 'Manager' },
              { key: 'symbol', label: 'Symbol' },
              { key: 'action', label: 'Action' },
              { key: 'volume', label: 'Volume' },
              { key: 'price', label: 'Price' },
              { key: 'result', label: 'Result' },
              { key: 'commission', label: 'Commission' },
              { key: 'swap', label: 'Swap' },
            ]}
            data={cop.trades}
            searchableKeys={[ 'manager','symbol','action' ]}
            initialSort={{ key: 'time', dir: 'desc' }}
            enableRoleFilter={false}
            enableStatusFilter={false}
            pageSizeOptions={[5,10,25]}
          />
        </div>
      </div>
    </div>
  )
}