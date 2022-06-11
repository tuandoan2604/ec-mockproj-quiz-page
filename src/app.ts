import express, { Request, Response } from "express";
import { UserController } from "./controllers/user.controller";
import { AppDataSource } from "./data-source";
import swaggerUi from "swagger-ui-express";
import * as swaggerDoccument from './swagger.json'

class App {
  private UserController: UserController;
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configuration();
    this.routes();
  }

  public configuration() {
    this.app.set("port", process.env.PORT || 8080);
    // this.app.use(express.json());
    this.app.use(
      "/swagger/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDoccument)
    );
  }

  public async routes() {
    await AppDataSource.initialize()
      .then(() => {
        console.log("Connect to database successfully!");
      })
      .catch((error) => console.log(error));

    this.UserController = new UserController();

    this.app.get("/", (req: Request, res: Response) => {
      res.send("My Quiz!");
    });

    this.app.use(`/api/user/`, this.UserController.router); // Configure the new routes of the controller post
  }

  /**
   * Used to start the server
   */
  public start() {
    try {
      this.app.listen(this.app.get("port"), () => {
        console.log(`Server is listening ${this.app.get("port")} port.`);
        console.log(`Swagger UI: /swagger/api-docs`);
      });
    } catch (error) {
      console.error("An error occurred while starting the server: ", error);
    }
  }
}

const app = new App(); // Create server instance
app.start(); // Execute the server
