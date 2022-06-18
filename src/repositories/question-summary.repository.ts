import { EntityRepository } from "typeorm";
import { QuestionSummaryEntity } from "../entities/question-summary.entity";
import { AppDataSource } from "../data-source";
import { AnswerSummaryEntity } from "../entities/answer-summary.entity";
import { QuizSummaryEntity } from "../entities/quiz-summary.entity";

@EntityRepository()
export class QuestionSummaryRepository {
  constructor(
    private readonly questionSummaryRepository = AppDataSource.getRepository(
      QuestionSummaryEntity
    )
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

  async save(
    questionSummaryEntity: QuestionSummaryEntity
  ): Promise<QuestionSummaryEntity | any> {
    try {
      const questionSummaryCreated = await this.questionSummaryRepository.save(
        questionSummaryEntity
      );

      return questionSummaryCreated;
    } catch (error) {
      return;
    }
  }

  async update(
    questionSummaryEntity: QuestionSummaryEntity
  ): Promise<QuestionSummaryEntity | any> {
    try {
      const questionSummaryUpdated = await this.questionSummaryRepository.save(
        questionSummaryEntity
      );

      return questionSummaryUpdated;
    } catch (error) {
      return;
    }
  }

  async delete(
    questionSummaryEntity: QuestionSummaryEntity
  ): Promise<QuestionSummaryEntity | any> {
    try {
      const questionSummaryDeleted =
        await this.questionSummaryRepository.remove(questionSummaryEntity);

      return questionSummaryDeleted;
    } catch (error) {
      return;
    }
  }

  async saveMany(
    questionSummarysEntity: QuestionSummaryEntity[]
  ): Promise<QuestionSummaryEntity[] | any> {
    try {
      const questionSummarysCreated = await this.questionSummaryRepository.save(
        questionSummarysEntity
      );

      return questionSummarysCreated;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async saveAnswer(
    questionSummary: QuestionSummaryEntity,
    answersSummary: AnswerSummaryEntity[]
  ): Promise<any> {
    let isSaved = false;
    console.log("answersSummary to save: ", answersSummary);
    try {
      await AppDataSource.manager.transaction(
        async (transactionalEntityManager) => {
          try {
            // Save Question Summary
            await transactionalEntityManager
              .getRepository(QuestionSummaryEntity)
              .save(questionSummary);

            // Save Answers Summary
            await transactionalEntityManager
              .getRepository(AnswerSummaryEntity)
              .save(answersSummary);

            isSaved = true;
          } catch (error) {
            ReadableStreamDefaultController;
          }
        }
      );

      return isSaved;
    } catch (error) {
      return;
    }
  }

  async countQuestionByQuiz(
    quizSummary: QuizSummaryEntity
  ): Promise<number | any> {
    try {
      const numberOfQuestion = await this.questionSummaryRepository.count({
        where: {
          quizSummary: {
            id: quizSummary.id,
          },
        },
      });

      return numberOfQuestion;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async findQuestionsSummaryIsMutipleTrue(
    quizSummary: QuizSummaryEntity
  ): Promise<QuestionSummaryEntity[] | any> {
    try {
      const questionsSummary = await this.questionSummaryRepository.find({
        where: {
          quizSummary: {
            id: quizSummary.id,
          },
          isMutiple: true,
        },
        relations: ["answersSummary"],
      });

      return questionsSummary;
    } catch (error) {
      return;
    }
  }
}
