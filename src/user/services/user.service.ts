import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly repository: UserRepository,
        private readonly logger: Logger,
    ) {
        this.logger = new Logger(UsersService.name);
    }

    async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const user = {
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        };
        try {
            const userCreated = await this.repository.create(user);
            const response = {
                id: userCreated.id,
                username: userCreated.username,
                email: userCreated.email,
            };
            return response;
        } catch (error) {
            throw new ConflictException('Email entered is not valid');
        }
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return await this.repository.findByEmail(email);
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
        userId: number,
    ): Promise<UserResponseDto> {
        try {
            if (userId === id) {
                const result = await this.repository.update(id, updateUserDto);
                return {
                    id: result.id,
                    username: result.username,
                    email: result.email,
                };
            }
        } catch (error) {
            this.logger.error(`Could not update user with id ${id}`);
            throw new NotFoundException('User not found');
        }
    }

    async remove(id: number, userId: number): Promise<string> {
        try {
            if (userId === id) {
                await this.repository.delete(id);
                return `User id ${id} was successfully deleted`;
            }
        } catch (error) {
            this.logger.error(`Could not delete user with id ${id}`);
            throw new NotFoundException('User not found');
        }
    }
}
