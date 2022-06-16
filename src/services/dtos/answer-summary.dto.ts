import { BaseDTO } from "./base/base.dto";
import { QuestionSummaryDTO } from "./question-summary.dto";
import { QuestionDTO } from "./question.dto";

/**
 * An Answer Summary DTO object.
 */
export class AnswerSummaryDTO extends BaseDTO {
  name: string;
  isCorrect: boolean;
  isSelected: boolean;
  question?: QuestionSummaryDTO;
}
