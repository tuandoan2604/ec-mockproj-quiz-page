import { Injectable } from '@nestjs/common';
import { User } from './User';
import { UserDTO } from './user.dto';
@Injectable()
export class UserService {
  public static async findByUsername(username: string): Promise<User> {
    return User.findOne({
      where: { username: username },
      select: ['id', 'username', 'password', 'salt', 'role'],
    });
  }
  public static async createUser(user: UserDTO): Promise<User> {
    return User.save(user);
  }
}
