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
import { QuestionDTO } from "../../services/dtos/question.dto";
import { AnswerDTO } from "../../services/dtos/answer.dto";
import { ToDoQuizService } from "../../services/to-do-quiz/to-do-quiz.service";
import { AnswerSummaryDTO } from "../../services/dtos/answer-summary.dto";
import { isNumber } from "../../utils/validation/is-number.util";
import { QuizSummaryDTO } from "../../services/dtos/quiz-summary.dto";
import { QuestionSummaryDTO } from "../../services/dtos/question-summary.dto";

export class ToDoQuizController {
  public readonly router: Router;
  private readonly quizService: QuizService;
  private readonly quizSummaryService: QuizSummaryService;
  private readonly questionSummaryService: QuestionSummaryService;
  private readonly answerSummaryService: AnswerSummaryService;
  private readonly toDoQuizService: ToDoQuizService;

  constructor() {
    // Create a new instance of QuizController
    this.quizService = new QuizService();
    this.quizSummaryService = new QuizSummaryService();
    this.questionSummaryService = new QuestionSummaryService();
    this.answerSummaryService = new AnswerSummaryService();
    this.toDoQuizService = new ToDoQuizService();
    this.router = Router();
    this.routes();
  }

  public createSampleData = async (
    req: Request,
    res: Response
  ): Promise<QuizDTO[] | any> => {
    let dataResponse = new DataResponse(null, 201, "Successfully Created");
    try {
      const userReqDTO: UserDTO = res?.locals?.userReq;
      const quizSampleData: any = req.body;
      const sampleDataCreated = await this.toDoQuizService.createSampleData(
        quizSampleData,
        userReqDTO
      );

      if (!sampleDataCreated) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Bad request";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      dataResponse.result = sampleDataCreated;
      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error);
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
      const userReqDTO: UserDTO = res?.locals?.userReq;
      const quizDTO: QuizDTO = req.body;

      // lấy thông tin quizToDo
      const quizToDoFound = await this.quizService.getQuizToDo(
        Number(quizDTO.id)
      );
      // Nếu quiz không được tìm thấy => Báo lỗi Quiz not found
      if (!quizToDoFound) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Quiz not found";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      // Nếu quiz tồn tại
      // => Tìm quiz summary inprogress trong bảng quiz summary theo userId và quizId
      const quizSummaryInprogress =
        await this.quizSummaryService.findQuizSummaryInprogressByUserAndQuiz(
          userReqDTO.id,
          quizDTO.id
        );

      // Nếu có quiz đang trong trạng thái inprogress => return về thông tin bài quiz đó
      if (quizSummaryInprogress) {
        console.log("Tiếp tục làm quiz!");
        dataResponse.result = quizSummaryInprogress;
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      console.log("Tạo Quiz Summary mới!");

      // Nếu ko có quiz nào đang inprogess => tức là quiz đó chưa được làm hoặc đã hoàn thành trước đó
      // => Tạo quiz summary mới với trạng thái là inprogress và return và thông tin quiz summary vừa mới tạo
      const quizSummaryIdCreated =
        await this.quizSummaryService.createNewQuizToDoSummary(
          quizToDoFound,
          userReqDTO
        );

      // nếu tạo thành công quiz summary (nhận đc id đã tạo)
      if (quizSummaryIdCreated) {
        const quizTodo = await this.quizSummaryService.getQuizSummaryById(
          quizSummaryIdCreated
        );
        (dataResponse.statusCode = 200),
          (dataResponse.message = "Successfully");
        dataResponse.result = quizTodo;
      } else {
        dataResponse.statusCode = 500;
        dataResponse.message = "Internal server error";

        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error);
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public getAnswersToDo = async (
    req: Request,
    res: Response
  ): Promise<AnswerSummaryDTO[] | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      const userReqDTO: UserDTO = res?.locals?.userReq;

      if (!isNumber(req.params.questionSummaryId)) {
        dataResponse.statusCode = 400;
        dataResponse.message =
          "Invalid Question Summary ID! Question Summary ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const answersToDo = await this.answerSummaryService.getAnswersToDo(
        Number(req.params.questionSummaryId),
        Number(userReqDTO.id)
      );

      if (!answersToDo || answersToDo.length === 0) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Answers not found";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      dataResponse.result = answersToDo;
      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error);
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public getQuizSummaryByQuizAndUser = async (
    req: Request,
    res: Response
  ): Promise<QuizSummaryDTO[] | any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully");
    try {
      const userReqDTO: UserDTO = res?.locals?.userReq;

      if (!isNumber(req.params.quizId)) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Invalid Quiz ID! Quiz ID Must be a number";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      const quizsSummaryFoundByQuizAndUser =
        await this.quizSummaryService.getQuizSummaryByQuizAndUser(
          Number(req.params.quizId),
          Number(userReqDTO.id)
        );

      if (
        !quizsSummaryFoundByQuizAndUser ||
        quizsSummaryFoundByQuizAndUser.length === 0
      ) {
        dataResponse.statusCode = 400;
        dataResponse.message = "Quiz Summary not found";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      dataResponse.result = quizsSummaryFoundByQuizAndUser;
      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error);
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public saveAnswer = async (req: Request, res: Response): Promise<any> => {
    let dataResponse = new DataResponse(null, 200, "Successfully saved answer");
    try {
      const questionSummaryDTO: QuestionSummaryDTO = req.body;
      const answersSummary: any = questionSummaryDTO.answersSummary?.map(
        (answerSummary) => {
          return { id: answerSummary.id, isSelected: answerSummary.isSelected };
        }
      );

      const isAnswerChanged = answersSummary.some(
        (answer: AnswerSummaryDTO) => {
          return answer.isSelected;
        }
      );

      if (!isAnswerChanged) {
        dataResponse.message = "NOT_YET_ANSWERED";
        return res.status(dataResponse.statusCode).send(dataResponse);
      }

      questionSummaryDTO.status = "ANSWER_SAVED";
      const quizSummarySaved = await this.questionSummaryService.saveAnswer(
        questionSummaryDTO,
        answersSummary
      );

      dataResponse.result = quizSummarySaved;
      return res.status(dataResponse.statusCode).send(dataResponse);
    } catch (error) {
      console.log(error);
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  public submitQuiz = async (req: Request, res: Response) => {
    let dataResponse = new DataResponse(null, 200, "Successfully submited");
    try {
      let marks = 0;
      let grade = 0;
      // quiz submitted
      const quizSummaryDTO: QuizSummaryDTO = req.body;

      // check quiz summary exist
      // const quizSummaryFoundToSubmitted =
      //   await this.quizSummaryService.getQuizSummaryByIdAndStatus(
      //     quizSummaryDTO
      //   );
      // if (!quizSummaryFoundToSubmitted) {
      //   dataResponse.statusCode = 400;
      //   dataResponse.message = "Quiz Submited not found";
      //   return res.status(dataResponse.statusCode).send(dataResponse);
      // }

      // Đếm số lượng câu hỏi trong quiz => để chia điểm cho mỗi câu trả lời đúng
      const numberOfQuestion =
        await this.questionSummaryService.countQuestionByQuiz(quizSummaryDTO);

      // Đếm số lượng câu trả lời đúng của những câu hỏi "Is Not Mutiple" - (isMutiple = false)
      const numberOfAnswerCorrectWithIsMutipleFalse =
        await this.answerSummaryService.getNumberOfAnswerCorrectWithIsMutipleFalse(
          quizSummaryDTO
        );

      // Lấy ra danh sách những câu hỏi "Is Mutile" - (isMutiple = true) (kèm theo những câu trả lời đúng "relations_answer" - isCorrect = true )
      const questionsSummaryIsMutipleTrue =
        await this.questionSummaryService.getQuestionsSummaryIsMutipleTrue(
          quizSummaryDTO
        );

      // Số lượng câu trả lời đúng của những câu hỏi isMutiple = true
      let numberOfAnswerCorrectWithIsMutipleTrue = 0;

      // Duyệt qua tất cả những câu hỏi isMutiple = true lấy ra đc 
      questionsSummaryIsMutipleTrue.forEach((question: QuestionSummaryDTO) => {
        // Every => nếu tất cả answer của question mà có isCorrect = isSelected => is correct answer
        let isCorrectAnswers = 
        question.answersSummary?.every((answer) => {
          return answer.isCorrect === answer.isSelected;
        })

        // Nếu câu trả lời đúng => + dồn số lượng câu trả lời đúng; 
        if (isCorrectAnswers) {
          numberOfAnswerCorrectWithIsMutipleTrue += 1;
        }

      });

      // marks: Số lượng câu trả lời đúng (của 2 dạng question: isMutiple = true or false)
      marks =
        numberOfAnswerCorrectWithIsMutipleFalse +
        numberOfAnswerCorrectWithIsMutipleTrue;
      // grade: Điểm / 10 = marks * (số điểm / 1 câu hỏi). số điểm / 1 câu hỏi = 10 / numberOfQuestion - (tổng số lượng câu hỏi)
      grade = marks * (10 / numberOfQuestion);

      // Lưu marks và grade
      const quizSummaryDTOToSubmitted: QuizSummaryDTO = {
        id: quizSummaryDTO.id,
        status: "SUBMITTED",
        marks: marks,
        grade: grade,
      }
      
      // Update marks và grade trong db
      const quizSummarySubmitted = await this.quizSummaryService.update(quizSummaryDTOToSubmitted);

      dataResponse.result = quizSummarySubmitted;
      return res.status(dataResponse.statusCode).send({
        dataResponse,
      });
    } catch (error) {
      console.log(error);
      dataResponse.statusCode = 500;
      dataResponse.message = "Internal server error";

      return res.status(dataResponse.statusCode).send(dataResponse);
    }
  };

  /**
   * Configure the routes of controller
   */
  public routes() {
    this.router.post(
      "/create-sample-data",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.createSampleData
    );
    this.router.post(
      "/start-quiz",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.startQuiz
    );
    this.router.get(
      "/get-answers-to-do/:questionSummaryId",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.getAnswersToDo
    );
    this.router.get(
      "/get-quiz-summary-by-quiz-and-user/:quizId",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.getQuizSummaryByQuizAndUser
    );
    this.router.put(
      "/save-answer",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.saveAnswer
    );
    this.router.post(
      "/submit-quiz",
      [checkJwt, checkRole(["ROLE_ADMIN", "ROLE_USER"])],
      this.submitQuiz
    );
  }
}
