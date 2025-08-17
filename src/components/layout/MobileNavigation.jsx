import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Plus, MessageCircle, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

const MobileNavigation = () => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const { t } = useTheme()

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    {
      path: '/',
      icon: Home,
      label: t('nav.home'),
      requireAuth: false,
    },
    {
      path: '/items',
      icon: Search,
      label: t('nav.browse'),
      requireAuth: false,
    },
    {
      path: '/sell',
      icon: Plus,
      label: t('nav.sell'),
      requireAuth: true,
    },
    {
      path: '/messages',
      icon: MessageCircle,
      label: t('nav.messages'),
      requireAuth: true,
      badge: 0, // This would come from context/state
    },
    {
      path: isAuthenticated ? '/profile' : '/login',
      icon: User,
      label: isAuthenticated ? t('nav.profile') : t('nav.login'),
      requireAuth: false,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-40">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          // Don't show auth-required items if not authenticated
          if (item.requireAuth && !isAuthenticated && item.path !== '/login') {
            return null
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors ${
                active
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge && item.badge > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 w-4 h-4 p-0 flex items-center justify-center text-xs"
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs mt-1 truncate max-w-full">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileNavigation

