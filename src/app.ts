import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import swaggerUi from "swagger-ui-express";
import * as swaggerDoccument from "./swagger.json";
import bodyParser from "body-parser";

// Import Controller
import { AuthController } from "./controllers/auth.controller";
import { UserController } from "./controllers/user.controller";
import { QuizController } from "./controllers/quiz.controller";
import { QuestionController } from "./controllers/question.controller";
import { AnswerController } from "./controllers/answer.controller";
import { ToDoQuizController } from "./controllers/to-do-quiz/to-do-quiz.controller";


class App {
  private AuthController: AuthController;
  private UserController: UserController;
  private QuizController: QuizController;
  private QuestionController: QuestionController;
  private AnswerController: AnswerController;
  private ToDoQuizController: ToDoQuizController;
  
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

    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
    this.app.use(bodyParser.json());
  }

  public async routes() {
    await AppDataSource.initialize()
      .then(() => {
        console.log("Connect to database successfully!");
      })
      .catch((error) => console.log(error));

    this.app.get("/", (req: Request, res: Response) => {
      res.send("My Quiz!");
    });

    this.AuthController = new AuthController();
    this.UserController = new UserController();
    this.QuizController = new QuizController();
    this.QuestionController = new QuestionController();
    this.AnswerController = new AnswerController();
    this.ToDoQuizController = new ToDoQuizController();
    
    // Configure the new routes of the controller
    this.app.use(`/api/auth/`, this.AuthController.router);
    this.app.use(`/api/user/`, this.UserController.router);
    this.app.use(`/api/quiz/`, this.QuizController.router);
    this.app.use(`/api/question/`, this.QuestionController.router);
    this.app.use(`/api/answer/`, this.AnswerController.router);
    this.app.use(`/api/to-do-quiz/`, this.ToDoQuizController.router);
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
