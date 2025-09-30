import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { UserProfile, UserRole } from '../config/supabase.config';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration is missing');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  async createUserProfile(profile: UserProfile): Promise<UserProfile> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .insert([profile])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create user profile: ${error.message}`);
    }

    return data;
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // User not found
      }
      throw new Error(`Failed to get user profile: ${error.message}`);
    }

    return data;
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // User not found
      }
      throw new Error(`Failed to update user profile: ${error.message}`);
    }

    return data;
  }

  async updateUserRole(userId: string, role: UserRole): Promise<UserProfile | null> {
    return this.updateUserProfile(userId, { 
      role,
      updated_at: new Date().toISOString(),
    });
  }

  async deleteUserProfile(userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('user_profiles')
      .delete()
      .eq('id', userId);

    if (error) {
      throw new Error(`Failed to delete user profile: ${error.message}`);
    }
  }

  async getAllUsers(): Promise<UserProfile[]> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to get all users: ${error.message}`);
    }

    return data || [];
  }

  async getUsersByRole(role: UserRole): Promise<UserProfile[]> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('role', role)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to get users by role: ${error.message}`);
    }

    return data || [];
  }
}