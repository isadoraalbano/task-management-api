import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { isPublic } from './auth/decorators/is-public.decorator';
import {
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Home')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    @ApiOperation({
        description: 'Homepage',
    })
    @ApiOkResponse({
        description: 'tasks-management-app initialized successfully',
    })
    @ApiInternalServerErrorResponse({
        description: 'tasks-management-app service failed',
    })
    @isPublic()
    @Get()
    get(): string {
        return this.appService.get();
    }
}
