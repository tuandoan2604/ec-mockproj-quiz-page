import { Router, Response, Request } from "express";
import { QuizService } from "../../services/quiz.service";
import { DataResponse } from "../data-response/data-response";
import { QuizDTO } from "../../services/dtos/quiz.dto";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import { UserDTO } from "../../services/dtos/user.dto";
import { QuizSummaryService } from "../../services/quiz-summary.service";
import { QuestionSummaryService } from "../../services/question-summary.service";
import { AnswerSummaryService } from "../../services/answer-summary.service";

export class ToDoQuizController {
  public readonly router: Router;
  private readonly quizService: QuizService;
  private readonly quizSummaryService: QuizSummaryService;
  private readonly questionSummaryService: QuestionSummaryService;
  private readonly answerSummaryService: AnswerSummaryService;

  constructor() {
    // Create a new instance of QuizController
    this.quizService = new QuizService(); 
    this.quizSummaryService = new QuizSummaryService(); 
    this.questionSummaryService = new QuestionSummaryService(); 
    this.answerSummaryService = new AnswerSummaryService(); 
    this.router = Router();
    this.routes();
  }

  public createQuizDataSameple = async (
    req: Request,
    res: Response
  ): Promise<QuizDTO[] | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
        const quizDTO: QuizDTO = req.body;

        return res.status(dataResponse.statusCode).send(quizDTO);
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public startQuiz = async (
    req: Request,
    res: Response
  ): Promise<QuizDTO[] | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
        const quizDTO: QuizDTO = req.body;

        return res.status(dataResponse.statusCode).send(quizDTO);
    } catch (error) {
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  /**
   * Configure the routes of controller
   */
  public routes() {
    // this.router.post(
    //   "/start-quiz",
    //   [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
    //   this.startQuiz
    // );

    this.router.post("/create-quiz-data-sample", this.createQuizDataSameple);
    this.router.post("/start-quiz", this.startQuiz);

  }
}
