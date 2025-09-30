import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';
import { UserRole } from '../../config/supabase.config';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn(['basic', 'pro', 'exclusive'])
  role?: string;
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateRoleDto {
  @IsIn(['basic', 'pro', 'exclusive'])
  role: string;
}

export class UserProfileResponseDto {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export class AuthResponseDto {
  user: UserProfileResponseDto;
  token: string;
}