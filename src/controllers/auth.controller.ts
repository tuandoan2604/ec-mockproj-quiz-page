import { Router, Response, Request } from "express";
import { DataResponse } from "./data-response/data-response";
import { AuthService } from "../services/auth.service";
import { UserLoginDTO } from "../services/dtos/user-login.dto";
import { UserDTO } from "src/services/dtos/user.dto";
import { isUsernameValid } from "../utils/validation/is-username-val.util";
import { isPasswordValid } from "../utils/validation/is-password-val.util";

export class AuthController {
  public readonly router: Router;
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService(); // Create a new instance of AuthController
    this.router = Router();
    this.routes();
  }

  public login = async (req: Request, res: Response): Promise<any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully logged");
    try {
      const userLoginDTO: UserLoginDTO = req.body;

      if (
        !isUsernameValid(userLoginDTO.username) ||
        !isPasswordValid(userLoginDTO.password)
      ) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid username or password";
      }

      if (
        isUsernameValid(userLoginDTO.username) &&
        isPasswordValid(userLoginDTO.password)
      ) {
        let result = await this.authService.login(userLoginDTO);
        dataResponse = result;
      }

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error)
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public register = async (
    req: Request,
    res: Response
  ): Promise<UserDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      const newUser: UserDTO = req.body;

      if (
        isUsernameValid(newUser.username) &&
        isPasswordValid(newUser.password)
      ) {
        const result = await this.authService.register(newUser);
        dataResponse = result;
      } else {
        if (!isPasswordValid(newUser.password)) {
          dataResponse.statusCode = 400;
          dataResponse.message =
            "Invalid password! Password must contain between 5-20 characters and no spaces.";
        }

        if (!isUsernameValid(newUser.username)) {
          dataResponse.statusCode = 400;
          dataResponse.message =
            "Invalid username! Accepts 4 to 15 characters with any lower case character, digit or special symbol “_-” only.";
        }
      }
      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error)
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  /**
   * Configure the routes of controller
   */
  public routes() {
    this.router.post("/login", this.login);
    this.router.post("/register", this.register);
  }
}
