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
  public getAllUser = async (req: Request, res: Response) => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      let users = await this.userService.getAllUser();

      dataResponse.result = users;

      res.status(dataResponse.statusCode).send(dataResponse).json();
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      res.status(dataResponse.statusCode).send(dataResponse).json();
    }
  };

  public getUserById = async (req: Request, res: Response) => {
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

      res.status(dataResponse.statusCode).send(dataResponse).json();
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      res.status(dataResponse.statusCode).send(dataResponse).json();
    }
  };

  public create = async (req: Request, res: Response) => {
    let dataResponse = new DataResponse(null, 201, "Successfully created");
    try {
      const userDTO: UserDTO = req.body;
      const userCreated = await this.userService.create(userDTO);

      dataResponse.result = userCreated;

      res.status(dataResponse.statusCode).send(dataResponse).json();
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      res.status(dataResponse.statusCode).send(dataResponse).json();
    }
  };

  public update = async (req: Request, res: Response) => {
    let dataResponse = new DataResponse(null, 200, "Successfully updated");
    try {
      const userDTO: UserDTO = req.body;
      const userUpdated = await this.userService.update(userDTO);

      dataResponse.result = userUpdated;

      res.status(dataResponse.statusCode).send(dataResponse).json();
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      res.status(dataResponse.statusCode).send(dataResponse).json();
    }
  };

  public delete = async (req: Request, res: Response) => {
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

      res.status(dataResponse.statusCode).send(dataResponse).json();
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      res.status(dataResponse.statusCode).send(dataResponse).json();
    }
  };

  /**
   * Configure the routes of controller
   */
  public routes() {
    this.router.get("/", [checkJwt, checkRole(["ROLE_ADMIN"])], this.getAllUser);
    this.router.get("/:id", [checkJwt, checkRole(["ROLE_ADMIN"])], this.getUserById);
    this.router.post("/", [checkJwt, checkRole(["ROLE_ADMIN"])], this.create);
    this.router.put("/", [checkJwt, checkRole(["ROLE_ADMIN"])], this.update);
    this.router.delete("/:id", [checkJwt, checkRole(["ROLE_ADMIN"])], this.delete);
  }
}
