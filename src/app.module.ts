import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './filter/exception.filter';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import { LoggerModule } from './logger/logger.module';
// import { UserHttpModule } from './users/user-http.module';
// import { AuthModule } from './auth/auth.module';
// import { ValidatorModule } from '@validators/validator.module';
// import { DatabaseModule } from './database/database.module';

import { ApiModule } from './api/api.module';
import { User } from './biz/user/User';
// import { BizModule } from './biz/biz.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB_NAME,
      // synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User],
      logging: true,
    }),
    LoggerModule,
    ApiModule,
    // ValidatorModule,
    // DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
