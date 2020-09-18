import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConfigModule } from '../config/database/postgres/config.module';
import { PostgresConfigService } from '../config/database/postgres/config.service';
import { SeedsService } from './seed.service';

import { UserRepository } from '../users/user.repository';
import { ProjectRepository } from '../projects/project.repository';
import { UserProjectRepository } from '../users-projects/user-project.repository';
import { TaskRepository } from '../tasks/task.repository';
import { PhotoRepository } from '../users/photo.repository';
import { InvitationRepository } from '../invitations/invitation.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      useFactory: async (configService: PostgresConfigService) =>
        configService.typeOrmConfigDevelopment,
      inject: [PostgresConfigService],
    }),
    TypeOrmModule.forFeature([
      UserRepository,
      PhotoRepository,
      ProjectRepository,
      UserProjectRepository,
      InvitationRepository,
      TaskRepository,
    ]),
  ],
  providers: [SeedsService],
})
export class SeedModule {}

async function bootstrap() {
  const app = await NestFactory.create(SeedModule);

  await app.init();

  const seedsService = app.get(SeedsService);

  await seedsService.init();

  app.close();
}

bootstrap();
