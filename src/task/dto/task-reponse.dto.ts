import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { StatusEnum } from '../enum/status.enum';

export class TaskResponseDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    status: StatusEnum;

    @ApiProperty()
    @IsDateString()
    createdAt: Date;

    @ApiProperty()
    @IsDateString()
    updatedAt: Date;

    @ApiProperty()
    @IsDateString()
    finishIn: Date;
}
