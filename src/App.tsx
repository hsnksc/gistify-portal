import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import PortalPage from './pages/PortalPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)

  useEffect(() => {
    // Check for OAuth callback token in URL
    const urlParams = new URLSearchParams(window.location.search)
    const callbackToken = urlParams.get('token')
    
    // Handle /auth/callback path (from OAuth providers)
    if (window.location.pathname === '/auth/callback') {
      if (callbackToken) {
        // OAuth callback - store token and redirect to home
        localStorage.setItem('gistify_token', callbackToken)
        // Use replace to avoid adding to history, redirect to clean URL
        window.location.replace('/')
        return
      } else {
        // No token in callback, redirect to home
        window.location.replace('/')
        return
      }
    }
    
    // Handle token in query params on any page (legacy support)
    if (callbackToken) {
      localStorage.setItem('gistify_token', callbackToken)
      window.history.replaceState({}, '', window.location.pathname)
      checkAuth(callbackToken)
      return
    }
    
    const token = localStorage.getItem('gistify_token')
    if (token) {
      checkAuth(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  const checkAuth = async (token: string) => {
    try {
      const response = await fetch('https://api.gistify.pro/api/v1/auth/me', {
        headers: { 'Authorization': 'Bearer ' + token },
      })
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('gistify_token')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('gistify_token')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (username: string, password: string) => {
    const response = await fetch('https://api.gistify.pro/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Login failed')
    }
    const data = await response.json()
    localStorage.setItem('gistify_token', data.access_token)
    setUser({ username: data.username || username, email: data.email || '' })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('gistify_token')
    setUser(null)
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className='animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent'></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <PortalPage user={user} onLogout={handleLogout} />
}

export default App
