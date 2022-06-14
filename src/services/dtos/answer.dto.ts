import { BaseDTO } from "./base/base.dto";
import { QuestionDTO } from "./question.dto";

/**
 * An Question DTO object.
 */
export class AnswerDTO extends BaseDTO {
  name: string;
  isCorrect: boolean;
  question?: QuestionDTO;
}
