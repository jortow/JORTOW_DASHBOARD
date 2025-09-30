import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { 
  ChartBarIcon, 
  BoltIcon, 
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  CpuChipIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

export function LandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: BoltIcon,
      title: 'Real-time Signals',
      description: 'Get instant trading signals powered by advanced algorithms and market analysis.'
    },
    {
      icon: CpuChipIcon,
      title: 'AI-Powered Analysis',
      description: 'Leverage artificial intelligence for market predictions and trading insights.'
    },
    {
      icon: ChartBarIcon,
      title: 'Advanced Analytics',
      description: 'Comprehensive market scanner, technical analysis, and performance tracking.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Risk Management',
      description: 'Built-in risk management tools to protect your trading capital.'
    },
    {
      icon: ArrowTrendingUpIcon,
      title: 'Performance Tracking',
      description: 'Monitor your trading performance with detailed analytics and reports.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Markets',
      description: 'Access trading opportunities across global financial markets.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary-600">
                  Joy of Risk
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/pricing')}>
                Pricing
              </Button>
              <Button variant="outline">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Target One Wave
              <span className="block text-primary-600">Master Your Trading</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Unlock the power of professional trading with our comprehensive SaaS platform. 
              Get real-time signals, AI-powered analysis, and advanced tools to maximize your trading success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => navigate('/pricing')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full">
            <div className="w-full h-full bg-gradient-to-r from-primary-100/20 to-secondary-100/20 blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools and insights you need to make informed trading decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful traders who trust Joy of Risk for their trading needs.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-4 bg-white text-primary-600 hover:bg-gray-50"
            onClick={() => navigate('/pricing')}
          >
            Choose Your Plan
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Joy of Risk</h3>
            <p className="text-gray-400 mb-4">
              Professional trading platform for serious traders
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 Joy of Risk. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}