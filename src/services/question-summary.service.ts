import { QuestionSummaryEntity } from "../entities/question-summary.entity";
import { QuestionSummaryRepository } from "../repositories/question-summary.repository";
import { AnswerSummaryDTO } from "./dtos/answer-summary.dto";
import { QuestionSummaryDTO } from "./dtos/question-summary.dto";
import { QuestionSummaryMapper } from "./mappers/question-summary.mapper";

export class QuestionSummaryService {
  constructor(
    private readonly questionSummaryRepository = new QuestionSummaryRepository()
  ) {}

  public getAllQuestionSummary = async (): Promise<
    QuestionSummaryDTO[] | any
  > => {
    try {
      const questionSummarysEntity =
        await this.questionSummaryRepository.find();
      if (!questionSummarysEntity) {
        return [];
      }

      const questionSummarysDTO: QuestionSummaryDTO[] = [];

      questionSummarysEntity.forEach((questionSummary: QuestionSummaryEntity) =>
        questionSummarysDTO.push(
          QuestionSummaryMapper.fromEntityToDTO(questionSummary)
        )
      );

      return questionSummarysDTO;
    } catch (error) {
      return;
    }
  };

  public getQuestionSummaryById = async (
    id: number
  ): Promise<QuestionSummaryDTO | any> => {
    try {
      const questionSummaryFound = await this.questionSummaryRepository.findOne(
        id
      );

      return QuestionSummaryMapper.fromEntityToDTO(questionSummaryFound);
    } catch (error) {
      return;
    }
  };

  public create = async (
    questionSummaryDTO: QuestionSummaryDTO
  ): Promise<QuestionSummaryDTO | any> => {
    try {
      const questionSummaryCreated = await this.questionSummaryRepository.save(
        QuestionSummaryMapper.fromDTOtoEntity(questionSummaryDTO)
      );

      return questionSummaryCreated;
    } catch (error) {
      return;
    }
  };

  public update = async (
    questionSummaryDTO: QuestionSummaryDTO
  ): Promise<QuestionSummaryDTO | any> => {
    try {
      const questionSummaryToUpdate =
        QuestionSummaryMapper.fromDTOtoEntity(questionSummaryDTO);
      const questionSummaryUpdated = await this.questionSummaryRepository.save(
        questionSummaryToUpdate
      );

      return QuestionSummaryMapper.fromEntityToDTO(questionSummaryUpdated);
    } catch (error) {
      return;
    }
  };

  public delete = async (
    questionSummaryDTO: QuestionSummaryDTO
  ): Promise<QuestionSummaryDTO | any> => {
    try {
      const questionSummaryToDelete =
        QuestionSummaryMapper.fromDTOtoEntity(questionSummaryDTO);
      const questionSummaryDeleted =
        await this.questionSummaryRepository.delete(questionSummaryToDelete);

      return QuestionSummaryMapper.fromEntityToDTO(questionSummaryDeleted);
    } catch (error) {
      return;
    }
  };

  public createMutiple = async (
    questionSummaryDTOs: QuestionSummaryDTO[]
  ): Promise<QuestionSummaryDTO[] | any> => {
    try {
      const questionSummarysEntity: QuestionSummaryEntity[] = [];

      questionSummaryDTOs.forEach((questionSummaryDTO: QuestionSummaryDTO) =>
        questionSummarysEntity.push(
          QuestionSummaryMapper.fromEntityToDTO(questionSummaryDTO)
        )
      );

      const questionSummarysCreated =
        await this.questionSummaryRepository.saveMany(questionSummarysEntity);

      if (!questionSummarysCreated) {
        return;
      }

      const questionSummarysCreatedDTO: QuestionSummaryDTO[] = [];

      questionSummarysCreated.forEach(
        (questionSummary: QuestionSummaryEntity) =>
          questionSummarysCreatedDTO.push(
            QuestionSummaryMapper.fromEntityToDTO(questionSummary)
          )
      );

      return questionSummarysCreatedDTO;
    } catch (error) {
      return;
    }
  };

  public saveAnswer = async (
    questionSummaryDTO: QuestionSummaryDTO,
    answersSummary: AnswerSummaryDTO
  ): Promise<any> => {
    try {
      const result = await this.questionSummaryRepository.saveAnswer(questionSummaryDTO, answersSummary);

      return result;
    } catch (error) {
      return;
    }
  };
}
