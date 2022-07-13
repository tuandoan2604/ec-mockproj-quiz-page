import { AnswerSummaryEntity } from "../entities/answer-summary.entity";
import { AnswerSummaryRepository } from "../repositories/answer-summary.repository";
import { AnswerSummaryDTO } from "./dtos/answer-summary.dto";
import { QuizSummaryDTO } from "./dtos/quiz-summary.dto";
import { AnswerSummaryMapper } from "./mappers/answer-summary.mapper";
import { QuizSummaryMapper } from "./mappers/quiz-summary.mapper";

export class AnswerSummaryService {
  constructor(
    private readonly answerSummaryRepository = new AnswerSummaryRepository()
  ) {}

  public getAllAnswerSummary = async (): Promise<AnswerSummaryDTO[] | any> => {
    try {
      const answerSummarysEntity = await this.answerSummaryRepository.find();
      if (!answerSummarysEntity) {
        return [];
      }

      const answerSummarysDTO: AnswerSummaryDTO[] = [];

      answerSummarysEntity.forEach((answerSummary: AnswerSummaryEntity) =>
        answerSummarysDTO.push(
          AnswerSummaryMapper.fromEntityToDTO(answerSummary)
        )
      );

      return answerSummarysDTO;
    } catch (error) {
      return;
    }
  };

  public getAnswerSummaryById = async (
    id: number
  ): Promise<AnswerSummaryDTO | any> => {
    try {
      const answerSummaryFound = await this.answerSummaryRepository.findOne(id);

      return AnswerSummaryMapper.fromEntityToDTO(answerSummaryFound);
    } catch (error) {
      return;
    }
  };

  public create = async (
    answerSummaryDTO: AnswerSummaryDTO
  ): Promise<AnswerSummaryDTO | any> => {
    try {
      const answerSummaryCreated = await this.answerSummaryRepository.save(
        AnswerSummaryMapper.fromDTOtoEntity(answerSummaryDTO)
      );

      return answerSummaryCreated;
    } catch (error) {
      return;
    }
  };

  public update = async (
    answerSummaryDTO: AnswerSummaryDTO
  ): Promise<AnswerSummaryDTO | any> => {
    try {
      const answerSummaryToUpdate =
        AnswerSummaryMapper.fromDTOtoEntity(answerSummaryDTO);
      const answerSummaryUpdated = await this.answerSummaryRepository.save(
        answerSummaryToUpdate
      );

      return AnswerSummaryMapper.fromEntityToDTO(answerSummaryUpdated);
    } catch (error) {
      return;
    }
  };

  public delete = async (
    answerSummaryDTO: AnswerSummaryDTO
  ): Promise<AnswerSummaryDTO | any> => {
    try {
      const answerSummaryToDelete =
        AnswerSummaryMapper.fromDTOtoEntity(answerSummaryDTO);
      const answerSummaryDeleted = await this.answerSummaryRepository.delete(
        answerSummaryToDelete
      );

      return AnswerSummaryMapper.fromEntityToDTO(answerSummaryDeleted);
    } catch (error) {
      return;
    }
  };

  public createMutiple = async (
    answerSummaryDTOs: AnswerSummaryDTO[]
  ): Promise<AnswerSummaryDTO[] | any> => {
    try {
      const answerSummarysEntity: AnswerSummaryEntity[] = [];

      answerSummaryDTOs.forEach((answerSummaryDTO: AnswerSummaryDTO) =>
        answerSummarysEntity.push(
          AnswerSummaryMapper.fromEntityToDTO(answerSummaryDTO)
        )
      );

      const answerSummarysCreated = await this.answerSummaryRepository.saveMany(
        answerSummarysEntity
      );

      if (!answerSummarysCreated) {
        return;
      }

      const answerSummarysCreatedDTO: AnswerSummaryDTO[] = [];

      answerSummarysCreated.forEach((answerSummary: AnswerSummaryEntity) =>
        answerSummarysCreatedDTO.push(
          AnswerSummaryMapper.fromEntityToDTO(answerSummary)
        )
      );

      return answerSummarysCreatedDTO;
    } catch (error) {
      return;
    }
  };

  public getAnswersToDo = async (
    questionSummaryId: number,
    userId: number
  ): Promise<AnswerSummaryDTO[] | any> => {
    try {
      const answersSummaryFound =
        await this.answerSummaryRepository.findAnswersToDo(
          questionSummaryId,
          userId
        );

      const answersSummaryDTO: AnswerSummaryDTO[] = [];

      if (answersSummaryFound) {
        answersSummaryFound.forEach((answerSummary: AnswerSummaryEntity) => {
          answersSummaryDTO.push(
            AnswerSummaryMapper.fromEntityToDTO(answerSummary)
          );
        });
      }

      return answersSummaryDTO;
    } catch (error) {
      return;
    }
  };

  public getNumberOfAnswerCorrectWithIsMutipleFalse = async (
    quizSummaryDTO: QuizSummaryDTO
  ): Promise<AnswerSummaryDTO[] | any> => {
    try {
      const quizSummary = QuizSummaryMapper.fromDTOtoEntity(quizSummaryDTO);

      const numberOfAnswerCorrectWithIsMutipleFalse = await this.answerSummaryRepository.countNumberOfAnswerCorrectWithIsMutipleFalse(quizSummary);

      return numberOfAnswerCorrectWithIsMutipleFalse;
    } catch (error) {
      return;
    }
  };

  public getAnwersSummaryOfQuestionIsMutipleTrue = async (
    quizSummaryDTO: QuizSummaryDTO
  ): Promise<AnswerSummaryDTO[] | any> => {
    try {
      const quizSummary = QuizSummaryMapper.fromDTOtoEntity(quizSummaryDTO);

      const anwersSummaryOfQuestionIsMutipleTrue = await this.answerSummaryRepository.findAnwersSummaryOfQuestionIsMutipleTrue(quizSummary);

      const answersSummaryDTO: AnswerSummaryDTO[]= [];

      anwersSummaryOfQuestionIsMutipleTrue.forEach((answersSummary: AnswerSummaryEntity) => {
        answersSummaryDTO.push(AnswerSummaryMapper.fromEntityToDTO(answersSummary));
      })

      return answersSummaryDTO;
    } catch (error) {
      return;
    }
  };

}
