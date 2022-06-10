import express, { Request, Response } from "express";
import { UserController } from "./controllers/user.controller";
import { AppDataSource } from "./data-source";
import { createConnection } from "typeorm";

// const main = async () => {
//   try {
//     await AppDataSource.initialize()
//       .then(() => {
//         console.log("Connect to database successfully!");
//       })
//       .catch((error) => console.log(error));

//     app.listen(8080, () => {
//       console.log("Server is running on port 8080");
//     });
//   } catch (error) {
//     console.error(error);
//     throw new Error("Unable to connect to database");
//   }
// };

// main();

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
    this.app.use(express.json());
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
      });
    } catch (error) {
      console.error("An error occurred while starting the server: ", error);
    }
  }
}

const app = new App(); // Create server instance
app.start(); // Execute the server
