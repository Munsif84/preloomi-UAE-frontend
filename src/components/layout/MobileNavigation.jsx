import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Plus, Mail, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

const MobileNavigation = () => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const { t, isRTL } = useTheme()

  const navItems = [
    {
      id: 'home',
      icon: Home,
      label: isRTL ? 'الرئيسية' : 'Home',
      path: '/',
    },
    {
      id: 'search',
      icon: Search,
      label: isRTL ? 'بحث' : 'Search',
      path: '/items',
    },
    {
      id: 'sell',
      icon: Plus,
      label: isRTL ? 'بيع' : 'Sell',
      path: '/sell',
    },
    {
      id: 'inbox',
      icon: Mail,
      label: isRTL ? 'الرسائل' : 'Inbox',
      path: '/messages',
      badge: 0, // Can be dynamic
      requireAuth: true,
    },
    {
      id: 'profile',
      icon: User,
      label: isRTL ? 'الملف الشخصي' : 'Profile',
      path: isAuthenticated ? '/profile' : '/login',
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          // Don't show auth-required items if not authenticated
          if (item.requireAuth && !isAuthenticated) {
            return null
          }

          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1"
            >
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 mb-1 ${
                    isActive 
                      ? 'text-teal-400' 
                      : 'text-gray-400'
                  }`} 
                />
                {/* Badge for notifications */}
                {item.badge > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </div>
                )}
              </div>
              <span 
                className={`text-xs ${
                  isActive 
                    ? 'text-teal-400 font-medium' 
                    : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default MobileNavigation

