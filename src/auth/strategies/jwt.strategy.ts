import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../models/user-payload';
import { UserJwtPayload } from '../models/user-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('auth.secret'),
        });
    }

    async validate(payload: UserPayload): Promise<UserJwtPayload> {
        return {
            id: payload.sub,
            username: payload.username,
            email: payload.email,
        };
    }
}
