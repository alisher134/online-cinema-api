import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { corsConfig } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const appPrefix = configService.get<string>('APP_PREFIX', 'api/v1');
  app.setGlobalPrefix(appPrefix);

  app.enableCors(corsConfig(configService));

  try {
    const port = configService.get<number>('PORT', 8080);
    await app.listen(port);

    logger.log(`🚀 Server is running at port: ${port}`);
  } catch (error) {
    logger.error(`❌ Failed to start server: ${error}`, error);
    process.exit(1);
  }
}
void bootstrap();
