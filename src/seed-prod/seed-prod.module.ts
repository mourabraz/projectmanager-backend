import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConfigModule } from '../config/database/postgres/config.module';
import { PostgresConfigService } from '../config/database/postgres/config.service';
import { SeedsProdService } from './seed-prod.service';

import { UserRepository } from '../users/user.repository';
import { ProjectRepository } from '../projects/project.repository';
import { UserProjectRepository } from '../users-projects/user-project.repository';
import { TaskRepository } from '../tasks/task.repository';
import { PhotoRepository } from '../users/photo.repository';
import { InvitationRepository } from '../invitations/invitation.repository';
import { StepRepository } from '../steps/step.repository';
import { FiileRepository } from '../fiiles/fiile.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      useFactory: async (configService: PostgresConfigService) =>
        configService.typeOrmConfig,
      inject: [PostgresConfigService],
    }),
    TypeOrmModule.forFeature([
      UserRepository,
      PhotoRepository,
      ProjectRepository,
      UserProjectRepository,
      InvitationRepository,
      TaskRepository,
      StepRepository,
      FiileRepository,
    ]),
  ],
  providers: [SeedsProdService],
})
export class SeedProdModule {}

async function bootstrap() {
  const app = await NestFactory.create(SeedProdModule);

  await app.init();

  const seedsService = app.get(SeedsProdService);

  await seedsService.init();

  app.close();
}

bootstrap();
