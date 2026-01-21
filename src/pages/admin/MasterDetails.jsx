import React from 'react'
import { useParams, Link } from 'react-router-dom'
import DataTable from '../../components/admin/DataTable'

const mastersData = {
  'quant-copy': {
    id: 'quant-copy',
    name: 'Quant Copy',
    strategy: 'Signal Flow',
    aum: '<1K',
    followers: 1,
    returnTotal: '52.4%',
    maxDrawdown: '18.38%',
    trades: 208,
    equityUsd: '9,146.61',
    activeSince: '22/07/2025',
    score: 97,
    monthlyBars: [0, 8, 15, 5, 10, 26, 18, 0, 0, 0, 0, 0],
    fees: { performance: '0%', volume: 0, joining: 0 },
    profitFactor: 1.38,
    winLoss: { win: 115, loss: 93 },
    buySell: { buy: 21, sell: 107 },
    profitableWeeks: { yes: 4, no: 6 },
    instruments: [{ symbol: 'EURUSD', share: '100%' }],
    tradesHistory: [
      { symbol: 'EURUSD', status: 'BUY', volume: 0.30, openTime: '12:05:06', openPrice: 1.09381, closePrice: 1.09435, duration: '1h 56m', commission: 0, swap: 0, profit: '+8.38' },
      { symbol: 'EURUSD', status: 'SELL', volume: 0.10, openTime: '11:58:20', openPrice: 1.28640, closePrice: 1.28496, duration: '1h 16m', commission: 0.13, swap: 0, profit: '+2.14' },
      { symbol: 'EURUSD', status: 'BUY', volume: 0.25, openTime: '10:31:42', openPrice: 155.21, closePrice: 155.18, duration: '1h 24m', commission: 0.25, swap: 0, profit: '-2.40' },
    ],
  },
  'zentrader': {
    id: 'zentrader', name: 'ZenTrader', strategy: 'GoldenKnight', aum: '130K+', followers: 12, returnTotal: '46.8%', maxDrawdown: '12.0%', trades: 187, equityUsd: '32,108.00', activeSince: '02/05/2025', score: 83,
    monthlyBars: [4, 12, 14, 6, 2, 0, 0, 0, 0, 0, 0, 0], fees: { performance: '10%', volume: 0, joining: 0 }, profitFactor: 1.22,
    winLoss: { win: 88, loss: 99 }, buySell: { buy: 85, sell: 102 }, profitableWeeks: { yes: 6, no: 4 }, instruments: [{ symbol: 'GBPUSD', share: '60%'},{symbol:'EURUSD',share:'40%'}],
    tradesHistory: [],
  },
}

const MiniArea = () => (
  <svg width="100%" height="140" viewBox="0 0 200 120" className="block">
    <defs>
      <linearGradient id="md-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="200" height="120" rx="8" fill="#f8fafc" />
    <path d="M10,90 L40,50 L80,70 L120,60 L160,40 L190,55 L190,110 L10,110 Z" fill="url(#md-grad)" />
    <path d="M10,90 L40,50 L80,70 L120,60 L160,40 L190,55" stroke="#10B981" strokeWidth="2" fill="none" />
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

export default function MasterDetails() {
  const { id } = useParams()
  const m = mastersData[id] || mastersData['quant-copy']

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
          <div><div className="text-gray-600">Trades</div><div className="font-semibold text-black">{m.trades}</div></div>
          <div><div className="text-gray-600">Equity, USD</div><div className="font-semibold text-black">{m.equityUsd}</div></div>
          <div><div className="text-gray-600">Active Since</div><div className="font-semibold text-black">{m.activeSince}</div></div>
          <div><div className="text-gray-600">Score</div><div className="font-semibold text-black">{m.score}</div></div>
        </div>
      </div>

      {/* Equity/Bal chart */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-black">Balance/Equity Chart</div>
          <div className="text-xs text-black">Static</div>
        </div>
        <MiniArea />
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-black">Monthly Return</div>
          <Bars values={m.monthlyBars} />
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-black">Followers</div>
          <div className="text-xs mt-2">Followers: <span className="font-semibold">{m.followers}</span></div>
          <div className="text-xs mt-1">AUM: <span className="font-semibold">{m.aum}</span></div>
          <div className="text-sm font-medium text-black mt-4">Fees</div>
          <div className="text-xs mt-1">Performance: <span className="font-semibold">{m.fees.performance}</span></div>
          <div className="text-xs mt-1">Volume Fee: <span className="font-semibold">{m.fees.volume}</span></div>
          <div className="text-xs mt-1">Joining Fee: <span className="font-semibold">{m.fees.joining}</span></div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-black">Profit Factor</div>
          <Gauge value={m.profitFactor} />
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 lg:col-span-2">
          <div className="text-sm font-medium text-black">Trading Statistics</div>
          <div className="mt-3 text-xs space-y-2">
            <div>
              <div className="flex items-center justify-between"><span>Winning / Losing Trades</span><span className="font-semibold">{m.winLoss.win} / {m.winLoss.loss}</span></div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-green-500 rounded" style={{ width: `${(m.winLoss.win/(m.winLoss.win+m.winLoss.loss))*100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between"><span>Buy / Sell Trades</span><span className="font-semibold">{m.buySell.buy} / {m.buySell.sell}</span></div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-500 rounded" style={{ width: `${(m.buySell.buy/(m.buySell.buy+m.buySell.sell))*100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between"><span>Profitable Weeks</span><span className="font-semibold">{m.profitableWeeks.yes}</span></div>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-cyan-500 rounded" style={{ width: `${(m.profitableWeeks.yes/(m.profitableWeeks.yes+m.profitableWeeks.no))*100}%` }} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-black">Trading Instruments</div>
          <div className="mt-2 text-xs space-y-1">
            {m.instruments.map((ins, idx)=> (
              <div key={idx} className="flex items-center justify-between">
                <span>{ins.symbol}</span>
                <span className="font-semibold">{ins.share}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trading History */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="text-sm font-medium text-black">Trading History</div>
          <div className="text-xs text-black">Rows {m.tradesHistory.length}</div>
        </div>
        <div className="p-4">
          <DataTable
            columns={[
              { key: 'symbol', label: 'Symbol' },
              { key: 'status', label: 'Status' },
              { key: 'volume', label: 'Volume' },
              { key: 'openTime', label: 'Open Time' },
              { key: 'openPrice', label: 'Open Price' },
              { key: 'closePrice', label: 'Close Price' },
              { key: 'duration', label: 'Duration' },
              { key: 'commission', label: 'Commission' },
              { key: 'swap', label: 'Swap' },
              { key: 'profit', label: 'Profit' },
            ]}
            data={m.tradesHistory}
            searchableKeys={[ 'symbol','status' ]}
            initialSort={{ key: 'openTime', dir: 'desc' }}
            enableRoleFilter={false}
            enableStatusFilter={false}
            pageSizeOptions={[5,10,25]}
          />
        </div>
      </div>
    </div>
  )
}