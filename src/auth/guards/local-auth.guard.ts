import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    handleRequest(error, user) {
        if (error || !user) {
            throw new UnauthorizedException(error?.message);
        }
        return user;
    }
}
