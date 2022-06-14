import { QuestionRepository } from "../repositories/question.repository";
import { QuestionDTO } from "./dtos/question.dto";
import { QuestionMapper } from "./mappers/question.mapper";

export class QuestionService {
  constructor(private readonly questionRepository = new QuestionRepository()) {}

  public getAllQuestion = async (): Promise<QuestionDTO[] | any> => {
    try {
      const questions = await this.questionRepository.find();
      if (!questions) {
        return [];
      }
      
      const questionsDTO: QuestionDTO[] = [];

      questions.forEach((question: QuestionDTO) =>
        questionsDTO.push(QuestionMapper.fromEntityToDTO(question))
      );

      return questionsDTO;
    } catch (error) {
      return;
    }
  };

  public getQuestionById = async (id: number): Promise<QuestionDTO | any> => {
    try {
      const questionFound = await this.questionRepository.findOne(id);

      return QuestionMapper.fromEntityToDTO(questionFound);
    } catch (error) {
      return;
    }
  };

  public create = async (
    questionDTO: QuestionDTO
  ): Promise<QuestionDTO | any> => {
    try {
      const questionCreated = await this.questionRepository.save(
        QuestionMapper.fromDTOtoEntity(questionDTO)
      );

      return questionCreated;
    } catch (error) {
      return;
    }
  };

  public update = async (
    questionDTO: QuestionDTO
  ): Promise<QuestionDTO | any> => {
    try {
      const questionToUpdate = QuestionMapper.fromDTOtoEntity(questionDTO);
      const questionUpdated = await this.questionRepository.save(
        questionToUpdate
      );

      return QuestionMapper.fromEntityToDTO(questionUpdated);
    } catch (error) {
      return;
    }
  };

  public delete = async (
    questionDTO: QuestionDTO
  ): Promise<QuestionDTO | any> => {
    try {
      const questionToDelete = QuestionMapper.fromDTOtoEntity(questionDTO);
      const questionDeleted = await this.questionRepository.delete(
        questionToDelete
      );

      return QuestionMapper.fromEntityToDTO(questionDeleted);
    } catch (error) {
      return;
    }
  };
}
