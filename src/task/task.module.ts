import { Logger, Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { TaskRepository } from './repositories/task.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [TaskController],
    providers: [TaskService, Logger, TaskRepository],
    exports: [TaskService],
})
export class TaskModule {}
