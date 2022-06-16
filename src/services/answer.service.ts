import { AnswerEntity } from "../entities/answer.entity";
import { AnswerRepository } from "../repositories/answer.repository";
import { AnswerDTO } from "./dtos/answer.dto";
import { AnswerMapper } from "./mappers/answer.mapper";

export class AnswerService {
  constructor(private readonly answerRepository = new AnswerRepository()) {}

  public getAllAnswer = async (): Promise<AnswerDTO[] | any> => {
    try {
      const answersEntity = await this.answerRepository.find();
      if (!answersEntity) {
        return [];
      }
      
      const answersDTO: AnswerDTO[] = [];

      answersEntity.forEach((answer: AnswerEntity) =>
        answersDTO.push(AnswerMapper.fromEntityToDTO(answer))
      );

      return answersDTO;
    } catch (error) {
      return;
    }
  };

  public getAnswerById = async (id: number): Promise<AnswerDTO | any> => {
    try {
      const answerFound = await this.answerRepository.findOne(id);

      return AnswerMapper.fromEntityToDTO(answerFound);
    } catch (error) {
      return;
    }
  };

  public create = async (
    answerDTO: AnswerDTO
  ): Promise<AnswerDTO | any> => {
    try {
      const answerCreated = await this.answerRepository.save(
        AnswerMapper.fromDTOtoEntity(answerDTO)
      );

      return answerCreated;
    } catch (error) {
      return;
    }
  };

  public update = async (
    answerDTO: AnswerDTO
  ): Promise<AnswerDTO | any> => {
    try {
      const answerToUpdate = AnswerMapper.fromDTOtoEntity(answerDTO);
      const answerUpdated = await this.answerRepository.save(
        answerToUpdate
      );

      return AnswerMapper.fromEntityToDTO(answerUpdated);
    } catch (error) {
      return;
    }
  };

  public delete = async (
    answerDTO: AnswerDTO
  ): Promise<AnswerDTO | any> => {
    try {
      const answerToDelete = AnswerMapper.fromDTOtoEntity(answerDTO);
      const answerDeleted = await this.answerRepository.delete(
        answerToDelete
      );

      return AnswerMapper.fromEntityToDTO(answerDeleted);
    } catch (error) {
      return;
    }
  };

  public createMutiple = async (
    answerDTOs: AnswerDTO[]
  ): Promise<AnswerDTO[] | any> => {
    try {
      const answersEntity: AnswerEntity[] = [];

      answerDTOs.forEach((answerDTO: AnswerDTO) =>
        answersEntity.push(AnswerMapper.fromEntityToDTO(answerDTO))
      );

      const answersCreated = await this.answerRepository.saveMany(answersEntity);

      if (!answersCreated) {
        return;
      }

      const answersCreatedDTO: AnswerDTO[] = [];

      answersCreated.forEach((answer: AnswerEntity) =>
      answersCreatedDTO.push(AnswerMapper.fromEntityToDTO(answer))
      );

      return answersCreatedDTO;
    } catch (error) {
      return;
    }
  };
}
