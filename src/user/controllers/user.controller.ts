import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { isPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from '../entities/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @ApiConflictResponse({ description: 'Email conflict' })
    @ApiCreatedResponse({ description: ' User created successfully' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @Post()
    @ApiBody({
        type: CreateUserDto,
    })
    @ApiOperation({
        description: 'Endpoint to create User',
    })
    @isPublic()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiBody({
        type: UpdateUserDto,
    })
    @ApiOperation({
        description:
            'Endpoint to update User  |  **OBS**: the user can only perform this action with their own id reference',
    })
    @ApiOkResponse({
        type: UserResponseDto,
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'User does not have authorization',
    })
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
        @CurrentUser() user: UserEntity,
    ): Promise<UserResponseDto> {
        return await this.userService.update(id, updateUserDto, user.id);
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'User does not have authorization',
    })
    @ApiOperation({
        description:
            'Endpoint to delete User  |  **OBS**: the user can only perform this action with their own id reference',
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    @Delete(':id')
    remove(@Param('id') id: number, @CurrentUser() user: UserEntity) {
        return this.userService.remove(id, user.id);
    }
}
