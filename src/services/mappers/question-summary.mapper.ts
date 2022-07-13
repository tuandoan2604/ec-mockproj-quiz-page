import { QuestionSummaryEntity } from "../../entities/question-summary.entity";
import { QuestionSummaryDTO } from "../dtos/question-summary.dto";

/**
 * An Question Summary mapper object.
 */
export class QuestionSummaryMapper {
  static fromDTOtoEntity(questionSummaryDTO: QuestionSummaryDTO | any): QuestionSummaryEntity | any{
    if (!questionSummaryDTO) {
      return;
    }
    let questionSummaryEntity: any = new QuestionSummaryEntity();
    const fields = Object.getOwnPropertyNames(questionSummaryDTO);
    fields.forEach((field) => {
        questionSummaryEntity[field] = questionSummaryDTO[field];
    });
    return questionSummaryEntity;
  }

  static fromEntityToDTO(questionSummaryEntity: QuestionSummaryEntity | any): QuestionSummaryDTO | any {
    if (!questionSummaryEntity) {
      return;
    }
    let questionSummaryDTO: any = new QuestionSummaryDTO();

    const fields = Object.getOwnPropertyNames(questionSummaryEntity);

    fields.forEach((field) => {
      questionSummaryDTO[field] = questionSummaryEntity[field];
    });

    return questionSummaryDTO;
  }
}
