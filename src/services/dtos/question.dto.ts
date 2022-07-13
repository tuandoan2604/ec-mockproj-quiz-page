import { AnswerDTO } from "./answer.dto";
import { BaseDTO } from "./base/base.dto";
import { QuizDTO } from "./quiz.dto";

/**
 * An Question DTO object.
 */
export class QuestionDTO extends BaseDTO {
  name: string;
  isMutiple: boolean;
  quiz?: QuizDTO;
  answers?: AnswerDTO[];
}
