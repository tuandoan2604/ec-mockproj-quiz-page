import { Router, Response, Request } from "express";
import { QuestionService } from "../services/question.service";
import { DataResponse } from "./data-response/data-response";
import { QuestionDTO } from "../services/dtos/question.dto";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { isNumber } from "../utils/validation/is-number.util";
import { UserDTO } from "../services/dtos/user.dto";

export class QuestionController {
  public readonly router: Router;
  private readonly questionService: QuestionService;

  constructor() {
    this.questionService = new QuestionService(); // Create a new instance of QuestionController
    this.router = Router();
    this.routes();
  }

  public getAllQuestion = async (
    req: Request,
    res: Response
  ): Promise<QuestionDTO[] | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      let questions = await this.questionService.getAllQuestion();

      dataResponse.result = questions;

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error)
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public getQuestionById = async (
    req: Request,
    res: Response
  ): Promise<QuestionDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      if (!isNumber(req.params.id)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid ID! ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const id = Number(req.params.id);
      const questionFound = await this.questionService.getQuestionById(id);

      if (questionFound) {
        dataResponse.result = questionFound;
      } else {
        dataResponse.statusCode = 404;
        dataResponse.message = "Question not found";
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
  ): Promise<QuestionDTO | any> => {
    let dataResponse = new DataResponse(null, 201, "Successfully created");
    try {
      const userDTO: UserDTO = res?.locals?.userReq;
      const questionDTO: QuestionDTO = req.body;
      questionDTO.createdBy = userDTO.username;

      const questionCreated = await this.questionService.create(questionDTO);

      if (!questionCreated) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Bad request";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      dataResponse.statusCode = 201;
      dataResponse.message = "Successfully created";
      dataResponse.result = questionCreated;

      return res.status(dataResponse.statusCode).send(dataResponse);
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
  ): Promise<QuestionDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully updated");
    try {
      const userDTO: UserDTO = res?.locals?.userReq;
      const questionDTO: QuestionDTO = req.body;
      questionDTO.lastModifiedBy = userDTO.username;

      if (!isNumber(questionDTO.id)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid ID! ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const questionFindById = await this.questionService.getQuestionById(
        Number(questionDTO.id)
      );

      if (!questionFindById) {
        dataResponse.statusCode = 404;
        dataResponse.message = "Question not found";

        return res.status(dataResponse.statusCode).send(dataResponse);
      }
      // => Update question
      const questionUpdated = await this.questionService.update(questionDTO);

      dataResponse.statusCode = 200;
      dataResponse.message = "Successfully updated";
      dataResponse.result = questionUpdated;
      return res.status(dataResponse.statusCode).send(dataResponse);
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
  ): Promise<QuestionDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully deleted");
    try {
      if (!isNumber(req.params.id)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid ID! ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const id = Number(req.params.id);
      const questionToDelete = await this.questionService.getQuestionById(id);
      if (questionToDelete) {
        const questionDeleted = await this.questionService.delete(
          questionToDelete
        );
        dataResponse.result = questionDeleted;
      } else {
        dataResponse.statusCode = 404;
        dataResponse.message = "Question not found";
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
  ): Promise<QuestionDTO[] | any> => {
    let dataResponse = new DataResponse(null, 201, "Successfully created");
    try {
      const userDTO: UserDTO = res?.locals?.userReq;
      const questionDTOs: QuestionDTO[] = req.body.map((questionDTO: QuestionDTO[]) => {
        return { ...questionDTO, createdBy: userDTO?.username };
      });
      
      const questionsCreated = await this.questionService.createMutiple(
        questionDTOs
      );

      if (!questionsCreated) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Bad request";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      dataResponse.statusCode = 201;
      dataResponse.message = "Successfully created";
      dataResponse.result = questionsCreated;

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
      this.getAllQuestion
    );
    this.router.get(
      "/get-one/:id",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.getQuestionById
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
      "/create/mutiple-question",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.createMutiple
    );

    // this.router.get("/get-all", this.getAllQuestion);
    // this.router.get("/get-one/:id", this.getQuestionById);
    // this.router.post("/create", this.create);
    // this.router.put("/update", this.update);
    // this.router.delete("/delete/:id", this.delete);
  }
}
