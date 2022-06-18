import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BizModule } from '../biz/biz.module';
import { UserController } from './user/user.controller';
import { LoggerMiddleware } from './middleware/auth.middleware';

@Module({
  // imports: [BizModule],
  controllers: [UserController],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user/me');
  }
}
