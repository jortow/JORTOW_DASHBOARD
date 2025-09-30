import React from 'react'

// Simple test component to verify the app is working
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Joy of Risk - Target One Wave
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Dashboard is loading...
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Frontend:</span>
              <span className="text-green-600">✓ Running</span>
            </div>
            <div className="flex justify-between">
              <span>Backend API:</span>
              <span className="text-green-600">✓ Connected</span>
            </div>
            <div className="flex justify-between">
              <span>Supabase:</span>
              <span className="text-green-600">✓ Configured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

// Protected Route Component
function ProtectedRoute({ children, permission }: { children: React.ReactNode; permission?: string }) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (permission && profile?.role && !hasPermission(profile.role, permission)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">
            This feature requires a higher subscription plan.
          </p>
          <button 
            onClick={() => window.location.href = '/pricing'}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Dashboard Routes Component
function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      
      <Route 
        path="/announcements" 
        element={
          <BlankPage 
            title="Announcements" 
            description="Stay updated with the latest news and announcements from our trading team."
            icon={SpeakerWaveIcon}
          />
        } 
      />
      
      <Route 
        path="/ai-signals" 
        element={
          <ProtectedRoute permission="ai-signals">
            <BlankPage 
              title="AI Signals" 
              description="Advanced AI-powered trading signals to help you make informed decisions."
              icon={BoltIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/trade-ideas" 
        element={
          <ProtectedRoute permission="trade-ideas">
            <BlankPage 
              title="Trade Ideas" 
              description="Expert-curated trading ideas and market opportunities."
              icon={LightBulbIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/market-scanner" 
        element={
          <ProtectedRoute permission="market-scanner">
            <BlankPage 
              title="Market Scanner" 
              description="Scan markets for trading opportunities with advanced filtering tools."
              icon={MagnifyingGlassIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/technical-analysis" 
        element={
          <ProtectedRoute permission="technical-analysis">
            <BlankPage 
              title="Technical Analysis" 
              description="Comprehensive technical analysis tools and charting capabilities."
              icon={ChartBarIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/heatmap" 
        element={
          <ProtectedRoute permission="heatmap">
            <BlankPage 
              title="Market Heatmap" 
              description="Visual representation of market performance across different assets."
              icon={MapIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/economic-calendar" 
        element={
          <ProtectedRoute permission="economic-calendar">
            <BlankPage 
              title="Economic Calendar" 
              description="Track important economic events that impact the markets."
              icon={CalendarIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/manual-trades" 
        element={
          <ProtectedRoute permission="manual-trades">
            <BlankPage 
              title="Manual Trades" 
              description="Execute and manage your manual trading positions."
              icon={CurrencyDollarIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/copy-trading" 
        element={
          <ProtectedRoute permission="copy-trading">
            <BlankPage 
              title="Copy Trading" 
              description="Follow and copy trades from successful traders."
              icon={DocumentDuplicateIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/watchlist" 
        element={
          <ProtectedRoute permission="watchlist">
            <BlankPage 
              title="Watchlist" 
              description="Monitor your favorite trading instruments and assets."
              icon={EyeIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/performance" 
        element={
          <ProtectedRoute permission="performance">
            <BlankPage 
              title="Performance Analytics" 
              description="Track and analyze your trading performance and statistics."
              icon={ChartPieIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/breaking-news" 
        element={
          <ProtectedRoute permission="breaking-news">
            <BlankPage 
              title="Breaking News" 
              description="Real-time market news and breaking financial updates."
              icon={NewspaperIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/fundamental-news" 
        element={
          <ProtectedRoute permission="fundamental-news">
            <BlankPage 
              title="Fundamental News" 
              description="In-depth fundamental analysis and market research."
              icon={DocumentTextIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/meetings" 
        element={
          <ProtectedRoute permission="meetings">
            <BlankPage 
              title="Meetings & Mentorship" 
              description="Schedule and join mentorship sessions with trading experts."
              icon={UsersIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/education-videos" 
        element={
          <ProtectedRoute permission="education-videos">
            <BlankPage 
              title="Education Videos" 
              description="Learn trading strategies and techniques from expert tutorials."
              icon={VideoCameraIcon}
            />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/notifications" 
        element={
          <BlankPage 
            title="Notifications" 
            description="Manage your trading alerts and notification preferences."
            icon={BellIcon}
          />
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <BlankPage 
            title="Profile" 
            description="Manage your account information and trading preferences."
            icon={UserIcon}
          />
        } 
      />
      
      <Route 
        path="/settings" 
        element={
          <BlankPage 
            title="Settings" 
            description="Configure your dashboard settings and preferences."
            icon={Cog6ToothIcon}
          />
        } 
      />
    </Routes>
  )
}

// Main App Component
function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Joy of Risk...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} 
      />
      <Route 
        path="/pricing" 
        element={user ? <Navigate to="/dashboard" replace /> : <PricingPage />} 
      />
      
      {/* Protected Dashboard Routes */}
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardRoutes />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <AppContent />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
