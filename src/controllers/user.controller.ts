import { Router, Response, Request } from "express";
import { UserService } from "../services/user.service";
import { DataResponse } from "./data-response/data-response";
import { UserDTO } from "../services/dtos/user.dto";

export class UserController {
  public readonly router: Router;
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService(); // Create a new instance of UserController
    this.router = Router();
    this.routes();
  }

  public getAllUser = async (req: Request, res: Response) => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      let users = await this.userService.getAllUser();

      dataResponse.result = users;

      res.send(dataResponse).json();
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      res.send(dataResponse).json();
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

      res.send(dataResponse).json();
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      res.send(dataResponse).json();
    }
  };

  public create = async (req: Request, res: Response) => {
    let dataResponse = new DataResponse(null, 201, "Successfully created");
    try {
      const userDTO: UserDTO = req.body;
      const userCreated = await this.userService.create(userDTO);

      dataResponse.result = userCreated;

      res.send(dataResponse).json();
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      res.send(dataResponse).json();
    }
  };

  public update = async (req: Request, res: Response) => {
    let dataResponse = new DataResponse(null, 200, "Successfully updated");
    try {
      const userDTO: UserDTO = req.body;
      const userUpdated = await this.userService.update(userDTO);

      dataResponse.result = userUpdated;

      res.send(dataResponse).json();
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      res.send(dataResponse).json();
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

      res.send(dataResponse).json();
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      res.send(dataResponse).json();
    }
  };

  /**
   * Configure the routes of controller
   */
  public routes() {
    this.router.get("/", this.getAllUser);
    this.router.get("/:id", this.getUserById);
    this.router.post("/", this.create);
    this.router.put("/", this.update);
    this.router.delete("/:id", this.delete);
  }
}
