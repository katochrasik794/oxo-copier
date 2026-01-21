import React, { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import DataTable from '../../components/admin/DataTable'

const sampleMasters = {
  'quant-copy': {
    id: 'quant-copy', name: 'Quant Copy', strategy: 'Signal Flow', profitFactor: 1.38,
    returnTotal: '52.4%', maxDrawdown: '18.38%', equityUsd: '9,146.61', followers: 1, aum: '<1K',
    trades: [
      { time: '12:05:06', symbol: 'EURUSD', status: 'BUY', volume: 0.30, open: 1.09381, close: 1.09435, duration: '1h 56m', commission: 0, swap: 0, profit: '+8.38' },
      { time: '11:58:20', symbol: 'EURUSD', status: 'SELL', volume: 0.10, open: 1.28640, close: 1.28496, duration: '1h 16m', commission: 0.13, swap: 0, profit: '+2.14' },
      { time: '10:31:42', symbol: 'EURUSD', status: 'BUY', volume: 0.25, open: 155.21, close: 155.18, duration: '1h 24m', commission: 0.25, swap: 0, profit: '-2.40' },
    ],
    earningsByCopier: [
      { copier: 'COP-11293', earned: 338.12, commission: 0, net: 338.12 },
      { copier: 'COP-00821', earned: 128.50, commission: 12.85, net: 115.65 },
    ],
    withdrawals: [
      { date: '2025-09-12', type: 'Profit Share', amount: '$120.00', status: 'Processed' },
      { date: '2025-09-09', type: 'Commission', amount: '$24.50', status: 'Processed' },
    ],
    followersList: [
      { id: 'COP-11293', login: '329481', status: 'Active', started: '2025-07-22' },
      { id: 'COP-00821', login: '918330', status: 'Active', started: '2025-07-20' },
    ],
  },
}

const TabButton = ({ active, children, onClick }) => (
  <button onClick={onClick} className={`px-3 py-1 rounded text-xs border ${active ? 'bg-cyan-50 border-cyan-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>{children}</button>
)

export default function MasterReport() {
  const { id } = useParams()
  const m = sampleMasters[id] || sampleMasters['quant-copy']
  const [tab, setTab] = useState('overview')

  const winTrades = useMemo(() => m.trades.filter(t => String(t.profit).startsWith('+')).length, [m])
  const totalTrades = m.trades.length
  const winRate = totalTrades ? Math.round((winTrades / totalTrades) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-cyan-100" />
            <div>
              <div className="text-sm font-semibold text-black">{m.name}</div>
              <div className="text-xs text-gray-600">{m.strategy}</div>
            </div>
          </div>
          <Link to="/admin/masters" className="px-3 py-1 rounded bg-gray-100 border border-gray-200 text-xs">Back to Masters</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4 text-xs">
          <div><div className="text-gray-600">Return</div><div className="font-semibold text-black">{m.returnTotal}</div></div>
          <div><div className="text-gray-600">Max Drawdown</div><div className="font-semibold text-black">{m.maxDrawdown}</div></div>
          <div><div className="text-gray-600">Profit Factor</div><div className="font-semibold text-black">{m.profitFactor}</div></div>
          <div><div className="text-gray-600">Equity, USD</div><div className="font-semibold text-black">{m.equityUsd}</div></div>
          <div><div className="text-gray-600">Followers</div><div className="font-semibold text-black">{m.followers}</div></div>
          <div><div className="text-gray-600">AUM</div><div className="font-semibold text-black">{m.aum}</div></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <TabButton active={tab==='overview'} onClick={()=>setTab('overview')}>Overview</TabButton>
        <TabButton active={tab==='performance'} onClick={()=>setTab('performance')}>Performance</TabButton>
        <TabButton active={tab==='earnings'} onClick={()=>setTab('earnings')}>Earnings</TabButton>
        <TabButton active={tab==='followers'} onClick={()=>setTab('followers')}>Followers</TabButton>
        <TabButton active={tab==='trades'} onClick={()=>setTab('trades')}>Trades</TabButton>
        <TabButton active={tab==='withdrawals'} onClick={()=>setTab('withdrawals')}>Withdrawals</TabButton>
      </div>

      {tab === 'overview' && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-black mb-2">Master Overview</div>
          <div className="text-xs text-gray-700 mb-4">This section summarizes core KPIs for the manager, including return, drawdown, profit factor, and follower stats.</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="text-gray-600">Win Rate</div>
              <div className="font-semibold text-black">{winRate}%</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="text-gray-600">Trades</div>
              <div className="font-semibold text-black">{totalTrades}</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="text-gray-600">Strategy</div>
              <div className="font-semibold text-black">{m.strategy}</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'performance' && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-black mb-2">Performance</div>
          <div className="text-xs text-gray-700 mb-4">Balance/Equity trend and return metrics. Charts are static samples.</div>
          <svg width="100%" height="140" viewBox="0 0 200 120" className="block">
            <defs>
              <linearGradient id="mr-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="200" height="120" rx="8" fill="#f8fafc" />
            <path d="M10,90 L40,60 L80,70 L120,65 L160,50 L190,62 L190,110 L10,110 Z" fill="url(#mr-grad)" />
            <path d="M10,90 L40,60 L80,70 L120,65 L160,50 L190,62" stroke="#3b82f6" strokeWidth="2" fill="none" />
          </svg>
        </div>
      )}

      {tab === 'earnings' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="text-sm font-medium text-black">Earnings by Copier</div>
            <div className="text-xs text-black">Explained: earned, commission, net</div>
          </div>
          <div className="p-4">
            <DataTable
              columns={[
                { key: 'copier', label: 'Copier' },
                { key: 'earned', label: 'Earned', render: (v)=> `$${v.toFixed(2)}` },
                { key: 'commission', label: 'Commission', render: (v)=> `$${v.toFixed(2)}` },
                { key: 'net', label: 'Net', render: (v)=> `$${v.toFixed(2)}` },
              ]}
              data={m.earningsByCopier}
              searchableKeys={[ 'copier' ]}
              initialSort={{ key: 'net', dir: 'desc' }}
              enableRoleFilter={false}
              enableStatusFilter={false}
              pageSizeOptions={[5,10,25]}
            />
          </div>
        </div>
      )}

      {tab === 'followers' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="text-sm font-medium text-black">Followers</div>
            <div className="text-xs text-black">Explained: status, MT5 login, start date</div>
          </div>
          <div className="p-4">
            <DataTable
              columns={[
                { key: 'id', label: 'Copier ID' },
                { key: 'login', label: 'Login' },
                { key: 'status', label: 'Status' },
                { key: 'started', label: 'Started' },
              ]}
              data={m.followersList}
              searchableKeys={[ 'id','login','status' ]}
              initialSort={{ key: 'started', dir: 'desc' }}
              enableRoleFilter={false}
              enableStatusFilter={false}
              pageSizeOptions={[5,10,25]}
            />
          </div>
        </div>
      )}

      {tab === 'trades' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="text-sm font-medium text-black">Trades</div>
            <div className="text-xs text-black">Explained: all closed positions from manager</div>
          </div>
          <div className="p-4">
            <DataTable
              columns={[
                { key: 'time', label: 'Time' },
                { key: 'symbol', label: 'Symbol' },
                { key: 'status', label: 'Action' },
                { key: 'volume', label: 'Volume' },
                { key: 'open', label: 'Open Price' },
                { key: 'close', label: 'Close Price' },
                { key: 'duration', label: 'Duration' },
                { key: 'commission', label: 'Commission' },
                { key: 'swap', label: 'Swap' },
                { key: 'profit', label: 'Profit' },
              ]}
              data={m.trades}
              searchableKeys={[ 'symbol','status' ]}
              initialSort={{ key: 'time', dir: 'desc' }}
              enableRoleFilter={false}
              enableStatusFilter={false}
              pageSizeOptions={[5,10,25]}
            />
          </div>
        </div>
      )}

      {tab === 'withdrawals' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="text-sm font-medium text-black">Withdrawals</div>
            <div className="text-xs text-black">Explained: processed payouts and commission withdrawals</div>
          </div>
          <div className="p-4">
            <DataTable
              columns={[
                { key: 'date', label: 'Date' },
                { key: 'type', label: 'Type' },
                { key: 'amount', label: 'Amount' },
                { key: 'status', label: 'Status' },
              ]}
              data={m.withdrawals}
              searchableKeys={[ 'type','status' ]}
              initialSort={{ key: 'date', dir: 'desc' }}
              enableRoleFilter={false}
              enableStatusFilter={false}
              pageSizeOptions={[5,10,25]}
            />
          </div>
        </div>
      )}
    </div>
  )
}