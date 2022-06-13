import { UserRepository } from "../repositories/user.repository";
import { UserLoginDTO } from "./dtos/user-login.dto";
import { UserDTO } from "./dtos/user.dto";
import * as bcrypt from "bcrypt";
import { UserMapper } from "./mappers/user.mapper";
import { Payload } from "../utils/security/payload.interface";
import jwt from "jsonwebtoken";
import { expiresIn_Token } from "../utils/config/const.config";
import { UserService } from "./user.service";

export class AuthService {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly userService = new UserService()
  ) {}

  async login(userLogin: UserLoginDTO): Promise<any> {
    try {
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

      const accessToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: expiresIn_Token,
      });

      return {
        statusCode: 200,
        message: "Successfully logged",
        accessToken: accessToken,
      };
    } catch (error) {
      return;
    }
  }

  async register(newUser: UserDTO): Promise<UserDTO | any> {
    try {
      const userRegisted: any = await this.userService.create(newUser);

      if (userRegisted === "Username is already in use") {
        return {
          statusCode: 400,
          message: "Username is already in use",
          result: null,
        };
      }

      return {
        statusCode: 201,
        message: "Successfully registered",
        result: userRegisted,
      };
    } catch (error) {
      return;
    }
  }
}
