import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config/app.config';
import { Logger } from '@nestjs/common';
import { LOG_MESSAGES } from './common/utils/constants';
import { getCorsConfig } from './common/utils/cors-config';

async function bootstrap() {
  const logger = new Logger(AppModule.name);
  const app = await NestFactory.create(AppModule);

  app.enableCors(getCorsConfig());

  await app.listen(Number(appConfig.port));

  logger.log(LOG_MESSAGES.SERVER_RUNNING(appConfig.port));
}

bootstrap();
