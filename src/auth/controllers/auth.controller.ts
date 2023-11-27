import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginDto } from '../dto/login.dto';
import { isPublic } from '../decorators/is-public.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @ApiCreatedResponse({ description: ' Login successful' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiOperation({
        description: 'Endpoint to login User and generate access token',
    })
    @ApiBody({
        type: LoginDto,
    })
    @isPublic()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@CurrentUser() user: UserEntity, @Body() loginDto: LoginDto) {
        return this.service.login(user);
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'User does not have authorization',
    })
    @ApiOkResponse({
        type: UserResponseDto,
    })
    @ApiOperation({
        description:
            'Endpoint to to return the Users profile with his information',
    })
    @UseGuards(JwtAuthGuard)
    @Get('user/profile')
    getProfile(@CurrentUser() user: UserEntity) {
        return user;
    }
}
