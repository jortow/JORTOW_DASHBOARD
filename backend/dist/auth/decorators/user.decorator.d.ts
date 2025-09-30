import { UserProfile } from '../../config/supabase.config';
export declare const User: (...dataOrPipes: (keyof UserProfile | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
