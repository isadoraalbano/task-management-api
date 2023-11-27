import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'user@email.com',
        description:
            'User email - *will be used to connect the user to the application through login*',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'nickname',
        description:
            'Username or nickname - *will be used to refer to the logged in user*',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        example: 'senha@123',
        description:
            'User password - *will be used to authenticate the user who wants to log in*',
    })
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @IsNotEmpty()
    password: string;
}
