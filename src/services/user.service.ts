import { UserRepository } from "../repositories/user.repository";
export class UserService {
  constructor(private readonly userRepository = new UserRepository()) {}

  public getAllUser = async () => {
    const users = await this.userRepository.find();
    return users;
  };
}
