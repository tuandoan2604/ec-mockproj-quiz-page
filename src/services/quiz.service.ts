import { QuizEntity } from "../entities/quiz.entity";
import { QuizRepository } from "../repositories/quiz.repository";
import { QuizDTO } from "./dtos/quiz.dto";
import { QuizMapper } from "./mappers/quiz.mapper";

export class QuizService {
  constructor(private readonly quizRepository = new QuizRepository()) {}

  public getAllQuiz = async (): Promise<QuizDTO[] | any> => {
    try {
      const quizsEntity = await this.quizRepository.find();
      if (!quizsEntity) {
        return [];
      }

      const quizsDTO: QuizDTO[] = [];

      quizsEntity.forEach((quiz: QuizEntity) =>
        quizsDTO.push(QuizMapper.fromEntityToDTO(quiz))
      );

      return quizsDTO;
    } catch (error) {
      return;
    }
  };

  public getQuizById = async (id: number): Promise<QuizDTO | any> => {
    try {
      const quizFound = await this.quizRepository.findOne(id);

      return QuizMapper.fromEntityToDTO(quizFound);
    } catch (error) {
      return;
    }
  };

  public getQuizByCode = async (code: string): Promise<QuizDTO | any> => {
    try {
      const quizFound = await this.quizRepository.findByCode(code);

      return QuizMapper.fromEntityToDTO(quizFound);
    } catch (error) {
      return;
    }
  };

  public create = async (quizDTO: QuizDTO): Promise<QuizDTO | any> => {
    try {
      const quizFind = await this.quizRepository.findByCode(quizDTO.code);

      if (quizFind) {
        return "Quiz code already exists";
      }

      const quizCreated = await this.quizRepository.save(
        QuizMapper.fromDTOtoEntity(quizDTO)
      );

      return quizCreated;
    } catch (error) {
      return;
    }
  };

  public update = async (quizDTO: QuizDTO): Promise<QuizDTO | any> => {
    try {
      const quizToUpdate = QuizMapper.fromDTOtoEntity(quizDTO);
      const quizUpdated = await this.quizRepository.save(quizToUpdate);

      return QuizMapper.fromEntityToDTO(quizUpdated);
    } catch (error) {
      return;
    }
  };

  public delete = async (quizDTO: QuizDTO): Promise<QuizDTO | any> => {
    try {
      const quizToDelete = QuizMapper.fromDTOtoEntity(quizDTO);
      const quizDeleted = await this.quizRepository.delete(quizToDelete);

      return QuizMapper.fromEntityToDTO(quizDeleted);
    } catch (error) {
      return;
    }
  };

  public createMutiple = async (
    quizDTOs: QuizDTO[]
  ): Promise<QuizDTO[] | any> => {
    try {
      const quizsEntity: QuizEntity[] = [];

      quizDTOs.forEach((quizDTO: QuizDTO) =>
        quizsEntity.push(QuizMapper.fromEntityToDTO(quizDTO))
      );

      const quizsCreated = await this.quizRepository.saveMany(quizsEntity);

      if (!quizsCreated) {
        return;
      }

      const quizsCreatedDTO: QuizDTO[] = [];

      quizsCreated.forEach((quiz: QuizEntity) =>
        quizsCreatedDTO.push(QuizMapper.fromEntityToDTO(quiz))
      );

      return quizsCreatedDTO;
    } catch (error) {
      return;
    }
  };

  public getQuizToDo = async (id: number): Promise<QuizDTO | any> => {
    try {
      const quizFound = await this.quizRepository.findQuizToDo(id);

      return QuizMapper.fromEntityToDTO(quizFound);
    } catch (error) {
      return;
    }
  };
}
