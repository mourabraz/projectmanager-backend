import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { NestFactory } from '@nestjs/core';
import { RedisIoAdapter } from './queue/redis-io-adapter';
import { AppModule } from './app.module';

import { AppConfigService } from './config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const appConfig: AppConfigService = app.get('AppConfigService');

  app.useWebSocketAdapter(new RedisIoAdapter(app));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 60, // limit each IP to 60 requests per windowMs --> 6/min
    }),
  );

  await app.listen(appConfig.port);
}
bootstrap();
