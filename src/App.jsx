import { Routes, Route, useRoutes } from 'react-router-dom'
import Header from './components/home/Header'
import Hero from './components/home/Hero'
import Features from './components/home/Features'
import Analytics from './components/home/Analytics'
import Footer from './components/home/Footer'
import UserLogin from './pages/auth/Login'
import Register from './pages/auth/Register'
import RequireGuest from './components/auth/RequireGuest'

// Route Files
import adminRoutes from './pages/admin/routes'
import masterRoutes from './pages/master/routes'
import socialRoutes from './pages/social/routes'

// Home page component
const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <div className="relative">
        <Header />
        <main className="relative">
          <Hero />
          <Features />
          <Analytics />
        </main>
        <Footer />
      </div>
    </div>
  )
}

function App() {
  // Combine all routes
  const allRoutes = [
    {
      path: "/home",
      element: <HomePage />
    },
    {
      path: "/register",
      element: <RequireGuest><Register /></RequireGuest>
    },
    {
      path: "/login",
      element: <RequireGuest><UserLogin /></RequireGuest>
    },
    ...socialRoutes,
    ...masterRoutes,
    ...adminRoutes
  ]

  const routes = useRoutes(allRoutes)

  return routes
}

export default App
