import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserProfile } from '../../config/supabase.config'

export const User = createParamDecorator(
  (data: keyof UserProfile | undefined, ctx: ExecutionContext): UserProfile | any => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    return data ? user?.[data] : user
  },
)