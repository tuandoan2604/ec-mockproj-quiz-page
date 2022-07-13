import { Router, Response, Request } from "express";
import { AnswerService } from "../services/answer.service";
import { DataResponse } from "./data-response/data-response";
import { AnswerDTO } from "../services/dtos/answer.dto";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { isNumber } from "../utils/validation/is-number.util";
import { UserDTO } from "src/services/dtos/user.dto";

export class AnswerController {
  public readonly router: Router;
  private readonly answerService: AnswerService;

  constructor() {
    this.answerService = new AnswerService(); // Create a new instance of AnswerController
    this.router = Router();
    this.routes();
  }

  public getAllAnswer = async (
    req: Request,
    res: Response
  ): Promise<AnswerDTO[] | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      let answers = await this.answerService.getAllAnswer();

      dataResponse.result = answers;

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error)
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public getAnswerById = async (
    req: Request,
    res: Response
  ): Promise<AnswerDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      if (!isNumber(req.params.id)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid ID! ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const id = Number(req.params.id);
      const answerFound = await this.answerService.getAnswerById(id);

      if (answerFound) {
        dataResponse.result = answerFound;
      } else {
        dataResponse.statusCode = 404;
        dataResponse.message = "Answer not found";
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
  ): Promise<AnswerDTO | any> => {
    let dataResponse = new DataResponse(null, 201, "Successfully created");
    try {
      const userDTO: UserDTO = res?.locals?.userReq;
      const answerDTO: AnswerDTO = req.body;
      answerDTO.createdBy = userDTO.username;

      const answerCreated = await this.answerService.create(answerDTO);

      if (!answerCreated) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Bad request";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      dataResponse.statusCode = 201;
      dataResponse.message = "Successfully created";
      dataResponse.result = answerCreated;
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
  ): Promise<AnswerDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully updated");
    try {
      const userDTO: UserDTO = res?.locals?.userReq;
      const answerDTO: AnswerDTO = req.body;
      answerDTO.lastModifiedBy = userDTO.username;

      if (!isNumber(answerDTO.id)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid ID! ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const answerFindById = await this.answerService.getAnswerById(
        Number(answerDTO.id)
      );

      if (!answerFindById) {
        dataResponse.statusCode = 404;
        dataResponse.message = "Answer not found";

        return res.status(dataResponse.statusCode).send(dataResponse);
      }
      // => Update answer
      const answerUpdated = await this.answerService.update(answerDTO);

      dataResponse.statusCode = 200;
      dataResponse.message = "Successfully updated";
      dataResponse.result = answerUpdated;
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
  ): Promise<AnswerDTO | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully deleted");
    try {
      if (!isNumber(req.params.id)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid ID! ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const id = Number(req.params.id);
      const answerToDelete = await this.answerService.getAnswerById(id);
      if (answerToDelete) {
        const answerDeleted = await this.answerService.delete(
          answerToDelete
        );
        dataResponse.result = answerDeleted;
      } else {
        dataResponse.statusCode = 404;
        dataResponse.message = "Answer not found";
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
  ): Promise<AnswerDTO[] | any> => {
    let dataResponse = new DataResponse(null, 201, "Successfully created");
    try {
      const userDTO: UserDTO = res?.locals?.userReq;
      const answerDTOs: AnswerDTO[] = req.body.map((answerDTO: AnswerDTO[]) => {
        return { ...answerDTO, createdBy: userDTO?.username };
      });
      
      const answersCreated = await this.answerService.createMutiple(
        answerDTOs
      );

      if (!answersCreated) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Bad request";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      dataResponse.statusCode = 201;
      dataResponse.message = "Successfully created";
      dataResponse.result = answersCreated;

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
      this.getAllAnswer
    );
    this.router.get(
      "/get-one/:id",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.getAnswerById
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
      "/create/mutiple-answer",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.createMutiple
    );

    // this.router.get("/get-all", this.getAllAnswer);
    // this.router.get("/get-one/:id", this.getAnswerById);
    // this.router.post("/create", this.create);
    // this.router.put("/update", this.update);
    // this.router.delete("/delete/:id", this.delete);
  }
}
