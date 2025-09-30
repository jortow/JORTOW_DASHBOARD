"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_service_1 = require("./supabase.service");
let AuthService = class AuthService {
    configService;
    jwtService;
    supabaseService;
    supabase;
    constructor(configService, jwtService, supabaseService) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.supabaseService = supabaseService;
        const supabaseUrl = this.configService.get('SUPABASE_URL');
        const supabaseServiceKey = this.configService.get('SUPABASE_SERVICE_ROLE_KEY');
        if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error('Supabase configuration is missing. Please check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
        }
        this.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });
    }
    async signUp(signUpDto) {
        const { email, password, role = 'basic' } = signUpDto;
        const { data: authData, error: authError } = await this.supabase.auth.signUp({
            email,
            password,
        });
        if (authError) {
            throw new common_1.BadRequestException(authError.message);
        }
        if (!authData.user) {
            throw new common_1.BadRequestException('Failed to create user');
        }
        const userProfile = await this.supabaseService.createUserProfile({
            id: authData.user.id,
            email: authData.user.email,
            role: role,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });
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
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const { data: authData, error: authError } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (authError) {
            throw new common_1.UnauthorizedException(authError.message);
        }
        if (!authData.user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const userProfile = await this.supabaseService.getUserProfile(authData.user.id);
        if (!userProfile) {
            throw new common_1.NotFoundException('User profile not found');
        }
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
    async getCurrentUser(userId) {
        const userProfile = await this.supabaseService.getUserProfile(userId);
        if (!userProfile) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: userProfile.id,
            email: userProfile.email,
            role: userProfile.role,
            created_at: userProfile.created_at,
            updated_at: userProfile.updated_at,
        };
    }
    async updateUserRole(userId, updateRoleDto) {
        const updatedProfile = await this.supabaseService.updateUserProfile(userId, {
            role: updateRoleDto.role,
            updated_at: new Date().toISOString(),
        });
        if (!updatedProfile) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: updatedProfile.id,
            email: updatedProfile.email,
            role: updatedProfile.role,
            created_at: updatedProfile.created_at,
            updated_at: updatedProfile.updated_at,
        };
    }
    async getAllUsers() {
        const users = await this.supabaseService.getAllUsers();
        return users.map(user => ({
            id: user.id,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }));
    }
    async getUserById(userId) {
        const user = await this.supabaseService.getUserProfile(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    }
    async deleteUser(userId) {
        const { error: authError } = await this.supabase.auth.admin.deleteUser(userId);
        if (authError) {
            throw new common_1.BadRequestException(authError.message);
        }
        await this.supabaseService.deleteUserProfile(userId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService,
        supabase_service_1.SupabaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map