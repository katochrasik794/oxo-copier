import React, { useMemo, useState } from 'react'

/**
 * DataTable — lightweight client-side table with:
 * - Search across specified keys
 * - Sort by clicking headers
 * - Filters (role, status) optional
 * - Pagination (page size selectable)
 * - Responsive (horizontal scroll on small screens)
 */
const DataTable = ({
  columns = [],
  data = [],
  searchableKeys = [],
  initialSort = { key: null, dir: 'asc' },
  enableRoleFilter = false,
  enableStatusFilter = false,
  pageSizeOptions = [10, 25, 50],
}) => {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(initialSort)
  const [role, setRole] = useState('all')
  const [status, setStatus] = useState('all')
  const [pageSize, setPageSize] = useState(pageSizeOptions[0])
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let rows = [...data]
    // Search
    if (query.trim()) {
      const q = query.toLowerCase()
      rows = rows.filter((r) =>
        searchableKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(q))
      )
    }
    // Role filter
    if (enableRoleFilter && role !== 'all') {
      rows = rows.filter((r) => String(r.role).toLowerCase() === String(role))
    }
    // Status filter
    if (enableStatusFilter && status !== 'all') {
      rows = rows.filter((r) => String(r.status).toLowerCase() === String(status))
    }
    // Sort
    if (sort.key) {
      rows.sort((a, b) => {
        const av = a[sort.key]
        const bv = b[sort.key]
        // numeric compare if both numbers
        const an = typeof av === 'number' ? av : Number( String(av).replace(/[^0-9.-]/g,'') )
        const bn = typeof bv === 'number' ? bv : Number( String(bv).replace(/[^0-9.-]/g,'') )
        if (!Number.isNaN(an) && !Number.isNaN(bn)) {
          return sort.dir === 'asc' ? an - bn : bn - an
        }
        const as = String(av)
        const bs = String(bv)
        return sort.dir === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as)
      })
    }
    return rows
  }, [data, query, role, status, sort, searchableKeys, enableRoleFilter, enableStatusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const pageRows = filtered.slice(start, start + pageSize)

  const toggleSort = (key) => {
    if (sort.key === key) {
      setSort({ key, dir: sort.dir === 'asc' ? 'desc' : 'asc' })
    } else {
      setSort({ key, dir: 'asc' })
    }
  }

  // Default renderers for badges and profit/loss coloring
  const renderDefault = (key, value) => {
    const vStr = String(value ?? '')
    const vLower = vStr.toLowerCase()

    if (key === 'status' || key === 'action') {
      let cls = 'bg-gray-100 text-gray-700 border border-gray-200'
      if (['active','buy'].includes(vLower)) cls = 'bg-emerald-100 text-emerald-700 border border-emerald-200'
      else if (['inactive'].includes(vLower)) cls = 'bg-gray-100 text-gray-700 border border-gray-200'
      else if (['paused'].includes(vLower)) cls = 'bg-amber-100 text-amber-700 border border-amber-200'
      else if (['suspended','sell'].includes(vLower)) cls = 'bg-red-100 text-red-700 border border-red-200'
      return (<span className={`px-2 py-1 rounded ${cls}`}>{vStr}</span>)
    }

    if (key === 'profit' || key === 'result') {
      const num = typeof value === 'number' ? value : Number(vStr.replace(/[^0-9.-]/g,''))
      if (!Number.isNaN(num)) {
        const cls = num > 0
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : num < 0
            ? 'bg-red-50 text-red-700 border border-red-200'
            : 'bg-gray-50 text-gray-700 border border-gray-200'
        const text = typeof value === 'number' ? `${num.toFixed(2)}` : vStr
        return (<span className={`px-2 py-1 rounded ${cls}`}>{text}</span>)
      }
      return (<span className="px-2 py-1 rounded bg-gray-50 text-gray-700 border border-gray-200">{vStr}</span>)
    }

    return value
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 text-black">
      {/* Controls */}
      <div className="p-4 border-b border-gray-200 flex flex-wrap items-center gap-3">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            placeholder="Search..."
            className="h-9 w-64 rounded-md border border-gray-300 pl-9 pr-2"
          />
          <svg className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        {enableRoleFilter && (
          <select value={role} onChange={(e)=>{setRole(e.target.value); setPage(1)}} className="h-9 rounded-md border border-gray-300 px-2">
            <option value="all">All roles</option>
            <option value="master">Master</option>
            <option value="copier">Copier</option>
          </select>
        )}
        {enableStatusFilter && (
          <select value={status} onChange={(e)=>{setStatus(e.target.value); setPage(1)}} className="h-9 rounded-md border border-gray-300 px-2">
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        )}
        <select value={pageSize} onChange={(e)=>{setPageSize(Number(e.target.value)); setPage(1)}} className="h-9 rounded-md border border-gray-300 px-2 ml-auto">
          {pageSizeOptions.map((o)=> <option key={o} value={o}>{o}/page</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="p-4 overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left py-2 select-none cursor-pointer"
                  onClick={() => col.sortable !== false && toggleSort(col.key)}
                >
                  <div className="inline-flex items-center gap-1">
                    <span>{col.label}</span>
                    {sort.key === col.key && (
                      <svg className={`w-3 h-3 ${sort.dir === 'asc' ? '' : 'rotate-180'}`} viewBox="0 0 24 24">
                        <path d="M12 8l-6 6h12z" fill="currentColor" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, i) => (
              <tr key={i} className="border-t border-gray-200">
                {columns.map((col) => (
                  <td key={col.key} className="py-2">
                    {col.render ? col.render(row[col.key], row, i, currentPage, pageSize) : renderDefault(col.key, row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-6 text-center">No results</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 pb-4 flex flex-wrap items-center gap-2">
        <button className="px-3 py-1 rounded bg-gray-200" onClick={()=>setPage(Math.max(1, currentPage-1))} disabled={currentPage===1}>Prev</button>
        <div className="text-xs">Page {currentPage} / {totalPages}</div>
        <button className="px-3 py-1 rounded bg-gray-200" onClick={()=>setPage(Math.min(totalPages, currentPage+1))} disabled={currentPage===totalPages}>Next</button>
      </div>
    </div>
  )
}

export default DataTable