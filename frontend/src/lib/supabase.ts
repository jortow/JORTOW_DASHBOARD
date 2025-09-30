import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'basic' | 'pro' | 'exclusive'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  created_at: string
  updated_at: string
}

export const rolePermissions = {
  basic: ['signals', 'trade-ideas', 'education-videos'],
  pro: ['signals', 'trade-ideas', 'education-videos', 'market-scanner', 'ai-signals'],
  exclusive: [
    'signals', 'trade-ideas', 'education-videos', 'market-scanner', 'ai-signals',
    'announcements', 'technical-analysis', 'heatmap', 'economic-calendar',
    'manual-trades', 'copy-trading', 'watchlist', 'performance', 'breaking-news',
    'fundamental-news', 'meetings', 'notifications', 'profile', 'settings'
  ]
}

export function hasPermission(userRole: UserRole, feature: string): boolean {
  return rolePermissions[userRole].includes(feature)
}