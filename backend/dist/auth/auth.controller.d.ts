import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, UpdateRoleDto, AuthResponseDto, UserProfileResponseDto } from './dto/auth.dto';
import type { UserProfile } from '../config/supabase.config';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<AuthResponseDto>;
    signIn(signInDto: SignInDto): Promise<AuthResponseDto>;
    getCurrentUser(user: UserProfile): Promise<UserProfileResponseDto>;
    updateUserRole(userId: string, updateRoleDto: UpdateRoleDto): Promise<UserProfileResponseDto>;
    getAllUsers(): Promise<UserProfileResponseDto[]>;
    getUserById(userId: string): Promise<UserProfileResponseDto>;
    deleteUser(userId: string): Promise<{
        message: string;
    }>;
    getHealth(): {
        status: string;
        timestamp: string;
        service: string;
    };
}
