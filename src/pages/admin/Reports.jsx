import React from 'react'
import DataTable from '../../components/admin/DataTable'

const Reports = () => {
  const rows = [
    { time: '12:03:11', copier: 'COP-11293', master: 'Quant Copy', symbol: 'EURUSD', action: 'BUY', volume: 0.30, price: 1.09381, result: '+23.6' },
    { time: '12:01:02', copier: 'COP-00821', master: 'TechEdge', symbol: 'GBPUSD', action: 'SELL', volume: 0.10, price: 1.28640, result: '-2.4' },
    { time: '11:59:40', copier: 'COP-10311', master: 'FX Momentum', symbol: 'USDJPY', action: 'BUY', volume: 0.25, price: 155.21, result: '+8.1' },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="text-sm font-medium text-black">Copier Reports Live</div>
        <div className="text-xs text-black">Last update: now (static)</div>
      </div>
      <div className="p-4">
        <DataTable
          columns={[
            { key: 'time', label: 'Time' },
            { key: 'copier', label: 'Copier' },
            { key: 'master', label: 'Master' },
            { key: 'symbol', label: 'Symbol' },
            { key: 'action', label: 'Action' },
            { key: 'volume', label: 'Volume' },
            { key: 'price', label: 'Price' },
            { key: 'result', label: 'Result' },
          ]}
          data={rows}
          searchableKeys={[ 'copier','master','symbol','action' ]}
          initialSort={{ key: 'time', dir: 'desc' }}
          enableRoleFilter={false}
          enableStatusFilter={false}
          pageSizeOptions={[5,10,25]}
        />
      </div>
    </div>
  )
}

export default Reports