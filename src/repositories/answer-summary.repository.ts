import { EntityRepository } from "typeorm";
import { AnswerSummaryEntity } from "../entities/answer-summary.entity";
import { AppDataSource } from "../data-source";
import { QuizSummaryEntity } from "../entities/quiz-summary.entity";
import { QuestionSummaryEntity } from "../entities/question-summary.entity";

@EntityRepository()
export class AnswerSummaryRepository {
  constructor(
    private readonly answerSummaryRepository = AppDataSource.getRepository(
      AnswerSummaryEntity
    )
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

  async save(
    answerSummaryEntity: AnswerSummaryEntity
  ): Promise<AnswerSummaryEntity | any> {
    try {
      const answerSummaryCreated = await this.answerSummaryRepository.save(
        answerSummaryEntity
      );

      return answerSummaryCreated;
    } catch (error) {
      return;
    }
  }

  async update(
    answerSummaryEntity: AnswerSummaryEntity
  ): Promise<AnswerSummaryEntity | any> {
    try {
      const answerSummaryUpdated = await this.answerSummaryRepository.save(
        answerSummaryEntity
      );

      return answerSummaryUpdated;
    } catch (error) {
      return;
    }
  }

  async delete(
    answerSummaryEntity: AnswerSummaryEntity
  ): Promise<AnswerSummaryEntity | any> {
    try {
      const answerSummaryDeleted = await this.answerSummaryRepository.remove(
        answerSummaryEntity
      );

      return answerSummaryDeleted;
    } catch (error) {
      return;
    }
  }

  async saveMany(
    answerSummarysEntity: AnswerSummaryEntity[]
  ): Promise<AnswerSummaryEntity[] | any> {
    try {
      const answerSummarysCreated = await this.answerSummaryRepository.save(
        answerSummarysEntity
      );

      return answerSummarysCreated;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async findAnswersToDo(
    questionSummaryId: number,
    userId: number
  ): Promise<AnswerSummaryEntity[] | any> {
    try {
      const answersSummaryFound = await this.answerSummaryRepository.find({
        where: {
          questionSummary: {
            id: questionSummaryId,
          },
          user: {
            id: userId,
          },
        },
      });

      return answersSummaryFound;
    } catch (error) {
      return;
    }
  }

  async countNumberOfAnswerCorrectWithIsMutipleFalse(
    quizSummary: QuizSummaryEntity
  ): Promise<number | any> {
    try {
      const numberOfAnswerCorrect = await AppDataSource.createQueryBuilder(
        AnswerSummaryEntity,
        "answer_summary"
      )
        .innerJoin(
          QuestionSummaryEntity,
          "question_summary",
          "answer_summary.questionSummaryId = question_summary.id"
        )
        .where("answer_summary.quizSummaryId = :quizSummaryId", {
          quizSummaryId: quizSummary.id,
        })
        .andWhere("question_summary.isMutiple = false")
        .andWhere("answer_summary.isCorrect = true")
        .andWhere("answer_summary.isSelected = true")
        .getCount();

      return numberOfAnswerCorrect;
    } catch (error) {
      return;
    }
  }

  async findAnwersSummaryOfQuestionIsMutipleTrue(
    quizSummary: QuizSummaryEntity
  ): Promise<number | any> {
    try {
      const anwersSummaryFound = await this.answerSummaryRepository.find({
        where: {
          questionSummary: {
            isMutiple: true,
          }
        },
        relations: ["questionSummary"]
      })

      return anwersSummaryFound;
    } catch (error) {
      return;
    }
  }
}
