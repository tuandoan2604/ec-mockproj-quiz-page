import { EntityRepository } from "typeorm";
import { QuizEntity } from "../entities/quiz.entity";
import { AppDataSource } from "../data-source";

@EntityRepository()
export class QuizRepository {
  constructor(
    private readonly quizRepository = AppDataSource.getRepository(QuizEntity)
  ) {}
 
  async find(): Promise<QuizEntity[] | any> {
    try {
      return await this.quizRepository.find();
    } catch (error) {
      return;
    }
  }

  async findOne(id: number): Promise<QuizEntity | any> {
    try {
      return await this.quizRepository.findOne({where: {id}});
    } catch (error) {
      return;
    }
  }

  async save(quizEntity: QuizEntity): Promise<QuizEntity | any> {
    try {
      const quizCreated = await this.quizRepository.save(quizEntity);

      return quizCreated;
    } catch (error) {
      return;
    }
  }

  async update(quizEntity: QuizEntity): Promise<QuizEntity | any> {
    try {
      const quizUpdated = await this.quizRepository.save(quizEntity);

      return quizUpdated;
    } catch (error) {
      return;
    }
  }

  async delete(quizEntity: QuizEntity): Promise<QuizEntity | any> {
    try {
      const quizDeleted = await this.quizRepository.remove(quizEntity);

      return quizDeleted;
    } catch (error) {
      return;
    }
  }

  async findByCode(code: string): Promise<QuizEntity | any> {
    try {
      return await this.quizRepository.findOne({
        where: {code: code},
      });
    } catch (error) {
      return;
    }
  }

  async saveMany(quizsEntity: QuizEntity[]): Promise<QuizEntity[] | any> {
    try {
      const quizsCreated = await this.quizRepository.save(quizsEntity);

      return quizsCreated;
    } catch (error) {
      console.log(error);
      return;
    }
  }

}
