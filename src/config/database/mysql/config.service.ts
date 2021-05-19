import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class MysqlConfigService {
  constructor(private configService: ConfigService) {}

  get type(): any {
    return this.configService.get<string>('mysql.type');
  }
  get host(): string {
    return this.configService.get<string>('mysql.host');
  }
  get port(): number {
    return Number(this.configService.get<number>('mysql.port'));
  }
  get username(): string {
    return this.configService.get<string>('mysql.username');
  }
  get password(): string {
    return this.configService.get<string>('mysql.password');
  }
  get name(): string {
    return this.configService.get<string>('mysql.name');
  }
  get typeSync(): boolean {
    return Boolean(this.configService.get<boolean>('mysql.typeormSync'));
  }

  get typeTest(): any {
    return this.configService.get<string>('mysql.typeTest');
  }
  get hostTest(): string {
    return this.configService.get<string>('mysql.hostTest');
  }
  get portTest(): number {
    return Number(this.configService.get<number>('mysql.portTest'));
  }
  get usernameTest(): string {
    return this.configService.get<string>('mysql.usernameTest');
  }
  get passwordTest(): string {
    return this.configService.get<string>('mysql.passwordTest');
  }
  get nameTest(): string {
    return this.configService.get<string>('mysql.nameTest');
  }
  get typeSyncTest(): boolean {
    return Boolean(this.configService.get<boolean>('mysql.typeormSyncTest'));
  }

  get hostDevelopment(): string {
    return this.configService.get<string>('mysql.hostDevelopment');
  }
  get portDevelopment(): number {
    return Number(this.configService.get<number>('mysql.portDevelopment'));
  }
  get usernameDevelopment(): string {
    return this.configService.get<string>('mysql.usernameDevelopment');
  }
  get passwordDevelopment(): string {
    return this.configService.get<string>('mysql.passwordDevelopment');
  }
  get nameDevelopment(): string {
    return this.configService.get<string>('mysql.nameDevelopment');
  }
  get typeSyncDevelopment(): boolean {
    return Boolean(
      this.configService.get<boolean>('mysql.typeormSyncDevelopment'),
    );
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.type,
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.name,
      entities: [join(__dirname, '..', '..', '..', './**/*.entity{.ts,.js}')],
      synchronize: this.typeSync,
    };
  }

  get typeOrmConfigTest(): TypeOrmModuleOptions {
    return {
      type: this.typeTest,
      host: this.hostTest,
      port: this.portTest,
      username: this.usernameTest,
      password: this.passwordTest,
      database: this.nameTest,
      entities: [join(__dirname, '..', '..', '..', './**/*.entity{.ts,.js}')],
      synchronize: this.typeSyncTest,
    };
  }

  get typeOrmConfigDevelopment(): TypeOrmModuleOptions {
    return {
      type: this.type,
      host: this.hostDevelopment,
      port: this.portDevelopment,
      username: this.usernameDevelopment,
      password: this.passwordDevelopment,
      database: this.nameDevelopment,
      entities: [join(__dirname, '..', '..', '..', './**/*.entity{.ts,.js}')],
      synchronize: this.typeSyncDevelopment,
      // migrationsRun: false,
      // logging: true,
      // logger: 'file',

      // // Allow both start:prod and start:dev to use migrations
      // // __dirname is either dist or src folder, meaning either
      // // the compiled js in prod or the ts in dev.
      // migrations: [
      //   join(__dirname, '..', '..', '..', './migrations/**/*{.ts,.js}'),
      // ],
      // cli: {
      //   // Location of migration should be inside src folder
      //   // to be compiled into dist/ folder.
      //   migrationsDir: 'src/migrations',
      // },
    };
  }
}
