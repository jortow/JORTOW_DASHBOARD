import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { hasPermission } from '../../lib/supabase'
import { cn } from '../../lib/utils'
import {
  SpeakerWaveIcon,
  BoltIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  MapIcon,
  CalendarIcon,
  PencilIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  ChartPieIcon,
  NewspaperIcon,
  DocumentTextIcon,
  UsersIcon,
  PlayIcon,
  BellIcon,
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

const navigationItems = [
  { name: 'Announcements', href: '/dashboard/announcements', icon: SpeakerWaveIcon, permission: 'announcements' },
  { name: 'AI Signals', href: '/dashboard/ai-signals', icon: BoltIcon, permission: 'ai-signals' },
  { name: 'Trade Ideas', href: '/dashboard/trade-ideas', icon: LightBulbIcon, permission: 'trade-ideas' },
  { name: 'Market Scanner', href: '/dashboard/market-scanner', icon: MagnifyingGlassIcon, permission: 'market-scanner' },
  { name: 'Technical Analysis', href: '/dashboard/technical-analysis', icon: ChartBarIcon, permission: 'technical-analysis' },
  { name: 'Heatmap', href: '/dashboard/heatmap', icon: MapIcon, permission: 'heatmap' },
  { name: 'Economic Calendar', href: '/dashboard/economic-calendar', icon: CalendarIcon, permission: 'economic-calendar' },
  { name: 'Manual Trades', href: '/dashboard/manual-trades', icon: PencilIcon, permission: 'manual-trades' },
  { name: 'Copy Trading', href: '/dashboard/copy-trading', icon: DocumentDuplicateIcon, permission: 'copy-trading' },
  { name: 'Watchlist', href: '/dashboard/watchlist', icon: EyeIcon, permission: 'watchlist' },
  { name: 'Performance', href: '/dashboard/performance', icon: ChartPieIcon, permission: 'performance' },
  { name: 'Breaking News', href: '/dashboard/breaking-news', icon: NewspaperIcon, permission: 'breaking-news' },
  { name: 'Fundamental News', href: '/dashboard/fundamental-news', icon: DocumentTextIcon, permission: 'fundamental-news' },
  { name: 'Meetings', href: '/dashboard/meetings', icon: UsersIcon, permission: 'meetings' },
  { name: 'Education Videos', href: '/dashboard/education-videos', icon: PlayIcon, permission: 'education-videos' },
  { name: 'Notifications', href: '/dashboard/notifications', icon: BellIcon, permission: 'notifications' },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon, permission: 'profile' },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon, permission: 'settings' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const filteredNavigation = navigationItems.filter(item => 
    profile?.role && hasPermission(profile.role, item.permission)
  )

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-primary-600">Joy of Risk</h1>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User info */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{profile?.email}</p>
                <p className="text-xs text-gray-500 capitalize">{profile?.role} Plan</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href)
                    onClose()
                  }}
                  className={cn(
                    'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}