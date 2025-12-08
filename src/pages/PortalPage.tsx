import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import ThemeToggle from "../components/ThemeToggle"

// App logos - imported from public folder
const APP_LOGOS: Record<string, { light: string; dark: string }> = {
  pulse: {
    light: "/logos/pulse-light.png",
    dark: "/logos/pulse-dark.png",
  },
  notebook: {
    light: "/logos/notebook-light.png",
    dark: "/logos/notebook-dark.png",
  },
}

// Fallback icons for apps without logos
const APP_ICONS: Record<string, ReactNode> = {
  notebook: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  pulse: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
}

// Default apps - Notebook and Pulse only
const DEFAULT_APPS = [
  {
    id: "notebook",
    name: "Notebook",
    description: "AI-powered transcription, notes & knowledge base",
    url: "https://notebook.gistify.pro",
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
    badge: null,
  },
  {
    id: "pulse",
    name: "Pulse",
    description: "Share ideas with resonance reactions",
    url: "https://pulse.gistify.pro",
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-600",
    badge: "NEW",
  },
]

interface PortalPageProps {
  user: { username: string; email: string } | null
  onLogout: () => void
}

export default function PortalPage({ user, onLogout }: PortalPageProps) {
  const [apps, setApps] = useState(DEFAULT_APPS)
  const [credits, setCredits] = useState(0)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const theme = document.documentElement.getAttribute("data-theme")
    setIsDark(theme === "dark")

    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme")
      setIsDark(newTheme === "dark")
    })
    observer.observe(document.documentElement, { attributes: true })

    fetchApps()

    return () => observer.disconnect()
  }, [])

  const fetchApps = async () => {
    try {
      const token = localStorage.getItem("gistify_token")
      const response = await fetch("https://api.gistify.pro/api/v1/portal/apps", {
        headers: { Authorization: "Bearer " + token },
      })
      if (response.ok) {
        const data = await response.json()
        setApps(data.apps)
        setCredits(data.user?.credits || 0)
      }
    } catch (error) {
      console.error("Failed to fetch apps:", error)
    }
  }

  const handleAppClick = (url: string) => {
    // Get token from localStorage and pass it to subdomain via URL param
    const token = localStorage.getItem('gistify_token')
    if (token) {
      const separator = url.includes('?') ? '&' : '?'
      window.location.href = `${url}${separator}auth_token=${encodeURIComponent(token)}`
    } else {
      window.location.href = url
    }
  }

  const getAppLogo = (appId: string) => {
    const logos = APP_LOGOS[appId]
    if (logos) {
      return isDark ? logos.dark : logos.light
    }
    return null
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ background: "var(--accent-gradient)" }}>
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Gistify
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
            >
              <span style={{ color: "#f59e0b" }}>⚡</span>
              <span style={{ color: "var(--text-primary)" }}>{credits.toFixed(1)} credits</span>
            </div>

            <ThemeToggle />

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {user?.username}
                </p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {user?.email}
                </p>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Welcome back,{" "}
            <span
              style={{
                background: "var(--accent-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {user?.username}
            </span>
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Choose an app to get started
          </p>
        </div>

        {/* Apps Grid - 2 columns for 2 apps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {apps.map((app, index) => {
            const logoSrc = getAppLogo(app.id)
            const icon = APP_ICONS[app.id]

            return (
              <button
                key={app.id}
                onClick={() => handleAppClick(app.url)}
                className="group relative p-8 rounded-2xl text-center transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  boxShadow: "var(--card-shadow)",
                  animationDelay: (index + 1) * 100 + "ms",
                }}
              >
                {app.badge && (
                  <span
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                    style={{ background: app.color }}
                  >
                    {app.badge}
                  </span>
                )}

                <div
                  className={"absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br " + app.gradient}
                />

                {/* App Logo or Icon */}
                <div className="flex justify-center mb-6">
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={app.name}
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <div
                      className={"w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br " + app.gradient + " group-hover:scale-110 transition-transform"}
                    >
                      {icon}
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  {app.name}
                </h3>

                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {app.description}
                </p>

                <div
                  className="mt-4 opacity-0 group-hover:opacity-100 transition-all"
                  style={{ color: app.color }}
                >
                  <span className="text-sm font-medium">Open App →</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div
          className="mt-12 p-6 rounded-2xl animate-slide-up"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            animationDelay: "400ms",
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p
                className="text-3xl font-bold"
                style={{
                  background: "var(--accent-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                2
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Apps Available
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold" style={{ color: "#10b981" }}>
                ∞
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Possibilities
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold" style={{ color: "#ec4899" }}>
                AI
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Powered
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold" style={{ color: "#f59e0b" }}>
                24/7
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Available
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
        <p>© 2025 Gistify. All rights reserved.</p>
        <p className="mt-2">Built with ❤️ for creators, learners, and innovators.</p>
      </footer>
    </div>
  )
}
