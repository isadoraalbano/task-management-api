import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from '../entities/task.entitty';
import { TaskRepository } from '../repositories/task.repository';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
        private readonly repository: TaskRepository,
        private readonly logger: Logger,
    ) {
        this.logger = new Logger(TaskService.name);
    }
    async create(
        createTaskDto: CreateTaskDto,
        userId: number,
    ): Promise<TaskEntity> {
        createTaskDto.finishIn = new Date(createTaskDto.finishIn).toISOString();
        try {
            return this.repository.create(createTaskDto, userId);
        } catch (error) {
            throw new BadRequestException('Could not create user task');
        }
    }

    async findOne(id: number, userId: number): Promise<TaskEntity> {
        const task = await this.repository.findById(userId, id);
        if (!task) {
            this.logger.error(`Task with id ${id} not found`);
            throw new NotFoundException('Task not found');
        }

        return task;
    }

    async findAll(userId: number): Promise<TaskEntity[]> {
        return await this.repository.findAll(userId);
    }

    async findByStatus(status: string, userId: number): Promise<TaskEntity[]> {
        return await this.repository.findByStatus(userId, status);
    }

    async update(
        id: number,
        updateTaskDto: UpdateTaskDto,
        userId: number,
    ): Promise<void> {
        try {
            await this.repository.update(userId, id, updateTaskDto);
        } catch (error) {
            this.logger.error(`Could not update task with id ${id}`);
            throw new NotFoundException('Task not found');
        }
    }

    async remove(id: number, userId: number): Promise<string> {
        try {
            await this.repository.delete(userId, id);
            return `Task id ${id} was successfully deleted`;
        } catch (error) {
            this.logger.error(`Could not delete task with id ${id}`);
            throw new NotFoundException('Task not found');
        }
    }
}
