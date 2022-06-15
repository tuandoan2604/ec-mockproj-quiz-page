import { EntityRepository } from "typeorm";
import { AnswerEntity } from "../entities/answer.entity";
import { AppDataSource } from "../data-source";

@EntityRepository()
export class AnswerRepository {
  constructor(
    private readonly answerRepository = AppDataSource.getRepository(AnswerEntity)
  ) {}

  async find(): Promise<AnswerEntity[] | any> {
    try {
      return await this.answerRepository.find();
    } catch (error) {
      return;
    }
  }

  async findOne(id: number): Promise<AnswerEntity | any> {
    try {
      return await this.answerRepository.findOne({ where: { id } });
    } catch (error) {
      return;
    }
  }

  async save(answerEntity: AnswerEntity): Promise<AnswerEntity | any> {
    try {
      const answerCreated = await this.answerRepository.save(answerEntity);

      return answerCreated;
    } catch (error) {
      return;
    }
  }

  async update(answerEntity: AnswerEntity): Promise<AnswerEntity | any> {
    try {
      const answerUpdated = await this.answerRepository.save(answerEntity);

      return answerUpdated;
    } catch (error) {
      return;
    }
  }

  async delete(answerEntity: AnswerEntity): Promise<AnswerEntity | any> {
    try {
      const answerDeleted = await this.answerRepository.remove(answerEntity);

      return answerDeleted;
    } catch (error) {
      return;
    }
  }
  
  async saveMany(answersEntity: AnswerEntity[]): Promise<AnswerEntity[] | any> {
    try {
      const answersCreated = await this.answerRepository.save(answersEntity);

      return answersCreated;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
