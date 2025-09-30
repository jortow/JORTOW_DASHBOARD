import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

interface BlankPageProps {
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
  comingSoon?: boolean
}

export function BlankPage({ title, description, icon: Icon, comingSoon = true }: BlankPageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        {Icon && (
          <div className="mx-auto h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <Icon className="h-8 w-8 text-primary-600" />
          </div>
        )}
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {description}
        </p>

        {comingSoon && (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Coming Soon</CardTitle>
              <CardDescription>
                This feature is currently under development and will be available soon.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    We're working hard to bring you the best trading tools and features. 
                    Stay tuned for updates!
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline">
                    Get Notified
                  </Button>
                  <Button>
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Feature Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Real-time Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Access live market data and real-time updates for all your trading decisions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Advanced Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Powerful analytical tools to help you identify trends and opportunities.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Smart Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Intelligent notifications to keep you informed of important market movements.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}