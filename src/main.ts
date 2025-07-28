import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { corsConfig } from './config/cors.config';
import { EnvService } from './infra/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  const logger = new Logger('Bootstrap');

  app.use(cookieParser());

  const appPrefix = envService.appPrefix();
  app.setGlobalPrefix(appPrefix);

  app.enableCors(corsConfig(envService));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  try {
    const port = envService.port();
    await app.listen(port);

    logger.log(`🚀 Server is running at port: ${port}`);
  } catch (error) {
    logger.error(`❌ Failed to start server: ${error}`, error);
    process.exit(1);
  }
}
void bootstrap();
