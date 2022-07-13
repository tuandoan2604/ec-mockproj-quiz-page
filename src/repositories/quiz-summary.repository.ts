import { EntityRepository } from "typeorm";
import { QuizSummaryEntity } from "../entities/quiz-summary.entity";
import { AppDataSource } from "../data-source";
import { QuizEntity } from "../entities/quiz.entity";
import { UserEntity } from "../entities/user.entity";
import { QuestionSummaryEntity } from "../entities/question-summary.entity";
import { AnswerSummaryEntity } from "../entities/answer-summary.entity";

@EntityRepository()
export class QuizSummaryRepository {
  constructor(
    private readonly quizSummaryRepository = AppDataSource.getRepository(
      QuizSummaryEntity
    )
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
      return await this.quizSummaryRepository.findOne({
        where: { id },
        // relations: ["questionsSummary"],
        relations: ["questionsSummary", "questionsSummary.answersSummary"],
        
      });
    } catch (error) {
      return;
    }
  }

  async save(
    quizSummaryEntity: QuizSummaryEntity
  ): Promise<QuizSummaryEntity | any> {
    try {
      const quizSummaryCreated = await this.quizSummaryRepository.save(
        quizSummaryEntity
      );

      return quizSummaryCreated;
    } catch (error) {
      return;
    }
  }

  async update(
    quizSummaryEntity: QuizSummaryEntity
  ): Promise<QuizSummaryEntity | any> {
    try {
      const quizSummaryUpdated = await this.quizSummaryRepository.save(
        quizSummaryEntity
      );

      return quizSummaryUpdated;
    } catch (error) {
      return;
    }
  }

  async delete(
    quizSummaryEntity: QuizSummaryEntity
  ): Promise<QuizSummaryEntity | any> {
    try {
      const quizSummaryDeleted = await this.quizSummaryRepository.remove(
        quizSummaryEntity
      );

      return quizSummaryDeleted;
    } catch (error) {
      return;
    }
  }

  async findQuizSummaryInprogressByUserAndQuiz(
    userId: any,
    quizId: any
  ): Promise<QuizSummaryEntity | any> {
    try {
      const quizSummaryFound = await this.quizSummaryRepository.findOne({
        where: {
          user: {
            id: userId,
          },
          quiz: {
            id: quizId,
          },
          status: "IN_PROGRESS",
        },
        // relations: ["questionsSummary"],
        relations: ["questionsSummary", "questionsSummary.answersSummary"],
      });

      return quizSummaryFound;
    } catch (error) {
      return;
    }
  }

  public saveQuizToDoSummary = async (
    quizToDo: QuizEntity,
    user: UserEntity
  ): Promise<number | any> => {
    try {
      let quizSummaryCreatedId: any;

      const quizSummaryEntity: any = {
        quiz: {
          id: quizToDo.id,
        },
        user: {
          id: user.id,
        },
        status: "IN_PROGRESS",
        marks: 0,
        grade: 0,
      };

      let questionsSummaryEntity: any = quizToDo.questions;
      let answersSummaryEntity: any = [];

      await AppDataSource.manager.transaction(
        async (transactionalEntityManager) => {
          try {
            // Create Quiz Summary
            let quizSummaryCreated = await transactionalEntityManager
              .getRepository(QuizSummaryEntity)
              .save(quizSummaryEntity);

            quizSummaryCreatedId = quizSummaryCreated.id;

            // Map Question Summary With Quiz Summary Created
            questionsSummaryEntity = questionsSummaryEntity.map(
              (questionSummary: any) => {
                return {
                  ...questionSummary,
                  quizSummary: quizSummaryCreated,
                  user: user,
                  createdBy: user.username,
                };
              }
            );

            // Create Question List
            for (let questionSummary of questionsSummaryEntity) {
              // Create Single Question
              delete questionSummary.id;
              let questionSummaryCreated = await transactionalEntityManager
                .getRepository(QuestionSummaryEntity)
                .save(questionSummary);

              // Map Answer With Question Created
              let answersSummary: any = questionSummary.answers?.map(
                (answerSummary: any) => {
                  return {
                    ...answerSummary,
                    id: null,
                    isSelected: false,
                    quizSummary: quizSummaryCreated,
                    questionSummary: questionSummaryCreated,
                    user: user,
                    createdBy: user.username,
                  };
                }
              );

              answersSummaryEntity.push(...answersSummary);
            }

            // Create Answer Summary List
            await transactionalEntityManager
              .getRepository(AnswerSummaryEntity)
              .save(answersSummaryEntity);
          } catch (error) {
            ReadableStreamDefaultController;
          }
        }
      );

      return quizSummaryCreatedId;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  public findByQuizAndUser = async (
    quizId: number,
    userId: number
  ): Promise<QuizSummaryEntity | any> => {
    try {
      const quizsSummaryFound = await this.quizSummaryRepository.find({
        where: {
          user: {
            id: userId,
          },
          quiz: {
            id: quizId,
          },
        },
      });

      return quizsSummaryFound;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  async countQuestionByQuiz(
    quizSummary: QuizSummaryEntity
  ): Promise<number | any> {
    try {
      const numberOfQuestion = await AppDataSource
      .createQueryBuilder(QuestionSummaryEntity, "question_summary")
      .innerJoin(QuizSummaryEntity, 'quiz_summary', "quiz_summary.id = question_summary.quizSummaryId")
      .where("quiz_summary.id = :id", { id: quizSummary.id })
      .getCount()

      return numberOfQuestion;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
