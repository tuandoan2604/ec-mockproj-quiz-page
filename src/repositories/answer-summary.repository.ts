import { EntityRepository } from "typeorm";
import { AnswerSummaryEntity } from "../entities/answer-summary.entity";
import { AppDataSource } from "../data-source";
import { UserEntity } from "../entities/user.entity";

@EntityRepository()
export class AnswerSummaryRepository {
  constructor(
    private readonly answerSummaryRepository = AppDataSource.getRepository(AnswerSummaryEntity)
  ) {}

  async find(): Promise<AnswerSummaryEntity[] | any> {
    try {
      return await this.answerSummaryRepository.find();
    } catch (error) {
      return;
    }
  }

  async findOne(id: number): Promise<AnswerSummaryEntity | any> {
    try {
      return await this.answerSummaryRepository.findOne({ where: { id } });
    } catch (error) {
      return;
    }
  }

  async save(answerSummaryEntity: AnswerSummaryEntity): Promise<AnswerSummaryEntity | any> {
    try {
      const answerSummaryCreated = await this.answerSummaryRepository.save(answerSummaryEntity);

      return answerSummaryCreated;
    } catch (error) {
      return;
    }
  }

  async update(answerSummaryEntity: AnswerSummaryEntity): Promise<AnswerSummaryEntity | any> {
    try {
      const answerSummaryUpdated = await this.answerSummaryRepository.save(answerSummaryEntity);

      return answerSummaryUpdated;
    } catch (error) {
      return;
    }
  }

  async delete(answerSummaryEntity: AnswerSummaryEntity): Promise<AnswerSummaryEntity | any> {
    try {
      const answerSummaryDeleted = await this.answerSummaryRepository.remove(answerSummaryEntity);

      return answerSummaryDeleted;
    } catch (error) {
      return;
    }
  }
  
  async saveMany(answerSummarysEntity: AnswerSummaryEntity[]): Promise<AnswerSummaryEntity[] | any> {
    try {
      const answerSummarysCreated = await this.answerSummaryRepository.save(answerSummarysEntity);

      return answerSummarysCreated;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async findAnswersToDo(questionSummaryId: number, userId: number): Promise<AnswerSummaryEntity[] | any> {
    try {
      const answersSummaryFound = await this.answerSummaryRepository.find({
        where: {
          questionSummary: {
            id: questionSummaryId,
          },
          user: {
            id: userId,
          }
        }
      })

      return answersSummaryFound;
    } catch (error) {
      return;
    }
  }
}
