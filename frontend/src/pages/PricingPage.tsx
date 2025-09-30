import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card'
import { AuthModal } from '../components/auth/AuthModal'
import { UserRole } from '../lib/supabase'
import { CheckIcon } from '@heroicons/react/24/solid'

export function PricingPage() {
  const navigate = useNavigate()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<UserRole>('basic')

  const plans = [
    {
      name: 'Basic',
      role: 'basic' as UserRole,
      price: 29,
      description: 'Perfect for beginners getting started with trading',
      features: [
        'Trading Signals',
        'Trade Ideas',
        'Education Videos',
        'Basic Support',
        'Mobile App Access'
      ],
      popular: false
    },
    {
      name: 'Pro',
      role: 'pro' as UserRole,
      price: 79,
      description: 'Advanced tools for serious traders',
      features: [
        'Everything in Basic',
        'Market Scanner',
        'AI-Powered Signals',
        'Technical Analysis Tools',
        'Priority Support',
        'Advanced Charts',
        'Risk Management Tools'
      ],
      popular: true
    },
    {
      name: 'Exclusive',
      role: 'exclusive' as UserRole,
      price: 199,
      description: 'Complete trading suite with mentorship',
      features: [
        'Everything in Pro',
        'Live Trading Sessions',
        'Personal Mentorship',
        'Custom Strategies',
        'VIP Community Access',
        'Economic Calendar',
        'Copy Trading',
        'Performance Analytics',
        '24/7 Premium Support'
      ],
      popular: false
    }
  ]

  const handleSelectPlan = (role: UserRole) => {
    setSelectedPlan(role)
    setAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="text-2xl font-bold text-primary-600 hover:text-primary-700"
              >
                Joy of Risk
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button variant="outline">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Trading Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan to match your trading goals and experience level
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.role} 
              className={`relative ${plan.popular ? 'ring-2 ring-primary-500 shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleSelectPlan(plan.role)}
                >
                  Select {plan.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                We offer a 7-day free trial for all new users to explore our platform and features.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of successful traders today
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary-600 hover:bg-gray-50"
            onClick={() => handleSelectPlan('pro')}
          >
            Start Free Trial
          </Button>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode="signup"
        selectedPlan={selectedPlan}
      />
    </div>
  )
}