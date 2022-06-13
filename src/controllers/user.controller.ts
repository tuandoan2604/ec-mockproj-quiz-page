import { Router, Response, Request } from "express";
import { UserService } from "../services/user.service";
import { DataResponse } from "./data-response/data-response";
import { UserDTO } from "../services/dtos/user.dto";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";

@Route("user")
export class UserController {
  public readonly router: Router;
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService(); // Create a new instance of UserController
    this.router = Router();
    this.routes();
  }

  @Get("/")
  public getAllUser = async (
    req: Request,
    res: Response
  ): Promise<UserDTO[] | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      let users = await this.userService.getAllUser();

      dataResponse.result = users;

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response
  ): Promise<UserDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      const id = Number(req.params.id);
      const userFound = await this.userService.getUserById(id);
      if (userFound) {
        dataResponse.result = userFound;
      } else {
        dataResponse.statusCode = 404;
        dataResponse.message = "User not found";
      }

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public create = async (
    req: Request,
    res: Response
  ): Promise<UserDTO | any> => {
    let dataResponse = new DataResponse(null, 201, "Successfully created");
    try {
      const userDTO: UserDTO = req.body;

      let isUsernameValid = true;
      let isPasswordValid = true;

      if (!isUsernameValid) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid username";
      }

      if (!isPasswordValid) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid password";
      }

      if (isUsernameValid && isPasswordValid) {
        const userCreated = await this.userService.create(userDTO);
        if (userCreated === "Username is already in use") {
          dataResponse.statusCode = 400;
          dataResponse.message = "Username is already in use";
          return res.status(dataResponse.statusCode).send(dataResponse);
        } else {
          dataResponse = userCreated;
          return res.status(dataResponse.statusCode).send(dataResponse);
        }
      }
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public update = async (
    req: Request,
    res: Response
  ): Promise<UserDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully updated");
    try {
      const userDTO: UserDTO = req.body;
      const userUpdated = await this.userService.update(userDTO);

      dataResponse.result = userUpdated;

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public delete = async (
    req: Request,
    res: Response
  ): Promise<UserDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully deleted");
    try {
      const id = Number(req.params.id);
      const userToDelete = await this.userService.getUserById(id);
      if (userToDelete) {
        const userDeleted = await this.userService.delete(userToDelete);
        dataResponse.result = userDeleted;
      } else {
        dataResponse.statusCode = 404;
        dataResponse.message = "User not found";
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
    // this.router.get("/", [checkJwt, checkRole(["ROLE_ADMIN"])], this.getAllUser);
    // this.router.get("/:id", [checkJwt, checkRole(["ROLE_ADMIN"])], this.getUserById);
    // this.router.post("/", [checkJwt, checkRole(["ROLE_ADMIN"])], this.create);
    // this.router.put("/", [checkJwt, checkRole(["ROLE_ADMIN"])], this.update);
    // this.router.delete("/:id", [checkJwt, checkRole(["ROLE_ADMIN"])], this.delete);

    this.router.get("/get-all", this.getAllUser);
    this.router.get("/get-one/:id", this.getUserById);
    this.router.post("/create", this.create);
    this.router.put("/update", this.update);
    this.router.delete("/delete/:id", this.delete);
  }
}
