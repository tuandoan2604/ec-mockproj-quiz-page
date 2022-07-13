import { QuizSummaryEntity } from "../../entities/quiz-summary.entity";
import { QuizSummaryDTO } from "../dtos/quiz-summary.dto";

/**
 * An Quiz Summary mapper object.
 */
export class QuizSummaryMapper {
  static fromDTOtoEntity(quizSummaryDTO: QuizSummaryDTO | any): QuizSummaryEntity | any{
    if (!quizSummaryDTO) {
      return;
    }
    let quizSummaryEntity: any = new QuizSummaryEntity();
    const fields = Object.getOwnPropertyNames(quizSummaryDTO);
    fields.forEach((field) => {
        quizSummaryEntity[field] = quizSummaryDTO[field];
    });
    return quizSummaryEntity;
  }

  static fromEntityToDTO(quizSummaryEntity: QuizSummaryEntity | any): QuizSummaryDTO | any {
    if (!quizSummaryEntity) {
      return;
    }
    let quizSummaryDTO: any = new QuizSummaryDTO();

    const fields = Object.getOwnPropertyNames(quizSummaryEntity);

    fields.forEach((field) => {
      quizSummaryDTO[field] = quizSummaryEntity[field];
    });

    return quizSummaryDTO;
  }
}
