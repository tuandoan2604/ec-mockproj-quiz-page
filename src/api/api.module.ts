import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { QuizController } from './quiz/quiz.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { BizModule } from '@biz/biz.module';

@Module({
  imports: [BizModule],
  controllers: [UserController, QuizController],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user/me');
    consumer.apply(AuthMiddleware).forRoutes('quiz/');
  }
}
