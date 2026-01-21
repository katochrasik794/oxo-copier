import React from 'react'
import DataTable from '../../components/admin/DataTable'

const StatCard = ({ title, value, sub }) => (
  <div className="bg-white rounded-xl p-4 border border-gray-200">
    <div className="text-xs text-black">{title}</div>
    <div className="mt-1 text-2xl font-bold text-black">{value}</div>
    {sub && <div className="text-xs text-black mt-1">{sub}</div>}
  </div>
)

const MiniArea = () => (
  <svg width="100%" height="60" viewBox="0 0 200 60" className="block">
    <defs>
      <linearGradient id="dash-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    <path d="M0,40 L40,42 L80,20 L120,28 L160,18 L200,26 L200,60 L0,60 Z" fill="url(#dash-grad)" />
    <path d="M0,40 L40,42 L80,20 L120,28 L160,18 L200,26" stroke="#10B981" strokeWidth="2" fill="none" />
  </svg>
)

const Bars = ({ values }) => (
  <div className="flex items-end gap-1 h-24">
    {values.map((v, i) => (
      <div key={i} className="w-4 bg-blue-500/80" style={{ height: `${Math.min(100, v * 4)}%` }} />
    ))}
  </div>
)

const Gauge = ({ value, label }) => (
  <div className="flex items-center gap-4">
    <svg width="160" height="90" viewBox="0 0 160 90">
      <path d="M10 80 A70 70 0 0 1 150 80" stroke="#e5e7eb" strokeWidth="14" fill="none" />
      <path d="M10 80 A70 70 0 0 1 150 80" stroke="#10B981" strokeWidth="14" fill="none" strokeDasharray={`${Math.max(0, Math.min(1, value))*200},200`} />
      <text x="80" y="60" textAnchor="middle" fontSize="18" fill="#111827">{label}</text>
    </svg>
  </div>
)

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Masters" value="7" />
        <StatCard title="Active Copiers" value="128" sub="+12 today" />
        <StatCard title="Live Copies" value="93" />
        <StatCard title="AUM (USD)" value="$560K" />
        <StatCard title="Daily PnL" value="$8,320" sub="+4.2%" />
        <StatCard title="Win Rate" value="67%" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-black">AUM Trend</div>
            <div className="text-xs text-black">Last 30 days</div>
          </div>
          <MiniArea />
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-black">Copies Started</div>
            <div className="text-xs text-black">Daily</div>
          </div>
          <MiniArea />
        </div>
      </div>

      {/* Performance Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-black">Monthly Return</div>
          <div className="mt-2">
            <Bars values={[6,8,12,4,10,14,8,11,9,7,5,10]} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-black">Profit Factor</div>
            <div className="text-xs text-black">Static</div>
          </div>
          <Gauge value={0.69} label={'1.38'} />
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-black">Trading Instruments</div>
          <div className="mt-3 space-y-2 text-xs">
            {[
              { sym: 'EURUSD', share: 68 },
              { sym: 'GBPUSD', share: 22 },
              { sym: 'XAUUSD', share: 10 },
            ].map((i)=> (
              <div key={i.sym}>
                <div className="flex items-center justify-between"><span>{i.sym}</span><span className="font-semibold">{i.share}%</span></div>
                <div className="h-2 bg-gray-100 rounded">
                  <div className="h-2 bg-blue-500 rounded" style={{ width: `${i.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-black">Trades Per Day</div>
            <div className="text-xs text-black">Last week</div>
          </div>
          <Bars values={[5,8,3,10,6,7,9]} />
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-black">Net PnL Trend</div>
            <div className="text-xs text-black">Static</div>
          </div>
          <MiniArea />
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200 text-sm font-medium text-black">Users</div>
        <div className="p-4">
          <DataTable
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role', render: (v)=> (<span className={`px-2 py-1 rounded bg-gray-100`}>{v}</span>) },
              { key: 'login', label: 'Login' },
              { key: 'commission', label: 'Commission' },
              { key: 'status', label: 'Status' },
            ]}
            data={[
              { name:'Quant Copy', role:'master', login:'QUANT', commission:'0%', status:'active' },
              { name:'ZenTrader', role:'master', login:'ZEN', commission:'10%', status:'active' },
              { name:'TechEdge', role:'master', login:'TECH', commission:'5%', status:'active' },
              { name:'COP-11293', role:'copier', login:'329481', commission:'–', status:'active' },
              { name:'COP-00821', role:'copier', login:'918330', commission:'–', status:'active' },
              { name:'COP-10311', role:'copier', login:'771992', commission:'–', status:'paused' },
            ]}
            searchableKeys={['name','role','login','status']}
            initialSort={{ key: 'name', dir: 'asc' }}
            enableRoleFilter
            enableStatusFilter
            pageSizeOptions={[5,10,25]}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard