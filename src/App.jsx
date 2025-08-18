import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Layout Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import MobileNavigation from './components/layout/MobileNavigation'

// Page Components
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ItemsPage from './pages/items/ItemsPage'
import ItemDetailPage from './pages/items/ItemDetailPage'
import CreateItemPage from './pages/items/CreateItemPage'
import ProfilePage from './pages/profile/ProfilePage'
import MessagesPage from './pages/messages/MessagesPage'
import OrdersPage from './pages/orders/OrdersPage'

// Context
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background flex flex-col">
            <Header />
            
            <main className="flex-1 pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/items" element={<ItemsPage />} />
                <Route path="/items/:id" element={<ItemDetailPage />} />
                <Route path="/sell" element={<CreateItemPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Routes>
            </main>
            
            {isMobile && <MobileNavigation />}
            {!isMobile && <Footer />}
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

