import { Router, Response, Request } from "express";
import { DataResponse } from "./data-response/data-response";
import { AuthService } from "../services/auth.service";
import { UserLoginDTO } from "../services/dtos/user-login.dto";
import { UserDTO } from "src/services/dtos/user.dto";
import { Body } from "tsoa";

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

      let isUsernameValid = true;
      let isPasswordValid = true;

      if (!isUsernameValid || !isPasswordValid) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid username or password";
      }

      if (isUsernameValid && isPasswordValid) {
        let result = await this.authService.login(userLoginDTO);
        dataResponse = result;
      }

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public register = async (req: Request, res: Response): Promise<UserDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      const newUser: UserDTO = req.body;

      let isUsernameValid = true;
      let isPasswordValid = true;

      if (isUsernameValid && isPasswordValid) {
        const result = await this.authService.register(newUser);
        dataResponse = result;
      }

      if (!isUsernameValid) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid username";
      }

      if (!isPasswordValid) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid password";
      }

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
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
