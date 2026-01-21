import React, { useMemo, useState, useRef } from 'react'

/**
 * DataTablePro - Enhanced data table with search, sort, pagination, and export
 */
const DataTablePro = ({
  columns = [],
  data = [],
  searchableKeys = [],
  initialSort = { key: null, dir: 'asc' },
  pageSizeOptions = [10, 25, 50, 100],
  title = '',
  showExport = true,
}) => {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(initialSort)
  const [pageSize, setPageSize] = useState(pageSizeOptions[0])
  const [page, setPage] = useState(1)
  const tableRef = useRef(null)

  // Filter and sort data
  const filtered = useMemo(() => {
    let rows = [...data]
    
    // Search
    if (query.trim()) {
      const q = query.toLowerCase()
      const keysToSearch = searchableKeys.length > 0 ? searchableKeys : columns.map(c => c.key)
      rows = rows.filter((r) =>
        keysToSearch.some((k) => String(r[k] ?? '').toLowerCase().includes(q))
      )
    }
    
    // Sort
    if (sort.key) {
      rows.sort((a, b) => {
        const av = a[sort.key]
        const bv = b[sort.key]
        const an = typeof av === 'number' ? av : Number(String(av).replace(/[^0-9.-]/g, ''))
        const bn = typeof bv === 'number' ? bv : Number(String(bv).replace(/[^0-9.-]/g, ''))
        
        if (!Number.isNaN(an) && !Number.isNaN(bn)) {
          return sort.dir === 'asc' ? an - bn : bn - an
        }
        
        const as = String(av)
        const bs = String(bv)
        return sort.dir === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as)
      })
    }
    
    return rows
  }, [data, query, sort, searchableKeys, columns])

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

  // Export to CSV/Excel
  const exportToCSV = () => {
    const headers = columns.map(c => c.label).join(',')
    const rows = filtered.map(row => 
      columns.map(c => {
        const val = row[c.key]
        const strVal = String(val ?? '').replace(/"/g, '""')
        return `"${strVal}"`
      }).join(',')
    ).join('\n')
    
    const csv = `${headers}\n${rows}`
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${title || 'export'}_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  // Export to PDF (browser print)
  const exportToPDF = () => {
    const printContent = tableRef.current
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title || 'Export'}</title>
          <style>
            body { font-family: 'Ubuntu', sans-serif; padding: 20px; }
            h1 { font-size: 18px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #7c3aed; color: white; }
            tr:nth-child(even) { background: #f9fafb; }
          </style>
        </head>
        <body>
          <h1>${title || 'Data Export'}</h1>
          ${printContent.outerHTML}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  // Default cell renderer
  const renderDefault = (key, value) => {
    const vStr = String(value ?? '')
    const vLower = vStr.toLowerCase()

    if (key === 'status') {
      let cls = 'bg-gray-100 text-gray-700 border border-gray-200'
      if (['active', 'success', 'completed', 'approved'].includes(vLower)) {
        cls = 'bg-emerald-100 text-emerald-700 border border-emerald-200'
      } else if (['pending', 'processing'].includes(vLower)) {
        cls = 'bg-amber-100 text-amber-700 border border-amber-200'
      } else if (['inactive', 'failed', 'rejected', 'cancelled'].includes(vLower)) {
        cls = 'bg-red-100 text-red-700 border border-red-200'
      }
      return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>{vStr}</span>
    }

    if (key === 'profit' || key === 'amount' || key === 'earnings') {
      const num = typeof value === 'number' ? value : Number(vStr.replace(/[^0-9.-]/g, ''))
      if (!Number.isNaN(num)) {
        const cls = num > 0 ? 'text-emerald-600 font-semibold' : num < 0 ? 'text-red-500 font-semibold' : 'text-gray-700'
        const prefix = num > 0 ? '+' : ''
        return <span className={cls}>{prefix}${num.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      }
    }

    return vStr
  }

  // Pagination numbers
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {title && <h3 className="text-sm font-semibold text-gray-900">{title}</h3>}
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1) }}
                placeholder="Search..."
                className="h-9 w-48 sm:w-64 rounded-lg border border-gray-200 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Page size */}
            <select 
              value={pageSize} 
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}
              className="h-9 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {pageSizeOptions.map(o => <option key={o} value={o}>{o} rows</option>)}
            </select>
            
            {/* Export buttons */}
            {showExport && (
              <div className="flex items-center gap-1">
                <button
                  onClick={exportToCSV}
                  className="h-9 px-3 rounded-lg border border-gray-200 hover:bg-violet-50 hover:border-violet-300 text-sm font-medium text-gray-700 hover:text-violet-700 transition-all flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Excel
                </button>
                <button
                  onClick={exportToPDF}
                  className="h-9 px-3 rounded-lg border border-gray-200 hover:bg-violet-50 hover:border-violet-300 text-sm font-medium text-gray-700 hover:text-violet-700 transition-all flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table ref={tableRef} className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left py-3 px-4 font-semibold text-gray-700 select-none ${col.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''} transition-colors`}
                  onClick={() => col.sortable !== false && toggleSort(col.key)}
                >
                  <div className="inline-flex items-center gap-1.5">
                    <span>{col.label}</span>
                    {sort.key === col.key && (
                      <svg className={`w-3.5 h-3.5 text-violet-600 ${sort.dir === 'asc' ? '' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8l-6 6h12z" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, i) => (
              <tr 
                key={row.id || i} 
                className="border-b border-gray-100 hover:bg-violet-50/30 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-4 text-gray-700">
                    {col.render ? col.render(row[col.key], row) : renderDefault(col.key, row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>No data found</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-500">
            Showing {start + 1} to {Math.min(start + pageSize, filtered.length)} of {filtered.length} entries
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(1)}
              disabled={currentPage === 1}
              className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-50 hover:border-violet-300 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-50 hover:border-violet-300 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {getPageNumbers().map(num => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`h-8 min-w-8 px-2 rounded-lg border text-sm font-medium transition-all ${
                  currentPage === num 
                    ? 'bg-violet-600 border-violet-600 text-white' 
                    : 'border-gray-200 hover:bg-violet-50 hover:border-violet-300'
                }`}
              >
                {num}
              </button>
            ))}
            
            <button
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-50 hover:border-violet-300 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-50 hover:border-violet-300 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTablePro

