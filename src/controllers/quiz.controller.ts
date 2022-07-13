import { Router, Response, Request } from "express";
import { QuizService } from "../services/quiz.service";
import { DataResponse } from "./data-response/data-response";
import { QuizDTO } from "../services/dtos/quiz.dto";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { isNumber } from "../utils/validation/is-number.util";
import { UserDTO } from "../services/dtos/user.dto";

export class QuizController {
  public readonly router: Router;
  private readonly quizService: QuizService;

  constructor() {
    this.quizService = new QuizService(); // Create a new instance of QuizController
    this.router = Router();
    this.routes();
  }

  public getAllQuiz = async (
    req: Request,
    res: Response
  ): Promise<QuizDTO[] | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      let quizs = await this.quizService.getAllQuiz();

      dataResponse.result = quizs;

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error)
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public getQuizById = async (
    req: Request,
    res: Response
  ): Promise<QuizDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      if (!isNumber(req.params.id)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid ID! ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const id = Number(req.params.id);
      const quizFound = await this.quizService.getQuizById(id);

      if (quizFound) {
        dataResponse.result = quizFound;
      } else {
        dataResponse.statusCode = 404;
        dataResponse.message = "Quiz not found";
      }

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error)
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public create = async (
    req: Request,
    res: Response
  ): Promise<QuizDTO | any> => {
    let dataResponse = new DataResponse(null, 201, "Successfully created");
    try {
      const userDTO: UserDTO = res?.locals?.userReq;
      const quizDTO: QuizDTO = req.body;
      quizDTO.creator = userDTO;
      quizDTO.createdBy = userDTO.username;
      
      const quizCreated = await this.quizService.create(quizDTO);

      if (!quizCreated) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Bad request";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      if (quizCreated === "Quiz code already exists") {
        dataResponse.statusCode = 400;
        dataResponse.message = "Quiz code already exists";
        return res.status(dataResponse.statusCode).send(dataResponse);
      } else {
        dataResponse.statusCode = 201;
        dataResponse.message = "Successfully created";
        dataResponse.result = quizCreated;
        return res.status(dataResponse.statusCode).send(dataResponse);
      }
    } catch (error) {
      console.log(error)
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public update = async (
    req: Request,
    res: Response
  ): Promise<QuizDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully updated");
    try {
      const userDTO: UserDTO = res?.locals?.userReq;
      const quizDTO: QuizDTO = req.body;
      quizDTO.lastModifiedBy = userDTO.username; 

      if (!isNumber(quizDTO.id)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid ID! ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const quizFindById = await this.quizService.getQuizById(
        Number(quizDTO.id)
      );

      if (!quizFindById) {
        dataResponse.statusCode = 404;
        dataResponse.message = "Quiz not found";

        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      // Nếu quiz code không thay đổi
      if (quizDTO.code === quizFindById.code) {
        // => Update quiz
        const quizUpdated = await this.quizService.update(quizDTO);

        dataResponse.statusCode = 200;
        dataResponse.message = "Successfully updated";
        dataResponse.result = quizUpdated;
        return res.status(dataResponse.statusCode).send(dataResponse);
      } else {
        // Nếu thay đổi quiz code
        // => Check quiz code exist
        const quizFindByQuizname = await this.quizService.getQuizByCode(
          quizDTO.code
        );

        // Nếu quiz code đã tồn tại
        if (quizFindByQuizname) {
          dataResponse.statusCode = 400;
          dataResponse.message = "Quiz code already exists";
          return res.status(dataResponse.statusCode).send(dataResponse);
        } else {
          // Nếu quizname chưa tồn tại
          // => Update quiz
          const quizUpdated = await this.quizService.update(quizDTO);

          dataResponse.statusCode = 200;
          dataResponse.message = "Successfully updated";
          dataResponse.result = quizUpdated;
        }
      }
    } catch (error) {
      console.log(error)
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public delete = async (
    req: Request,
    res: Response
  ): Promise<QuizDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully deleted");
    try {
      if (!isNumber(req.params.id)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid ID! ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const id = Number(req.params.id);
      const quizToDelete = await this.quizService.getQuizById(id);
      if (quizToDelete) {
        const quizDeleted = await this.quizService.delete(quizToDelete);
        dataResponse.result = quizDeleted;
      } else {
        dataResponse.statusCode = 404;
        dataResponse.message = "Quiz not found";
      }

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error)
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public createMutiple = async (
    req: Request,
    res: Response
  ): Promise<QuizDTO[] | any> => {
    let dataResponse = new DataResponse(null, 201, "Successfully created");
    try {
      const userDTO: UserDTO = res?.locals?.userReq;
      const quizDTOs: QuizDTO[] = req.body.map((quizDTO: QuizDTO[]) => {
        return { ...quizDTO, createdBy: userDTO?.username };
      });
      
      const quizsCreated = await this.quizService.createMutiple(
        quizDTOs
      );

      if (!quizsCreated) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Bad request";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      dataResponse.statusCode = 201;
      dataResponse.message = "Successfully created";
      dataResponse.result = quizsCreated;

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error)
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };


  /**
   * Configure the routes of controller
   */
  public routes() {
    this.router.get(
      "/get-all",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.getAllQuiz
    );
    this.router.get(
      "/get-one/:id",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.getQuizById
    );
    this.router.post(
      "/create",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.create
    );
    this.router.put(
      "/update",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.update
    );
    this.router.delete(
      "/delete/:id",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.delete
    );
    this.router.post(
      "/create/mutiple-quiz",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.createMutiple
    );

    // this.router.get("/get-all", this.getAllQuiz);
    // this.router.get("/get-one/:id", this.getQuizById);
    // this.router.post("/create", this.create);
    // this.router.put("/update", this.update);
    // this.router.delete("/delete/:id", this.delete);
  }
}
