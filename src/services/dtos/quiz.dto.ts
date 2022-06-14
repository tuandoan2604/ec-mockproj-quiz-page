import { BaseDTO } from "./base/base.dto";
import { UserDTO } from "./user.dto";

/**
 * An Quiz DTO object.
 */
export class QuizDTO extends BaseDTO {
  code: string;
  name?: string;
  creator?: UserDTO;
}
