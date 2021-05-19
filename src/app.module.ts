import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from './config/app/config.module';
import { AppConfigService } from './config/app/config.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { StepsModule } from './steps/steps.module';
import { FiilesModule } from './fiiles/fiiles.module';
import { UsersProjectsModule } from './users-projects/users-projects.module';
import { InvitationsModule } from './invitations/invitations.module';
import { MysqlConfigModule } from './config/database/mysql/config.module';
import { MysqlConfigService } from './config/database/mysql/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule, AppConfigModule],
      useFactory: async (
        configPostgresService: MysqlConfigService,
        configAppService: AppConfigService,
      ) =>
        configPostgresService[
          configAppService.env === 'development'
            ? 'typeOrmConfigDevelopment'
            : 'typeOrmConfig'
        ],
      inject: [MysqlConfigService, AppConfigService],
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    StepsModule,
    FiilesModule,
    UsersProjectsModule,
    InvitationsModule,
  ],
})
export class AppModule {
  // onModuleInit() {
  //   console.log('AppModule ', process.env.NODE_ENV);
  // }
}
