import { useState, useEffect } from 'react'
import ThemeToggle from '../components/ThemeToggle'

const API_BASE_URL = 'https://api.gistify.pro'

// Google Icon SVG
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

// Amazon Icon SVG
const AmazonIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.44-2.186 1.44-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.683zm3.186 7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.549.582l-3.061-.333c-.259-.056-.548-.266-.472-.66C6.057 1.926 9.311 1 12.152 1c1.435 0 3.313.383 4.444 1.473 1.435 1.335 1.298 3.115 1.298 5.054v4.58c0 1.378.572 1.981 1.11 2.726.187.265.229.582-.009.778-.595.5-1.651 1.425-2.234 1.94l-.617.244z"/>
    <path d="M20.176 19.006c-2.171 1.685-5.314 2.586-8.024 2.586-3.797 0-7.216-1.519-9.802-4.047-.204-.195-.022-.461.222-.311 2.792 1.761 6.244 2.82 9.808 2.82 2.405 0 5.049-.539 7.481-1.656.367-.171.675.26.315.608z"/>
    <path d="M21.211 17.707c-.277-.378-1.832-.179-2.532-.09-.212.027-.245-.171-.054-.314 1.241-.924 3.278-.658 3.516-.348.238.313-.063 2.476-1.227 3.509-.179.159-.349.074-.27-.136.262-.695.849-2.244.567-2.621z"/>
  </svg>
)

// X (Twitter) Icon SVG
const XIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<void>
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isAmazonLoading, setIsAmazonLoading] = useState(false)
  const [isXLoading, setIsXLoading] = useState(false)
  const [isDark, setIsDark] = useState(false)

  // Tema durumunu takip et
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      setIsDark(theme === 'dark')
    }
    
    checkTheme()
    
    // MutationObserver ile tema değişikliklerini dinle
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    })
    
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await onLogin(username, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    setError('')
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/google/login`)
      const data = await response.json()
      
      if (data.auth_url) {
        // Redirect to Google OAuth
        window.location.href = data.auth_url
      } else {
        setError('Failed to initiate Google login')
      }
    } catch (err) {
      setError('Failed to connect to authentication server')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleAmazonLogin = async () => {
    setIsAmazonLoading(true)
    setError('')
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/amazon/login`)
      const data = await response.json()
      
      if (data.auth_url) {
        // Redirect to Amazon OAuth
        window.location.href = data.auth_url
      } else {
        setError('Failed to initiate Amazon login')
      }
    } catch (err) {
      setError('Failed to connect to authentication server')
    } finally {
      setIsAmazonLoading(false)
    }
  }

  const handleXLogin = async () => {
    setIsXLoading(true)
    setError('')
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/x/login`)
      const data = await response.json()
      
      if (data.auth_url) {
        // Redirect to X OAuth
        window.location.href = data.auth_url
      } else {
        setError('Failed to initiate X login')
      }
    } catch (err) {
      setError('Failed to connect to authentication server')
    } finally {
      setIsXLoading(false)
    }
  }

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div 
          className="w-full max-w-md animate-slide-up"
          style={{ 
            backgroundColor: 'var(--bg-card)',
            borderRadius: '24px',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid var(--border-color)',
          }}
        >
          {/* Header */}
          <div className="p-8 pb-6 text-center">
            <div className="flex justify-center mb-4">
              <img 
                src={isDark ? '/logos/logo-dark.png' : '/logos/logo-light.png'}
                alt="Gistify"
                className="h-32 w-auto rounded-2xl"
              />
            </div>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Sign in to access all Gistify apps
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8">
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Username */}
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-3 px-4 rounded-xl font-semibold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'var(--accent-gradient)' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: 'var(--border-color)' }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)' }}>
                  or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full py-3 px-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{ 
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              {isGoogleLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connecting...
                </span>
              ) : (
                <>
                  <GoogleIcon />
                  Continue with Google
                </>
              )}
            </button>

            {/* Amazon Login Button */}
            <button
              type="button"
              onClick={handleAmazonLogin}
              disabled={isAmazonLoading}
              className="w-full mt-3 py-3 px-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{ 
                background: 'linear-gradient(to bottom, #f7d066 0%, #f0c14b 100%)',
                border: '1px solid #a88734',
                color: '#111',
              }}
            >
              {isAmazonLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connecting...
                </span>
              ) : (
                <>
                  <AmazonIcon />
                  Continue with Amazon
                </>
              )}
            </button>

            {/* X (Twitter) Login Button */}
            <button
              type="button"
              onClick={handleXLogin}
              disabled={isXLoading}
              className="w-full mt-3 py-3 px-4 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{ 
                backgroundColor: '#000',
                border: '1px solid #333',
                color: '#fff',
              }}
            >
              {isXLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connecting...
                </span>
              ) : (
                <>
                  <XIcon />
                  Continue with X
                </>
              )}
            </button>

            {/* Register Link */}
            <p className="mt-6 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <a 
                href="https://gistify.pro/register" 
                className="font-medium hover:underline"
                style={{ color: '#667eea' }}
              >
                Create one
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        © 2025 Gistify. All rights reserved.
      </footer>
    </div>
  )
}
