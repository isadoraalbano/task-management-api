import { IsString, IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../enum/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({
        example: 'Title Task 1',
        description: 'Task title',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'Description task 1',
        description: 'Task description',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: 'pending',
        description:
            'Task status | options: [concluded, pending, in_progress ]',
    })
    @IsString()
    @IsNotEmpty()
    status: StatusEnum;

    @ApiProperty({
        example: '2023-10-05',
        description: 'Estimated task completion date, format: yyyy-MM-dd',
    })
    @IsNotEmpty()
    finishIn: string;
}
