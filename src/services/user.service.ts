import { UserRepository } from "../repositories/user.repository";
import { UserDTO } from "./dtos/user.dto";
import { UserMapper } from "./mappers/user.mapper";
export class UserService {
  constructor(private readonly userRepository = new UserRepository()) {}

  public getAllUser = async ():Promise<UserDTO[] | any> => {
    const users = await this.userRepository.find();
    if (!users) {
      return [];
    }
    return users;
  };

  public getUserById = async (id: number): Promise<UserDTO | any> => {
    const userFound = await this.userRepository.findOne(id);
    if (!userFound) {
      return {}
    }
    return UserMapper.fromEntityToDTO(userFound);
  };
}
