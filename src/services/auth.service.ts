import { UserRepository } from "../repositories/user.repository";
import { UserLoginDTO } from "./dtos/user-login.dto";
import { UserDTO } from "./dtos/user.dto";
import * as bcrypt from "bcrypt";
import { UserMapper } from "./mappers/user.mapper";
import { Payload } from "../utils/security/payload.interface";
import jwt from 'jsonwebtoken';
import { expiresIn_Token } from "../utils/config/const.config";

export class AuthService {
  constructor(private readonly userRepository = new UserRepository()) {}

  async login(userLogin: UserLoginDTO): Promise<any> {
    const username = userLogin.username;
    const password = userLogin.password;

    const userFind = await this.userRepository.findByUsername(username);
    const isCorrectPassword =
      userFind && (await bcrypt.compare(password, userFind.password));
    if (!userFind || !isCorrectPassword) {
      return {
        statusCode: 400,
        message: "Invalid username or password",
        result: null,
      };
    }

    const payload: Payload = {
      id: userFind.id,
      username: userFind.username,
      role: userFind.role,
    };

    const JWT_SECRET: any = process.env.ACCESS_TOKEN_SECRET;

    const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: expiresIn_Token })

    return {
      statusCode: 201,
      message: "Successfully logged",
      accessToken: accessToken,
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
