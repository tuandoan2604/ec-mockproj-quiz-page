import { QuizEntity } from "../../entities/quiz.entity";
import { QuizDTO } from "../dtos/quiz.dto";

/**
 * An Quiz mapper object.
 */
export class QuizMapper {
  static fromDTOtoEntity(quizDTO: QuizDTO | any): QuizEntity | any{
    if (!quizDTO) {
      return;
    }
    let quizEntity: any = new QuizEntity();
    const fields = Object.getOwnPropertyNames(quizDTO);
    fields.forEach((field) => {
        quizEntity[field] = quizDTO[field];
    });
    return quizEntity;
  }

  static fromEntityToDTO(quizEntity: QuizEntity | any): QuizDTO | any {
    if (!quizEntity) {
      return;
    }
    let quizDTO: any = new QuizDTO();

    const fields = Object.getOwnPropertyNames(quizEntity);

    fields.forEach((field) => {
      quizDTO[field] = quizEntity[field];
    });

    return quizDTO;
  }
}
