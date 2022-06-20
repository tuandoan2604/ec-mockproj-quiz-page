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

  public toUserEntity(salt, role) {
    const user = new User();
    user.username = this.username;
    user.password = this.password;
    user.salt = salt;
    user.role = role;
    return user;
  }
}

export class LoginDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
