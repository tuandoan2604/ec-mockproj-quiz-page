import { QuestionEntity } from "../../entities/question.entity";
import { QuestionDTO } from "../dtos/question.dto";

/**
 * An Question mapper object.
 */
export class QuestionMapper {
  static fromDTOtoEntity(questionDTO: QuestionDTO | any): QuestionEntity | any{
    if (!questionDTO) {
      return;
    }
    let questionEntity: any = new QuestionEntity();
    const fields = Object.getOwnPropertyNames(questionDTO);
    fields.forEach((field) => {
        questionEntity[field] = questionDTO[field];
    });
    return questionEntity;
  }

  static fromEntityToDTO(questionEntity: QuestionEntity | any): QuestionDTO | any {
    if (!questionEntity) {
      return;
    }
    let questionDTO: any = new QuestionDTO();

    const fields = Object.getOwnPropertyNames(questionEntity);

    fields.forEach((field) => {
      questionDTO[field] = questionEntity[field];
    });

    return questionDTO;
  }
}
