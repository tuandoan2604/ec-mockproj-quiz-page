import { EntityRepository } from "typeorm";
import { QuestionSummaryEntity } from "../entities/question-summary.entity";
import { AppDataSource } from "../data-source";

@EntityRepository()
export class QuestionSummaryRepository {
  constructor(
    private readonly questionSummaryRepository = AppDataSource.getRepository(QuestionSummaryEntity)
  ) {}

  async find(): Promise<QuestionSummaryEntity[] | any> {
    try {
      return await this.questionSummaryRepository.find();
    } catch (error) {
      return;
    }
  }

  async findOne(id: number): Promise<QuestionSummaryEntity | any> {
    try {
      return await this.questionSummaryRepository.findOne({ where: { id } });
    } catch (error) {
      return;
    }
  }

  async save(questionSummaryEntity: QuestionSummaryEntity): Promise<QuestionSummaryEntity | any> {
    try {
      const questionSummaryCreated = await this.questionSummaryRepository.save(questionSummaryEntity);

      return questionSummaryCreated;
    } catch (error) {
      return;
    }
  }

  async update(questionSummaryEntity: QuestionSummaryEntity): Promise<QuestionSummaryEntity | any> {
    try {
      const questionSummaryUpdated = await this.questionSummaryRepository.save(questionSummaryEntity);

      return questionSummaryUpdated;
    } catch (error) {
      return;
    }
  }

  async delete(questionSummaryEntity: QuestionSummaryEntity): Promise<QuestionSummaryEntity | any> {
    try {
      const questionSummaryDeleted = await this.questionSummaryRepository.remove(questionSummaryEntity);

      return questionSummaryDeleted;
    } catch (error) {
      return;
    }
  }

  async saveMany(questionSummarysEntity: QuestionSummaryEntity[]): Promise<QuestionSummaryEntity[] | any> {
    try {
      const questionSummarysCreated = await this.questionSummaryRepository.save(questionSummarysEntity);

      return questionSummarysCreated;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  
}
