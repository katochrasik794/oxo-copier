import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../../components/admin/DataTable'

const Masters = () => {
  const masters = [
    { name: 'Quant Copy', returnPct: '52.4%', trades: 208, followers: 1, aum: '<1K' },
    { name: 'ZenTrader', returnPct: '46.8%', trades: 187, followers: 12, aum: '130K+' },
    { name: 'TechEdge', returnPct: '28.0%', trades: 221, followers: 37, aum: '450K+' },
  ]
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="text-sm font-medium text-black">Masters</div>
        <div className="text-xs text-black">Static performance overview</div>
      </div>
      <div className="p-4">
        <DataTable
          columns={[
            { key: 'name', label: 'Master' },
            { key: 'returnPct', label: 'Return %' },
            { key: 'trades', label: 'Trades' },
            { key: 'followers', label: 'Followers' },
            { key: 'aum', label: 'AUM' },
            { key: 'commission', label: 'Commission' },
            { key: 'actions', label: 'Actions', sortable: false, render: (v, row) => {
              const id = encodeURIComponent(row.name.toLowerCase().replace(/\s+/g,'-'))
              return (
                <div className="flex gap-2">
                  <Link to={`/admin/masters/${id}`} className="px-3 py-1 rounded bg-gray-100 border border-gray-200 text-xs">View</Link>
                  <Link to={`/admin/masters/${id}/report`} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs">Report</Link>
                </div>
              )
            } },
          ]}
          data={masters.map(m=>({ ...m, commission: m.name === 'Quant Copy' ? '0%' : '10%', actions: '' }))}
          searchableKeys={[ 'name' ]}
          initialSort={{ key: 'name', dir: 'asc' }}
          enableRoleFilter={false}
          enableStatusFilter={false}
          pageSizeOptions={[5,10,25]}
        />
      </div>
    </div>
  )
}

export default Masters