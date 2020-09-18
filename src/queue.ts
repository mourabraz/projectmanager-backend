import { NestFactory } from '@nestjs/core';
import { QueueModule } from './queue/queue.module';
import { RedisIoAdapter } from './queue/redis-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(QueueModule);

  app.useWebSocketAdapter(new RedisIoAdapter(app));
  await app.init();
}

bootstrap();
