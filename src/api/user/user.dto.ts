import { IsBoolean, IsEmail, IsNotEmpty, Length, Validate, IsOptional } from 'class-validator';
import { User } from '@biz/user/User';

export class RegisterUserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  // @IsNotEmpty()
  // salt: string;

  // @IsNotEmpty()
  // role: 'admin' | 'normal';
}

export class LoginDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
