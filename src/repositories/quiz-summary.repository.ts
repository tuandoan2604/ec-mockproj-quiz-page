import { EntityRepository } from "typeorm";
import { QuizSummaryEntity } from "../entities/quiz-summary.entity";
import { AppDataSource } from "../data-source";

@EntityRepository()
export class QuizSummaryRepository {
  constructor(
    private readonly quizSummaryRepository = AppDataSource.getRepository(QuizSummaryEntity)
  ) {}
 
  async find(): Promise<QuizSummaryEntity[] | any> {
    try {
      return await this.quizSummaryRepository.find();
    } catch (error) {
      return;
    }
  }

  async findOne(id: number): Promise<QuizSummaryEntity | any> {
    try {
      return await this.quizSummaryRepository.findOne({where: {id}});
    } catch (error) {
      return;
    }
  }

  async save(quizSummaryEntity: QuizSummaryEntity): Promise<QuizSummaryEntity | any> {
    try {
      const quizSummaryCreated = await this.quizSummaryRepository.save(quizSummaryEntity);

      return quizSummaryCreated;
    } catch (error) {
      return;
    }
  }

  async update(quizSummaryEntity: QuizSummaryEntity): Promise<QuizSummaryEntity | any> {
    try {
      const quizSummaryUpdated = await this.quizSummaryRepository.save(quizSummaryEntity);

      return quizSummaryUpdated;
    } catch (error) {
      return;
    }
  }

  async delete(quizSummaryEntity: QuizSummaryEntity): Promise<QuizSummaryEntity | any> {
    try {
      const quizSummaryDeleted = await this.quizSummaryRepository.remove(quizSummaryEntity);

      return quizSummaryDeleted;
    } catch (error) {
      return;
    }
  }

}
