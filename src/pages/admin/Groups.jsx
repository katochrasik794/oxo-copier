import React, { useState, useEffect } from 'react'
import DataTable from '../../components/admin/DataTable'
import api from '../../utils/api'
import Swal from 'sweetalert2'

const Groups = () => {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    setLoading(true)
    try {
      const data = await api.getGroups()
      // Sort: active first, then by name
      const sorted = data.sort((a, b) => {
        if (a.is_active !== b.is_active) {
          return b.is_active ? 1 : -1 // Active first
        }
        return (a.group_name || '').localeCompare(b.group_name || '')
      })
      setGroups(sorted)
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load groups' })
    } finally {
      setLoading(false)
    }
  }

  // Separate active and inactive groups
  const activeGroups = groups.filter(g => g.is_active === true)
  const inactiveGroups = groups.filter(g => g.is_active === false)

  const handleSync = async () => {
    setSyncing(true)
    try {
      const result = await api.syncGroups()
      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Successfully synced ${result.count} groups from MT5`
      })
      await fetchGroups()
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'Failed to sync groups' })
    } finally {
      setSyncing(false)
    }
  }

  const handleEditDisplayName = async (row) => {
    const { value: displayName } = await Swal.fire({
      title: 'Edit Display Name',
      input: 'text',
      inputLabel: 'Display Name',
      inputValue: row.display_name || '',
      inputPlaceholder: 'Enter a custom name for this group',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value.trim() === '') {
          return 'Display name cannot be empty'
        }
      }
    })

    if (displayName) {
      try {
        await api.updateGroupDisplayName(row.id, displayName)
        await Swal.fire({ icon: 'success', title: 'Updated', text: 'Display name updated successfully' })
        await fetchGroups()
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update display name' })
      }
    }
  }

  const handleToggleActive = async (row) => {
    try {
      await api.toggleGroupActive(row.id)
      await fetchGroups()
      // Show success toast
      Swal.fire({ 
        icon: 'success', 
        title: 'Success', 
        text: `Group ${row.is_active ? 'deactivated' : 'activated'} successfully`,
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Toggle error:', error)
      Swal.fire({ 
        icon: 'error', 
        title: 'Error', 
        text: error.message || 'Failed to update group status' 
      })
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center">Loading groups...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with Sync Button */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Group Management</h2>
            <p className="text-sm text-gray-500 mt-1">Manage MT5 groups and assign custom display names</p>
          </div>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {syncing ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Syncing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Sync from MT5
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Groups Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="text-sm font-medium text-black">
            Active Groups ({activeGroups.length})
          </div>
        </div>
        <div className="p-4">
          {activeGroups.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No active groups found.</p>
            </div>
          ) : (
            <DataTable
              columns={[
                { 
                  key: 'sr_no', 
                  label: 'Sr No',
                  sortable: false,
                  render: (value, row, index, currentPage, pageSize) => {
                    const start = (currentPage - 1) * pageSize
                    return <span className="font-medium text-gray-700">{start + index + 1}</span>
                  }
                },
                { key: 'group_name', label: 'Group Name' },
                { 
                  key: 'display_name', 
                  label: 'Display Name',
                  render: (value, row) => (
                    <div className="flex items-center gap-2">
                      <span>{value || <span className="text-gray-400 italic">Not set</span>}</span>
                      <button
                        onClick={() => handleEditDisplayName(row)}
                        className="text-cyan-600 hover:text-cyan-700 text-xs"
                        title="Edit display name"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  )
                },
                { 
                  key: 'is_active', 
                  label: 'Status',
                  render: (value, row) => (
                    <button
                      onClick={() => handleToggleActive(row)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                        value ? 'bg-cyan-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={value}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )
                },
                { key: 'currency', label: 'Currency' },
                { key: 'margin_call', label: 'Margin Call (%)' },
                { key: 'margin_stop_out', label: 'Stop Out (%)' },
                { key: 'demo_leverage', label: 'Leverage' },
                { 
                  key: 'updated_at', 
                  label: 'Last Updated',
                  render: (value) => value ? new Date(value).toLocaleDateString() : '—'
                },
              ]}
              data={activeGroups}
              searchableKeys={['group_name', 'display_name', 'currency']}
              initialSort={{ key: 'group_name', dir: 'asc' }}
              enableRoleFilter={false}
              enableStatusFilter={false}
              pageSizeOptions={[10, 25, 50, 100]}
            />
          )}
        </div>
      </div>

      {/* Inactive Groups Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="text-sm font-medium text-black">
            Inactive Groups ({inactiveGroups.length})
          </div>
        </div>
        <div className="p-4">
          {inactiveGroups.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No inactive groups found.</p>
            </div>
          ) : (
            <DataTable
              columns={[
                { 
                  key: 'sr_no', 
                  label: 'Sr No',
                  sortable: false,
                  render: (value, row, index, currentPage, pageSize) => {
                    const start = (currentPage - 1) * pageSize
                    return <span className="font-medium text-gray-700">{start + index + 1}</span>
                  }
                },
                { key: 'group_name', label: 'Group Name' },
                { 
                  key: 'display_name', 
                  label: 'Display Name',
                  render: (value, row) => (
                    <div className="flex items-center gap-2">
                      <span>{value || <span className="text-gray-400 italic">Not set</span>}</span>
                      <button
                        onClick={() => handleEditDisplayName(row)}
                        className="text-cyan-600 hover:text-cyan-700 text-xs"
                        title="Edit display name"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  )
                },
                { 
                  key: 'is_active', 
                  label: 'Status',
                  render: (value, row) => (
                    <button
                      onClick={() => handleToggleActive(row)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                        value ? 'bg-cyan-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={value}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )
                },
                { key: 'currency', label: 'Currency' },
                { key: 'margin_call', label: 'Margin Call (%)' },
                { key: 'margin_stop_out', label: 'Stop Out (%)' },
                { key: 'demo_leverage', label: 'Leverage' },
                { 
                  key: 'updated_at', 
                  label: 'Last Updated',
                  render: (value) => value ? new Date(value).toLocaleDateString() : '—'
                },
              ]}
              data={inactiveGroups}
              searchableKeys={['group_name', 'display_name', 'currency']}
              initialSort={{ key: 'group_name', dir: 'asc' }}
              enableRoleFilter={false}
              enableStatusFilter={false}
              pageSizeOptions={[10, 25, 50, 100]}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Groups
