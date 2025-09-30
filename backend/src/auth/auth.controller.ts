import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, UpdateRoleDto, AuthResponseDto, UserProfileResponseDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { User } from './decorators/user.decorator';
import type { UserProfile } from '../config/supabase.config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<AuthResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<AuthResponseDto> {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@User() user: UserProfile): Promise<UserProfileResponseDto> {
    return this.authService.getCurrentUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('users/:id/role')
  async updateUserRole(
    @Param('id') userId: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<UserProfileResponseDto> {
    return this.authService.updateUserRole(userId, updateRoleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUsers(): Promise<UserProfileResponseDto[]> {
    return this.authService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  async getUserById(@Param('id') userId: string): Promise<UserProfileResponseDto> {
    return this.authService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  async deleteUser(@Param('id') userId: string): Promise<{ message: string }> {
    await this.authService.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }

  @Public()
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Joy of Risk Auth API',
    };
  }
}