import { EntityRepository } from "typeorm";
import { QuestionEntity } from "../entities/question.entity";
import { AppDataSource } from "../data-source";

@EntityRepository()
export class QuestionRepository {
  constructor(
    private readonly questionRepository = AppDataSource.getRepository(QuestionEntity)
  ) {}

  async find(): Promise<QuestionEntity[] | any> {
    try {
      return await this.questionRepository.find();
    } catch (error) {
      return;
    }
  }

  async findOne(id: number): Promise<QuestionEntity | any> {
    try {
      return await this.questionRepository.findOne({ where: { id } });
    } catch (error) {
      return;
    }
  }

  async save(questionEntity: QuestionEntity): Promise<QuestionEntity | any> {
    try {
      const questionCreated = await this.questionRepository.save(questionEntity);

      return questionCreated;
    } catch (error) {
      return;
    }
  }

  async update(questionEntity: QuestionEntity): Promise<QuestionEntity | any> {
    try {
      const questionUpdated = await this.questionRepository.save(questionEntity);

      return questionUpdated;
    } catch (error) {
      return;
    }
  }

  async delete(questionEntity: QuestionEntity): Promise<QuestionEntity | any> {
    try {
      const questionDeleted = await this.questionRepository.remove(questionEntity);

      return questionDeleted;
    } catch (error) {
      return;
    }
  }

  async saveMany(questionsEntity: QuestionEntity[]): Promise<QuestionEntity[] | any> {
    try {
      const questionsCreated = await this.questionRepository.save(questionsEntity);

      return questionsCreated;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  
}
