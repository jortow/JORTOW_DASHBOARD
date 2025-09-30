import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SignUpDto, SignInDto, UpdateRoleDto, AuthResponseDto, UserProfileResponseDto } from './dto/auth.dto';
import { SupabaseService } from './supabase.service';
import type { UserProfile, UserRole } from '../config/supabase.config';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private supabaseService: SupabaseService,
  ) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration is missing. Please check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  async signUp(signUpDto: SignUpDto): Promise<AuthResponseDto> {
    const { email, password, role = 'basic' } = signUpDto;

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      throw new BadRequestException(authError.message);
    }

    if (!authData.user) {
      throw new BadRequestException('Failed to create user');
    }

    // Create user profile in database
    const userProfile = await this.supabaseService.createUserProfile({
      id: authData.user.id,
      email: authData.user.email!,
      role: role as UserRole,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: authData.user.id,
      email: authData.user.email,
    });

    return {
      user: {
        id: userProfile.id,
        email: userProfile.email,
        role: userProfile.role,
        created_at: userProfile.created_at,
        updated_at: userProfile.updated_at,
      },
      token,
    };
  }

  async signIn(signInDto: SignInDto): Promise<AuthResponseDto> {
    const { email, password } = signInDto;

    // Authenticate with Supabase
    const { data: authData, error: authError } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      throw new UnauthorizedException(authError.message);
    }

    if (!authData.user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get user profile
    const userProfile = await this.supabaseService.getUserProfile(authData.user.id);
    if (!userProfile) {
      throw new NotFoundException('User profile not found');
    }

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: authData.user.id,
      email: authData.user.email,
    });

    return {
      user: {
        id: userProfile.id,
        email: userProfile.email,
        role: userProfile.role,
        created_at: userProfile.created_at,
        updated_at: userProfile.updated_at,
      },
      token,
    };
  }

  async getCurrentUser(userId: string): Promise<UserProfileResponseDto> {
    const userProfile = await this.supabaseService.getUserProfile(userId);
    if (!userProfile) {
      throw new NotFoundException('User not found');
    }

    return {
      id: userProfile.id,
      email: userProfile.email,
      role: userProfile.role,
      created_at: userProfile.created_at,
      updated_at: userProfile.updated_at,
    };
  }

  async updateUserRole(userId: string, updateRoleDto: UpdateRoleDto): Promise<UserProfileResponseDto> {
    const updatedProfile = await this.supabaseService.updateUserProfile(userId, {
      role: updateRoleDto.role as UserRole,
      updated_at: new Date().toISOString(),
    });

    if (!updatedProfile) {
      throw new NotFoundException('User not found');
    }

    return {
      id: updatedProfile.id,
      email: updatedProfile.email,
      role: updatedProfile.role,
      created_at: updatedProfile.created_at,
      updated_at: updatedProfile.updated_at,
    };
  }

  async getAllUsers(): Promise<UserProfileResponseDto[]> {
    const users = await this.supabaseService.getAllUsers();
    return users.map(user => ({
      id: user.id,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));
  }

  async getUserById(userId: string): Promise<UserProfileResponseDto> {
    const user = await this.supabaseService.getUserProfile(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async deleteUser(userId: string): Promise<void> {
    // Delete from Supabase Auth
    const { error: authError } = await this.supabase.auth.admin.deleteUser(userId);
    if (authError) {
      throw new BadRequestException(authError.message);
    }

    // Delete user profile from database
    await this.supabaseService.deleteUserProfile(userId);
  }
}