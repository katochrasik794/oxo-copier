import React, { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import DataTable from '../../components/admin/DataTable'

// Static sample data (replace with live API later)
const copiersData = {
  'COP-11293': {
    id: 'COP-11293', login: '329481', status: 'Active', master: 'Quant Copy', started: '2025-07-22',
    accounts: [{ login: '329481', broker: 'MT5 Demo', balance: '$3,208' }],
    earningsByManager: [
      { manager: 'Quant Copy', earned: 338.12, commission: 0 },
      { manager: 'TechEdge', earned: 128.50, commission: 12.85 },
    ],
    performanceMonthly: [
      { month: 'Jan', returnPct: 2.1 }, { month: 'Feb', returnPct: 1.6 }, { month: 'Mar', returnPct: -0.8 },
      { month: 'Apr', returnPct: 3.2 }, { month: 'May', returnPct: 0.4 }, { month: 'Jun', returnPct: 1.9 },
    ],
    trades: [
      { time: '12:03:11', manager: 'Quant Copy', symbol: 'EURUSD', action: 'BUY', volume: 0.30, price: 1.09381, commission: 0, swap: 0, profit: 23.6 },
      { time: '12:01:02', manager: 'TechEdge', symbol: 'GBPUSD', action: 'SELL', volume: 0.10, price: 1.28640, commission: 0.24, swap: 0, profit: 2.4 },
      { time: '11:59:40', manager: 'TechEdge', symbol: 'USDJPY', action: 'BUY', volume: 0.25, price: 155.21, commission: 0, swap: 0, profit: -8.1 },
    ],
    withdrawals: [
      { date: '2025-07-25', type: 'Payout', amount: '$50.00', status: 'Processed' },
      { date: '2025-07-20', type: 'Commission', amount: '$12.85', status: 'Processed' },
    ],
  },
  'COP-00821': {
    id: 'COP-00821', login: '918330', status: 'Active', master: 'TechEdge', started: '2025-07-20',
    accounts: [{ login: '918330', broker: 'MT5 Live', balance: '$15,620' }],
    earningsByManager: [ { manager: 'TechEdge', earned: 1028.20, commission: 102.82 } ],
    performanceMonthly: [ { month:'Jan', returnPct: 5.0 }, { month:'Feb', returnPct: 1.2 } ],
    trades: [],
    withdrawals: [],
  },
  'COP-10311': {
    id: 'COP-10311', login: '771992', status: 'Paused', master: 'FX Momentum', started: '2025-07-18',
    accounts: [{ login: '771992', broker: 'MT5 Demo', balance: '$980' }],
    earningsByManager: [ { manager: 'FX Momentum', earned: 68.35, commission: 6.83 } ],
    performanceMonthly: [ { month:'Jan', returnPct: -1.0 } ],
    trades: [],
    withdrawals: [],
  },
}

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded text-xs border ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-black border-gray-200 hover:bg-gray-100'}`}
  >
    {children}
  </button>
)

const CopierReport = () => {
  const { id } = useParams()
  const cop = useMemo(() => copiersData[id] || copiersData['COP-11293'], [id])
  const [tab, setTab] = useState('overview')

  const earningsRows = useMemo(() => cop.earningsByManager.map(e => ({
    manager: e.manager,
    earned: e.earned,
    commission: e.commission,
    net: e.earned - e.commission,
  })), [cop])

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-black">Copier Report</div>
          <div className="text-xs text-black">Explained tables: overview, performance, earnings, accounts, trades, withdrawals</div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/copiers" className="px-3 py-1 rounded bg-gray-100 text-black text-xs border border-gray-200">Back to Copiers</Link>
          <Link to={`/admin/copiers/${encodeURIComponent(cop.id)}`} className="px-3 py-1 rounded bg-blue-600 text-white text-xs">Details</Link>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div><div className="text-gray-600">Copier</div><div className="font-semibold text-black">{cop.id}</div></div>
          <div><div className="text-gray-600">Login</div><div className="font-semibold text-black">{cop.login}</div></div>
          <div><div className="text-gray-600">Status</div><div className="font-semibold text-black">{cop.status}</div></div>
          <div><div className="text-gray-600">Master</div><div className="font-semibold text-black">{cop.master}</div></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <TabButton active={tab==='overview'} onClick={()=>setTab('overview')}>Overview</TabButton>
        <TabButton active={tab==='performance'} onClick={()=>setTab('performance')}>Performance</TabButton>
        <TabButton active={tab==='earnings'} onClick={()=>setTab('earnings')}>Earnings</TabButton>
        <TabButton active={tab==='accounts'} onClick={()=>setTab('accounts')}>Accounts</TabButton>
        <TabButton active={tab==='trades'} onClick={()=>setTab('trades')}>Trades</TabButton>
        <TabButton active={tab==='withdrawals'} onClick={()=>setTab('withdrawals')}>Withdrawals</TabButton>
      </div>

      {tab === 'overview' && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-black mb-2">Overview</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Managers followed */}
            <div>
              <div className="text-xs text-black mb-2">Managers followed</div>
              <DataTable
                columns={[
                  { key: 'manager', label: 'Manager' },
                  { key: 'earned', label: 'Earned', render: (v)=> `$${v.toFixed(2)}` },
                  { key: 'commission', label: 'Commission', render: (v)=> `$${v.toFixed(2)}` },
                  { key: 'net', label: 'Net', render: (v)=> `$${v.toFixed(2)}` },
                ]}
                data={earningsRows}
                searchableKeys={[ 'manager' ]}
                initialSort={{ key: 'net', dir: 'desc' }}
                enableRoleFilter={false}
                enableStatusFilter={false}
                pageSizeOptions={[5,10,25]}
              />
            </div>

            {/* Accounts */}
            <div>
              <div className="text-xs text-black mb-2">Accounts</div>
              <DataTable
                columns={[
                  { key: 'login', label: 'Login' },
                  { key: 'broker', label: 'Broker' },
                  { key: 'balance', label: 'Balance' },
                ]}
                data={cop.accounts}
                searchableKeys={[ 'login','broker' ]}
                initialSort={{ key: 'login', dir: 'asc' }}
                enableRoleFilter={false}
                enableStatusFilter={false}
                pageSizeOptions={[5,10,25]}
              />
            </div>
          </div>
        </div>
      )}

      {tab === 'performance' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="text-sm font-medium text-black">Monthly Returns</div>
            <div className="text-xs text-black">Explained: per-month percentage return</div>
          </div>
          <div className="p-4">
            <DataTable
              columns={[
                { key: 'month', label: 'Month' },
                { key: 'returnPct', label: 'Return %', render: (v)=> `${v.toFixed(2)}%` },
              ]}
              data={cop.performanceMonthly}
              searchableKeys={[ 'month' ]}
              initialSort={{ key: 'month', dir: 'asc' }}
              enableRoleFilter={false}
              enableStatusFilter={false}
              pageSizeOptions={[5,10,25]}
            />
          </div>
        </div>
      )}

      {tab === 'earnings' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="text-sm font-medium text-black">Earnings by Manager</div>
            <div className="text-xs text-black">Explained: earned, commission, net</div>
          </div>
          <div className="p-4">
            <DataTable
              columns={[
                { key: 'manager', label: 'Manager' },
                { key: 'earned', label: 'Earned', render: (v)=> `$${v.toFixed(2)}` },
                { key: 'commission', label: 'Commission', render: (v)=> `$${v.toFixed(2)}` },
                { key: 'net', label: 'Net', render: (v)=> `$${v.toFixed(2)}` },
              ]}
              data={earningsRows}
              searchableKeys={[ 'manager' ]}
              initialSort={{ key: 'net', dir: 'desc' }}
              enableRoleFilter={false}
              enableStatusFilter={false}
              pageSizeOptions={[5,10,25]}
            />
          </div>
        </div>
      )}

      {tab === 'accounts' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="text-sm font-medium text-black">MT5 Accounts</div>
            <div className="text-xs text-black">Explained: login, broker, balance</div>
          </div>
          <div className="p-4">
            <DataTable
              columns={[
                { key: 'login', label: 'Login' },
                { key: 'broker', label: 'Broker' },
                { key: 'balance', label: 'Balance' },
              ]}
              data={cop.accounts}
              searchableKeys={[ 'login','broker' ]}
              initialSort={{ key: 'login', dir: 'asc' }}
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
            <div className="text-xs text-black">Explained: all closed positions copied from managers</div>
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
                { key: 'commission', label: 'Commission' },
                { key: 'swap', label: 'Swap' },
                { key: 'profit', label: 'Profit' },
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
              data={cop.withdrawals}
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

export default CopierReport