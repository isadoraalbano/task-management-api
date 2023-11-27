import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthRequest } from '../models/auth-request';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): UserEntity => {
        const request = context.switchToHttp().getRequest<AuthRequest>();

        return request.user;
    },
);
