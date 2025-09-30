import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, SignInDto, UpdateRoleDto, AuthResponseDto, UserProfileResponseDto } from './dto/auth.dto';
import { SupabaseService } from './supabase.service';
export declare class AuthService {
    private configService;
    private jwtService;
    private supabaseService;
    private supabase;
    constructor(configService: ConfigService, jwtService: JwtService, supabaseService: SupabaseService);
    signUp(signUpDto: SignUpDto): Promise<AuthResponseDto>;
    signIn(signInDto: SignInDto): Promise<AuthResponseDto>;
    getCurrentUser(userId: string): Promise<UserProfileResponseDto>;
    updateUserRole(userId: string, updateRoleDto: UpdateRoleDto): Promise<UserProfileResponseDto>;
    getAllUsers(): Promise<UserProfileResponseDto[]>;
    getUserById(userId: string): Promise<UserProfileResponseDto>;
    deleteUser(userId: string): Promise<void>;
}
