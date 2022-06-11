import { UserRepository } from "../repositories/user.repository";
import { UserLoginDTO } from "./dtos/user-login.dto";
import { UserDTO } from "./dtos/user.dto";
import * as bcrypt from "bcrypt";
import { UserMapper } from "./mappers/user.mapper";
export class AuthService {
  constructor(private readonly userRepository = new UserRepository()) {}

  async login(userLogin: UserLoginDTO): Promise<any> {
    const username = userLogin.username;
    const password = userLogin.password;

    const userFind = await this.userRepository.findByUsername(username);
    const isCorrectPassword = userFind && await bcrypt.compare(password, userFind.password);
    if (!userFind || !isCorrectPassword) {
      return {
        statusCode: 400,
        message: "Invalid username or password",
        result: null,
      };
    }

    return {
      statusCode: 201,
      message: "Successfully logged",
      result: userFind,
    };
  }

  async register(newUser: UserDTO): Promise<any> {
    const userFind = await this.userRepository.findByUsername(newUser.username);

    if (userFind) {
      return {
        statusCode: 400,
        message: "Username is already in use",
        result: null,
      };
    }

    newUser.role = "ROLE_USER";
    newUser.password = await bcrypt.hash(newUser.password, 10);

    const userRegisted = await this.userRepository.save(
      UserMapper.fromDTOtoEntity(newUser)
    );

    return {
      statusCode: 201,
      message: "Successfully registered",
      result: userRegisted,
    };
  }
}
