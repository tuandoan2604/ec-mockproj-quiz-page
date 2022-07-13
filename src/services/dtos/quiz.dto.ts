import { BaseDTO } from "./base/base.dto";
import { QuestionDTO } from "./question.dto";
import { UserDTO } from "./user.dto";

/**
 * An Quiz DTO object.
 */
export class QuizDTO extends BaseDTO {
  code: string;
  name?: string;
  creator?: UserDTO;
  questions?: QuestionDTO[];
}
