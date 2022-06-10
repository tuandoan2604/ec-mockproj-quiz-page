import { Router, Response, Request } from "express";
import { UserService } from "../services/user.service";


export class UserController {
  public readonly router: Router;
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService(); // Create a new instance of UserController
    this.router = Router();
    this.routes();
  }

  public getAllUser = async (req: Request, res: Response) => {
    const posts = await this.userService.getAllUser();
    res.send(posts).json();
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
    this.router.get("/", this.getAllUser);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
