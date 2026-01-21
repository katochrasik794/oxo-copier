import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../../components/admin/DataTable'

const Copiers = () => {
  const data = [
    { id: 'COP-11293', login: '329481', status: 'Active', master: 'Quant Copy', equity: '$3,208', ratio: '1.0x', started: '2025-07-22' },
    { id: 'COP-00821', login: '918330', status: 'Active', master: 'TechEdge', equity: '$15,620', ratio: '0.5x', started: '2025-07-20' },
    { id: 'COP-10311', login: '771992', status: 'Paused', master: 'FX Momentum', equity: '$980', ratio: '2.0x', started: '2025-07-18' },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="text-sm font-medium text-black">Social Copiers</div>
        <div className="text-xs text-black">Static listing</div>
      </div>
      <div className="p-4">
        <DataTable
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'login', label: 'Login' },
            { key: 'status', label: 'Status' },
            { key: 'master', label: 'Master' },
            { key: 'equity', label: 'Equity' },
            { key: 'ratio', label: 'Ratio' },
            { key: 'started', label: 'Started' },
            { key: 'commission', label: 'Commission' },
            { key: 'actions', label: 'Actions', sortable: false, render: (v, row) => (
              <div className="flex items-center gap-2">
                <Link to={`/admin/copiers/${encodeURIComponent(row.id)}`} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs">View</Link>
                <Link to={`/admin/copiers/${encodeURIComponent(row.id)}/report`} className="px-3 py-1 rounded bg-gray-100 text-black hover:bg-gray-200 border border-gray-300 text-xs">Report</Link>
              </div>
            ) },
          ]}
          data={data.map(d=>({ ...d, commission: '—', role:'copier', actions: '' }))}
          searchableKeys={[ 'id','login','master','status' ]}
          initialSort={{ key: 'login', dir: 'asc' }}
          enableRoleFilter={false}
          enableStatusFilter
          pageSizeOptions={[5,10,25]}
        />
      </div>
    </div>
  )
}

export default Copiers