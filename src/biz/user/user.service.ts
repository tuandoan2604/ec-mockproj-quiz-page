import { Injectable } from '@nestjs/common';
import { User } from './User';
@Injectable()
export class UserService {
  public static async findByUsername(username: string): Promise<User> {
    return User.findOne({
      where: { username: username },
      select: ['id', 'username', 'password', 'salt', 'role'],
    });
  }
  public static async createUser(user: User): Promise<User> {
    return user.save();
  }
}
