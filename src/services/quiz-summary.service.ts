import { QuizSummaryEntity } from "../entities/quiz-summary.entity";
import { QuizSummaryRepository } from "../repositories/quiz-summary.repository";
import { QuizSummaryDTO } from "./dtos/quiz-summary.dto";
import { QuizDTO } from "./dtos/quiz.dto";
import { UserDTO } from "./dtos/user.dto";
import { QuizSummaryMapper } from "./mappers/quiz-summary.mapper";
import { QuizMapper } from "./mappers/quiz.mapper";

export class QuizSummaryService {
  constructor(
    private readonly quizSummaryRepository = new QuizSummaryRepository()
  ) {}

  public getAllQuizSummary = async (): Promise<QuizSummaryDTO[] | any> => {
    try {
      const quizSummarysEntity = await this.quizSummaryRepository.find();
      if (!quizSummarysEntity) {
        return [];
      }

      const quizSummarysDTO: QuizSummaryDTO[] = [];

      quizSummarysEntity.forEach((quizSummary: QuizSummaryEntity) =>
        quizSummarysDTO.push(QuizSummaryMapper.fromEntityToDTO(quizSummary))
      );

      return quizSummarysDTO;
    } catch (error) {
      return;
    }
  };

  public getQuizSummaryById = async (
    id: number
  ): Promise<QuizSummaryDTO | any> => {
    try {
      const quizSummaryFound = await this.quizSummaryRepository.findOne(id);

      return QuizSummaryMapper.fromEntityToDTO(quizSummaryFound);
    } catch (error) {
      return;
    }
  };

  public create = async (
    quizSummaryDTO: QuizSummaryDTO
  ): Promise<QuizSummaryDTO | any> => {
    try {
      const quizSummaryCreated = await this.quizSummaryRepository.save(
        QuizSummaryMapper.fromDTOtoEntity(quizSummaryDTO)
      );

      return quizSummaryCreated;
    } catch (error) {
      return;
    }
  };

  public update = async (
    quizSummaryDTO: QuizSummaryDTO
  ): Promise<QuizSummaryDTO | any> => {
    try {
      const quizSummaryToUpdate =
        QuizSummaryMapper.fromDTOtoEntity(quizSummaryDTO);
      const quizSummaryUpdated = await this.quizSummaryRepository.save(
        quizSummaryToUpdate
      );

      return QuizSummaryMapper.fromEntityToDTO(quizSummaryUpdated);
    } catch (error) {
      return;
    }
  };

  public delete = async (
    quizSummaryDTO: QuizSummaryDTO
  ): Promise<QuizSummaryDTO | any> => {
    try {
      const quizSummaryToDelete =
        QuizSummaryMapper.fromDTOtoEntity(quizSummaryDTO);
      const quizSummaryDeleted = await this.quizSummaryRepository.delete(
        quizSummaryToDelete
      );

      return QuizSummaryMapper.fromEntityToDTO(quizSummaryDeleted);
    } catch (error) {
      return;
    }
  };

  public findQuizSummaryInprogressByUserAndQuiz = async (
    userId: any,
    quizId: any
  ): Promise<QuizSummaryDTO | any> => {
    try {
      const quizSummaryFound =
        await this.quizSummaryRepository.findQuizSummaryInprogressByUserAndQuiz(
          userId,
          quizId
        );

      return QuizSummaryMapper.fromEntityToDTO(quizSummaryFound);
    } catch (error) {
      return;
    }
  };

  public createNewQuizToDoSummary = async (
    quizToDoDTO: QuizDTO,
    user: UserDTO
  ): Promise<number | any> => {
    try {
      const quizToDo = QuizMapper.fromDTOtoEntity(quizToDoDTO);
      const quizToDoSummaryIdCreated =
        await this.quizSummaryRepository.saveQuizToDoSummary(quizToDo, user);

      return quizToDoSummaryIdCreated;
    } catch (error) {
      return;
    }
  };

  public getQuizSummaryByQuizAndUser = async (
    quizId: number,
    userId: number
  ): Promise<QuizSummaryDTO[] | any> => {
    try {
      const quizsSummaryFound =
        await this.quizSummaryRepository.findByQuizAndUser(quizId, userId);

      const quizSummarysDTO: QuizSummaryDTO[] = [];

      quizsSummaryFound.forEach((quizSummary: QuizSummaryEntity) =>
        quizSummarysDTO.push(QuizSummaryMapper.fromEntityToDTO(quizSummary))
      );

      return quizSummarysDTO;
    } catch (error) {
      return;
    }
  };

  public countQuestionByQuiz = async (
    quizSummaryDTO: QuizSummaryDTO
  ): Promise<number | any> => {
    try {
      const quizSummary = QuizSummaryMapper.fromDTOtoEntity(quizSummaryDTO);

      const numberOfQuestion = await this.quizSummaryRepository.countQuestionByQuiz(quizSummary);

      return numberOfQuestion;
    } catch (error) {
      return;
    }
  }

}
