import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './filter/exception.filter';

import appConfig from './config/app.config';
// import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';

import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig],
    }),
    LoggerModule,
    ApiModule,
    // ValidatorModule,
    DatabaseModule,
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
