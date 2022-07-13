import { QuizRepository } from "../../repositories/quiz.repository";
import { UserDTO } from "../dtos/user.dto";

export class ToDoQuizService {
  constructor(private readonly quizRepository = new QuizRepository()) {}

  public createSampleData = async (quizSampleData: any, creator: UserDTO): Promise<any> => {
    try {
      const sampleDataCreated = await this.quizRepository.saveSampleData(quizSampleData, creator);

      if (!sampleDataCreated) {
        return;
      }

      return sampleDataCreated;
    } catch (error) {
      return;
    }
  };
}
