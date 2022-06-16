import { AnswerSummaryEntity } from "../../entities/answer-summary.entity";
import { AnswerSummaryDTO } from "../dtos/answer-summary.dto";

/**
 * An Answer Summary mapper object.
 */
export class AnswerSummaryMapper {
  static fromDTOtoEntity(answerSummaryDTO: AnswerSummaryDTO | any): AnswerSummaryEntity | any{
    if (!answerSummaryDTO) {
      return;
    }
    let answerSummaryEntity: any = new AnswerSummaryEntity();
    const fields = Object.getOwnPropertyNames(answerSummaryDTO);
    fields.forEach((field) => {
        answerSummaryEntity[field] = answerSummaryDTO[field];
    });
    return answerSummaryEntity;
  }

  static fromEntityToDTO(answerSummaryEntity: AnswerSummaryEntity | any): AnswerSummaryDTO | any {
    if (!answerSummaryEntity) {
      return;
    }
    let answerSummaryDTO: any = new AnswerSummaryDTO();

    const fields = Object.getOwnPropertyNames(answerSummaryEntity);

    fields.forEach((field) => {
      answerSummaryDTO[field] = answerSummaryEntity[field];
    });

    return answerSummaryDTO;
  }
}
