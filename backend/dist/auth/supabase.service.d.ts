import { ConfigService } from '@nestjs/config';
import type { UserProfile, UserRole } from '../config/supabase.config';
export declare class SupabaseService {
    private configService;
    private supabase;
    constructor(configService: ConfigService);
    createUserProfile(profile: UserProfile): Promise<UserProfile>;
    getUserProfile(userId: string): Promise<UserProfile | null>;
    updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null>;
    updateUserRole(userId: string, role: UserRole): Promise<UserProfile | null>;
    deleteUserProfile(userId: string): Promise<void>;
    getAllUsers(): Promise<UserProfile[]>;
    getUsersByRole(role: UserRole): Promise<UserProfile[]>;
}
