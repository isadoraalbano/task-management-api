import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description } from './swagger/description.swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appLogger = new Logger('tasks-management-app');
    const config = app.get(ConfigService);

    const configDocument = new DocumentBuilder()
        .setTitle('Task Management API')
        .setDescription(description)
        .setBasePath('api/docs')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, configDocument);
    SwaggerModule.setup('api/docs', app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
    const port = config.get<number>('application.port') || 3000;
    await app.listen(port).then(() => {
        appLogger.log(`Http server listening at port: ${port}`);
    });
}
bootstrap();
