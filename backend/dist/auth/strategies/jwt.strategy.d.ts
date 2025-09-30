import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { SupabaseService } from '../supabase.service';
import { UserProfile } from '../../config/supabase.config';
export interface JwtPayload {
    sub: string;
    email: string;
    iat?: number;
    exp?: number;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private supabaseService;
    constructor(configService: ConfigService, supabaseService: SupabaseService);
    validate(payload: JwtPayload): Promise<UserProfile>;
}
export {};
