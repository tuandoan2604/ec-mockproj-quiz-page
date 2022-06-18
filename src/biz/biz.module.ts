import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';

const listProviders = [UserService, AuthService];
@Module({
  providers: listProviders,
  exports: listProviders,
})
export class BizModule {}
