import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { StatusEnum } from '../enum/status.enum';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { TaskResponseDto } from '../dto/task-reponse.dto';

@ApiBearerAuth()
@ApiTags('Tasks')
@Controller('task')
export class TaskController {
    constructor(private readonly service: TaskService) {}

    @ApiUnauthorizedResponse({
        description: 'User does not have authorization to access tasks',
    })
    @ApiOkResponse({
        type: [TaskResponseDto],
    })
    @ApiOperation({
        description: 'Endpoint to find all user tasks',
    })
    @Get()
    findAll(@CurrentUser() user: UserEntity) {
        return this.service.findAll(user.id);
    }

    @ApiCreatedResponse({
        type: TaskResponseDto,
    })
    @ApiBody({
        type: CreateTaskDto,
    })
    @ApiOperation({
        description: 'Endpoint to create user task',
    })
    @ApiUnauthorizedResponse({
        description: 'User does not have authorization to access tasks',
    })
    @Post()
    create(
        @Body() createTaskDto: CreateTaskDto,
        @CurrentUser() user: UserEntity,
    ) {
        return this.service.create(createTaskDto, user.id);
    }

    @ApiUnauthorizedResponse({
        description: 'User does not have authorization to access tasks',
    })
    @ApiOkResponse({
        type: [TaskResponseDto],
    })
    @ApiOperation({
        description: 'Endpoint to find tasks with the specified status',
    })
    @Get('/status')
    findByStatus(
        @Query('status') status: StatusEnum,
        @CurrentUser() user: UserEntity,
    ) {
        return this.service.findByStatus(status, user.id);
    }

    @ApiUnauthorizedResponse({
        description: 'User does not have authorization to access tasks',
    })
    @ApiOkResponse({
        type: TaskResponseDto,
    })
    @ApiOperation({
        description: 'Endpoint to find user task by id',
    })
    @Get(':id')
    findOne(@Param('id') id: number, @CurrentUser() user: UserEntity) {
        return this.service.findOne(id, user.id);
    }

    @ApiBody({
        type: UpdateTaskDto,
    })
    @ApiOperation({
        description: 'Endpoint to update task',
    })
    @ApiUnauthorizedResponse({
        description: 'User does not have authorization to access tasks',
    })
    @ApiOkResponse({
        type: TaskResponseDto,
    })
    @ApiNotFoundResponse({ description: 'Task not found' })
    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateTaskDto: UpdateTaskDto,
        @CurrentUser() user: UserEntity,
    ) {
        return this.service.update(id, updateTaskDto, user.id);
    }

    @ApiUnauthorizedResponse({
        description: 'User does not have authorization to access tasks',
    })
    @ApiOkResponse({
        description: 'Successfully deleted task',
    })
    @ApiOperation({
        description: 'Endpoint to delete user task by id',
    })
    @ApiNotFoundResponse({ description: 'Task not found' })
    @Delete(':id')
    deletebyId(@Param('id') id: number, @CurrentUser() user: UserEntity) {
        return this.service.remove(id, user.id);
    }
}
