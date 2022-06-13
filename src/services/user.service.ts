import { UserRepository } from "../repositories/user.repository";
import { UserDTO } from "./dtos/user.dto";
import { UserMapper } from "./mappers/user.mapper";
import { transformPassword } from '../utils/security/password.util';

export class UserService {
  constructor(private readonly userRepository = new UserRepository()) {}

  public getAllUser = async (): Promise<UserDTO[] | any> => {
    try {
      const users = await this.userRepository.find();
      if (!users) {
        return [];
      }
      return users;
    } catch (error) {
      return;
    }
  };

  public getUserById = async (id: number): Promise<UserDTO | any> => {
    try {
      const userFound = await this.userRepository.findOne(id);

      return UserMapper.fromEntityToDTO(userFound);
    } catch (error) {
      return;
    }
  };

  public create = async (userDTO: UserDTO): Promise<UserDTO | any> => {
    try {
      const userFind = await this.userRepository.findByUsername(
        userDTO.username
      );

      if (userFind) {
        return "Username is already in use";
      }

      userDTO.role = "ROLE_USER";
      userDTO.password = await transformPassword(userDTO.password);

      const userCreated = await this.userRepository.save(
        UserMapper.fromDTOtoEntity(userDTO)
      );

      delete userCreated.password;

      return userCreated;
    } catch (error) {
      return;
    }
  };

  public update = async (userDTO: UserDTO): Promise<UserDTO | any> => {
    try {
      const userToUpdate = UserMapper.fromDTOtoEntity(userDTO);
      const userUpdated = await this.userRepository.save(userToUpdate);

      return UserMapper.fromEntityToDTO(userUpdated);
    } catch (error) {
      return;
    }
  };

  public delete = async (userDTO: UserDTO): Promise<UserDTO | any> => {
    try {
      const userToDelete = UserMapper.fromDTOtoEntity(userDTO);
      const userDeleted = await this.userRepository.delete(userToDelete);

      return UserMapper.fromEntityToDTO(userDeleted);
    } catch (error) {
      return;
    }
  };
}
