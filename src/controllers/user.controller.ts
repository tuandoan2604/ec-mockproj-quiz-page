import { Router, Response, Request } from "express";
import { UserEntity } from "../entities/user";

export class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getAll = async (req: Request, res: Response) => {
    res.send("Get all user!");
  }

  public create = async (req: Request, res: Response) => {
    res.send("Create user");
  } 

  public update = async (req: Request, res: Response) => {
    res.send("Update user");
  } 

  public delete = async (req: Request, res: Response) => {
    res.send("Delete user");
  } 

  /**
   * Configure the routes of controller
   */
  public routes() {
    this.router.get("/", this.getAll);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
