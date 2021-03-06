import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';

import { RedisReusableConnection } from './redis-reusable-connection';
//import { EventGateway } from './event.gateway';

@Injectable()
export class EmailConsumer implements OnModuleInit {
  public static readonly channelName = 'email';
  private logger = new Logger(EmailConsumer.name);

  constructor(
    private queueMaker: RedisReusableConnection,
    //private ws: EventGateway,
    private readonly mailerService: MailerService,
  ) {}

  public async onModuleInit() {
    const consumer = this.queueMaker.queue(EmailConsumer.channelName);

    consumer.process(async (job: Job<{ payload: {} }>) => {
      //this.ws.server.emit('send-email', job.data);
      try {
        await this.mailerService.sendMail(job.data.payload);
      } catch (error) {
        console.log(error);
        this.logger.error(
          `Error on mailService with '${JSON.stringify(job.data.payload)}'`,
          error.stack,
        );
      }

      this.logger.verbose(
        `Consumer for MailerService.sendMail '${JSON.stringify(
          job.data.payload,
        )}'`,
      );
    });
  }
}
