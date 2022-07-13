import { BaseDTO } from "./base/base.dto";
import { QuestionSummaryDTO } from "./question-summary.dto";
import { QuestionDTO } from "./question.dto";
import { QuizDTO } from "./quiz.dto";
import { UserDTO } from "./user.dto";

/**
 * An Quiz Summary DTO object.
 */
export class QuizSummaryDTO extends BaseDTO {
    status: string;
    marks?: number;
    grade?: number;
    user?: UserDTO;
    quiz?: QuizDTO;
    questionsSummary?: QuestionSummaryDTO[];
}
