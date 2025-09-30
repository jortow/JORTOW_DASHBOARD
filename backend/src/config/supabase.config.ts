import { createClient } from '@supabase/supabase-js'
import { ConfigService } from '@nestjs/config'

export const createSupabaseClient = (configService: ConfigService) => {
  const supabaseUrl = configService.get<string>('SUPABASE_URL')
  const supabaseServiceRoleKey = configService.get<string>('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase configuration')
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export interface UserProfile {
  id: string
  email: string
  role: 'basic' | 'pro' | 'exclusive'
  created_at: string
  updated_at: string
}

export const UserRole = {
  BASIC: 'basic',
  PRO: 'pro',
  EXCLUSIVE: 'exclusive',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];