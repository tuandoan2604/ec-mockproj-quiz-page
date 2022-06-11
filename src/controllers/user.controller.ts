import { Router, Response, Request, response } from "express";
import { UserService } from "../services/user.service";
import { BAD_REQUEST } from "http-status-codes";
import { DataResponse } from "./data-response/data-response";

export class UserController {
  public readonly router: Router;
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService(); // Create a new instance of UserController
    this.router = Router();
    this.routes();
  }

  public getAllUser = async (req: Request, res: Response) => {
    let dataResponse = new DataResponse();
    try {
      let users = await this.userService.getAllUser();

      dataResponse.result = users;
      dataResponse.statusCode = 200;
      dataResponse.message = "OK";

      res.send(dataResponse).json();
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal Server Error";

      res.send(dataResponse).json();
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    let dataResponse = new DataResponse();
    try {
      const id = Number(req.query.id);
      const userFound = await this.userService.getUserById(id);

      dataResponse.result = userFound;
      dataResponse.statusCode = 200;
      dataResponse.message = 'OK';

      res.send(dataResponse).json();
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal Server Error";

      res.send(dataResponse).json();
    }
  };

  public create = async (req: Request, res: Response) => {
    res.send("Create user");
  };

  public update = async (req: Request, res: Response) => {
    res.send("Update user");
  };

  public delete = async (req: Request, res: Response) => {
    res.send("Delete user");
  };

  /**
   * Configure the routes of controller
   */
  public routes() {
    this.router.get("/get-all", this.getAllUser);
    this.router.get("/get-by-id", this.getUserById);
    this.router.post("/create", this.create);
    this.router.put("/update/:id", this.update);
    this.router.delete("/delete/:id", this.delete);
  }
}
