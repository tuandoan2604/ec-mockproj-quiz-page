import { DataSource, EntityRepository } from "typeorm";
import { QuizEntity } from "../entities/quiz.entity";
import { AppDataSource } from "../data-source";
import { getManager } from "typeorm";
import { QuestionEntity } from "../entities/question.entity";
import { AnswerEntity } from "../entities/answer.entity";
import { UserDTO } from "../services/dtos/user.dto";

@EntityRepository()
export class QuizRepository {
  constructor(
    private readonly quizRepository = AppDataSource.getRepository(QuizEntity) // private readonly queryRunner = AppDataSource.createQueryRunner()
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
      return await this.quizRepository.findOne({ where: { id } });
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
        where: { code: code },
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

  async saveSampleData(quizSampleData: any, creator: UserDTO): Promise<any> {
    try {
      const { code, name, questions } = quizSampleData;

      let quizEntity: QuizEntity = { code, name, creator };
      let questionsEntity: QuestionEntity[] = questions;
      let answersEntity: any = [];

      let isSuccess = false;

      await AppDataSource.manager.transaction(
        async (transactionalEntityManager) => {
          try {
            // Create Quiz
            let quizCreated = await transactionalEntityManager
              .getRepository(QuizEntity)
              .save(quizEntity);

            // Map Question With Quiz Created
            questionsEntity = questionsEntity.map((question) => {
              return {
                ...question,
                quiz: quizCreated,
                createdBy: creator.username,
              };
            });

            // Create Question List
            for (let question of questionsEntity) {
              // Create Single Question
              let questionCreated = await transactionalEntityManager
                .getRepository(QuestionEntity)
                .save(question);

              // Map Answer With Question Created
              let answers: any = question.answers?.map((answer) => {
                return {
                  ...answer,
                  question: {
                    id: questionCreated.id,
                  },
                  createdBy: creator.username,
                };
              });

              answersEntity.push(...answers);

              isSuccess = true;
            }

            // Create Answer List
            await transactionalEntityManager
              .getRepository(AnswerEntity)
              .save(answersEntity);
          } catch (error) {
            return;
          }
        }
      );

      return isSuccess;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async findQuizToDo(id: number): Promise<QuizEntity[] | any> {
    try {
      return await this.quizRepository.findOne({
        where: {
          id: id,
        },
        relations: ["questions", "questions.answers"],
      });
    } catch (error) {
      return;
    }
  }
}
