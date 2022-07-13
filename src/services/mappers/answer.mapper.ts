import { AnswerEntity } from "../../entities/answer.entity";
import { AnswerDTO } from "../dtos/answer.dto";

/**
 * An Answer mapper object.
 */
export class AnswerMapper {
  static fromDTOtoEntity(answerDTO: AnswerDTO | any): AnswerEntity | any{
    if (!answerDTO) {
      return;
    }
    let answerEntity: any = new AnswerEntity();
    const fields = Object.getOwnPropertyNames(answerDTO);
    fields.forEach((field) => {
        answerEntity[field] = answerDTO[field];
    });
    return answerEntity;
  }

  static fromEntityToDTO(answerEntity: AnswerEntity | any): AnswerDTO | any {
    if (!answerEntity) {
      return;
    }
    let answerDTO: any = new AnswerDTO();

    const fields = Object.getOwnPropertyNames(answerEntity);

    fields.forEach((field) => {
      answerDTO[field] = answerEntity[field];
    });

    return answerDTO;
  }
}
