import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { hasPermission } from '../../lib/supabase'
import {
  BoltIcon,
  ChartBarIcon,
  EyeIcon,
  PlayIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

export function DashboardHome() {
  const { profile } = useAuth()

  const quickAccessItems = [
    {
      name: 'AI Signals',
      description: 'Latest AI-powered trading signals',
      icon: BoltIcon,
      href: '/dashboard/ai-signals',
      permission: 'ai-signals',
      color: 'bg-blue-500'
    },
    {
      name: 'Trade Ideas',
      description: 'Expert trading recommendations',
      icon: ChartBarIcon,
      href: '/dashboard/trade-ideas',
      permission: 'trade-ideas',
      color: 'bg-green-500'
    },
    {
      name: 'Watchlist',
      description: 'Monitor your favorite assets',
      icon: EyeIcon,
      href: '/dashboard/watchlist',
      permission: 'watchlist',
      color: 'bg-purple-500'
    },
    {
      name: 'Education',
      description: 'Learn from trading experts',
      icon: PlayIcon,
      href: '/dashboard/education-videos',
      permission: 'education-videos',
      color: 'bg-orange-500'
    }
  ]

  const stats = [
    {
      name: 'Active Signals',
      value: '12',
      change: '+2.5%',
      changeType: 'positive' as const,
      icon: BoltIcon
    },
    {
      name: 'Portfolio Value',
      value: '$24,500',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: CurrencyDollarIcon
    },
    {
      name: 'Win Rate',
      value: '68%',
      change: '+1.2%',
      changeType: 'positive' as const,
      icon: ArrowTrendingUpIcon
    }
  ]

  const availableQuickAccess = quickAccessItems.filter(item => 
    profile?.role && hasPermission(profile.role, item.permission)
  )

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {profile?.email?.split('@')[0]}!
        </h1>
        <p className="text-primary-100">
          You're on the <span className="font-semibold capitalize">{profile?.role}</span> plan. 
          Ready to make some profitable trades today?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {availableQuickAccess.map((item) => (
            <Card key={item.name} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <CardTitle className="text-base">{item.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm mb-3">
                  {item.description}
                </CardDescription>
                <Button variant="outline" size="sm" className="w-full">
                  Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest trading activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium">New AI Signal: EURUSD Buy</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium">Trade Idea Updated: GBPJPY</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-orange-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium">New Education Video Available</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Watch</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Upgrade CTA (for Basic and Pro users) */}
      {profile?.role !== 'exclusive' && (
        <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary-900">
                  Unlock More Features
                </h3>
                <p className="text-primary-700 mt-1">
                  Upgrade to {profile?.role === 'basic' ? 'Pro or Exclusive' : 'Exclusive'} for advanced tools and mentorship
                </p>
              </div>
              <Button className="bg-primary-600 hover:bg-primary-700">
                Upgrade Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}