import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'user@email.com',
        description:
            'User email - *will be used to connect the user to the application through login*',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'senha@123',
        description:
            'User password - *will be used to authenticate the user who wants to log in*',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
