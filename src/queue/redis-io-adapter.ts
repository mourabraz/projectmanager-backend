import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  private redisAdapter;

  constructor(args: any) {
    super(args);

    this.redisAdapter = redisIoAdapter({
      host: String(process.env.REDIS_HOST),
      port: Number(process.env.REDIS_PORT),
    });
  }
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.redisAdapter);

    return server;
  }
}
