import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { TaskEntity } from '../entities/task.entitty';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Prisma } from '@prisma/client';
import { UpdateTaskDto } from '../dto/update-task.dto';

export type CreateTaskInput = Prisma.TaskCreateArgs['data'];

@Injectable()
export class TaskRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(
        createTaskdto: CreateTaskDto,
        id: number,
    ): Promise<TaskEntity> {
        const data = createTaskdto as CreateTaskInput;
        data.userId = id;
        return this.prisma.task.create({
            data,
        });
    }

    async update(
        userId: number,
        id: number,
        updateTaskDto: UpdateTaskDto,
    ): Promise<TaskEntity> {
        return this.prisma.task.update({
            where: {
                id,
                userId,
            },
            data: updateTaskDto,
        });
    }

    async findAll(userId: number): Promise<TaskEntity[]> {
        return this.prisma.task.findMany({
            where: {
                userId,
            },
        });
    }

    async findById(userId: number, id: number): Promise<TaskEntity> {
        return this.prisma.task.findUnique({
            where: {
                id,
                userId,
            },
        });
    }
    async findByStatus(userId: number, status: string): Promise<TaskEntity[]> {
        return this.prisma.task.findMany({
            where: {
                userId,
                status,
            },
        });
    }

    async delete(userId: number, id: number): Promise<TaskEntity> {
        return this.prisma.task.delete({
            where: {
                id,
                userId,
            },
        });
    }
}
