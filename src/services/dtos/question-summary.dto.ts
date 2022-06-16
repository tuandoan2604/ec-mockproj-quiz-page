import { AnswerSummaryDTO } from "./answer-summary.dto";
import { BaseDTO } from "./base/base.dto";
import { QuizSummaryDTO } from "./quiz-summary.dto";

/**
 * An Question Summary DTO object.
 */
export class QuestionSummaryDTO extends BaseDTO {
    name: string;
    isMutiple: boolean;
    status: string;
    quizSummary?: QuizSummaryDTO;
    answersSummary?: AnswerSummaryDTO[];
}
