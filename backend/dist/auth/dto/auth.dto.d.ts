import { UserRole } from '../../config/supabase.config';
export declare class SignUpDto {
    email: string;
    password: string;
    role?: string;
}
export declare class SignInDto {
    email: string;
    password: string;
}
export declare class UpdateRoleDto {
    role: string;
}
export declare class UserProfileResponseDto {
    id: string;
    email: string;
    role: UserRole;
    created_at: string;
    updated_at: string;
}
export declare class AuthResponseDto {
    user: UserProfileResponseDto;
    token: string;
}
