import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserPayload } from '../models/user-payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '../models/user-token';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(user: UserEntity): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            username: user.username,
        };

        const accessToken = this.jwtService.sign(payload);
        return {
            access_token: accessToken,
        };
    }

    async validateUser(
        email: string,
        password: string,
    ): Promise<UserResponseDto> {
        const user = await this.userService.findByEmail(email);
        if (user) {
            const isValidPassword = await bcrypt.compare(
                password,
                user.password,
            );
            if (isValidPassword) {
                const result = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                };
                return result;
            }
        }
        throw new Error('Email adress or password provided is incorrect');
    }
}
