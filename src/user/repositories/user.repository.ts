import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.prisma.user.create({ data: createUserDto });
    }

    async findById(id: number): Promise<UserEntity> {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return this.prisma.user.update({
            where: {
                id,
            },
            data: updateUserDto,
        });
    }

    async delete(id: number): Promise<UserEntity> {
        return this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
}
