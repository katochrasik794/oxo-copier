const API_URL = 'http://localhost:5000/api/auth'

const api = {
  login: async ({ email, password }) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      return data.user
    } catch (error) {
      throw error
    }
  },

  adminLogin: async ({ email, password }) => {
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      return data.user
    } catch (error) {
      throw error
    }
  },

  register: async ({ name, email, password, role }) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      return await response.json()
    } catch (error) {
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  getMasters: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/masters')
      if (!response.ok) throw new Error('Failed to fetch masters')
      return await response.json()
    } catch (error) {
      console.error('Error fetching masters:', error)
      return []
    }
  },

  getUser: async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`)
      if (!response.ok) throw new Error('Failed to fetch user')
      return await response.json()
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  },

  me: async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }

      const response = await fetch(`${API_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Token invalid or expired, clear storage
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          throw new Error('Session expired')
        }
        throw new Error('Failed to fetch user')
      }

      const user = await response.json()
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(user))
      return user
    } catch (error) {
      console.error('Error fetching current user:', error)
      throw error
    }
  },

  // Groups API
  syncGroups: async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/groups/sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) throw new Error('Failed to sync groups')
      return await response.json()
    } catch (error) {
      console.error('Error syncing groups:', error)
      throw error
    }
  },

  getGroups: async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/groups', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch groups')
      return await response.json()
    } catch (error) {
      console.error('Error fetching groups:', error)
      return []
    }
  },

  updateGroupDisplayName: async (id, displayName) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/groups/${id}/display-name`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ display_name: displayName })
      })
      if (!response.ok) throw new Error('Failed to update group')
      return await response.json()
    } catch (error) {
      console.error('Error updating group:', error)
      throw error
    }
  },

  toggleGroupActive: async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }
      
      const response = await fetch(`http://localhost:5000/api/groups/${id}/toggle-active`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to toggle group status' }))
        throw new Error(errorData.message || `Server error: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error toggling group:', error)
      throw error
    }
  },

  // MT5 Accounts API
  getActiveGroups: async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/mt5-accounts/active-groups', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch active groups')
      return await response.json()
    } catch (error) {
      console.error('Error fetching active groups:', error)
      return []
    }
  },

  getMyMT5Accounts: async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/mt5-accounts/my-accounts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch MT5 accounts')
      return await response.json()
    } catch (error) {
      console.error('Error fetching MT5 accounts:', error)
      return []
    }
  },

  createMT5Account: async (accountData) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch('http://localhost:5000/api/mt5-accounts/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
      })

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch (e) {
          const errorText = await response.text().catch(() => 'Unknown error')
          errorData = { message: errorText || 'Failed to create MT5 account' }
        }
        const errorMessage = errorData.message || errorData.Message || `Server error: ${response.status} ${response.statusText}`
        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating MT5 account:', error)
      throw error
    }
  },
}

export default api
