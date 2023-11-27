import { Logger, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UsersService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UsersService, Logger, UserRepository],
    exports: [UsersService, UserRepository],
})
export class UserModule {}
