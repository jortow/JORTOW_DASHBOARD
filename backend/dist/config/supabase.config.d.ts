import { ConfigService } from '@nestjs/config';
export declare const createSupabaseClient: (configService: ConfigService) => import("@supabase/supabase-js").SupabaseClient<any, "public", "public", any, any>;
export interface UserProfile {
    id: string;
    email: string;
    role: 'basic' | 'pro' | 'exclusive';
    created_at: string;
    updated_at: string;
}
export declare const UserRole: {
    readonly BASIC: "basic";
    readonly PRO: "pro";
    readonly EXCLUSIVE: "exclusive";
};
export type UserRole = typeof UserRole[keyof typeof UserRole];
