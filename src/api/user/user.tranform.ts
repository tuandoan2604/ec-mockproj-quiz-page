import { User } from '@biz/user/User';
import { RegisterUserDTO } from './user.dto';

export class UserTranform {
  public static toUserEntity(registerUserDTO: RegisterUserDTO, salt: string, role: string) {
    const user = new User();
    user.username = registerUserDTO.username;
    user.password = registerUserDTO.password;
    user.salt = salt;
    user.role = role;
    return user;
  }
}
