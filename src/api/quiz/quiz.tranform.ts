import _ from 'lodash';
import { Option } from '@biz/option/Option';
import { Question } from '@biz/question/Question';
import { Quiz } from '@biz/quiz/Quiz';
import { User } from '@biz/user/User';
import { OptionDTO, QuestionDTO, QuizDTO } from './quiz.dto';
import { generateUUIDV4 } from 'src/utils/helper';

export class QuizTranform {
  public static toQuizEntity(quizDTO: QuizDTO, userId: number) {
    const quiz = new Quiz();
    const userCreate = new User();
    const listQuestion: Question[] = [];
    let listOption: Option[] = [];
    userCreate.id = userId;
    quiz.id = quizDTO.id || generateUUIDV4();
    quiz.content = quizDTO.content;
    quiz.createdAt = quizDTO.createAt || new Date();
    quiz.updatedAt = new Date();
    quiz.userCreate = userCreate;
    for (let i = 0; i < quizDTO.questions.length; i++) {
      const questionDTO = quizDTO.questions[i];
      const { question, listOption: listOptionOfQuestion } = QuestionTranform.toQuestionEntity(questionDTO, userCreate, quiz, i);
      listQuestion.push(question);
      listOption = _.concat(listOption, listOptionOfQuestion);
    }
    return { quiz, listQuestion, listOption };
  }
  public static toQuizDTO(quiz: Quiz) {
    const quizDTO = new QuizDTO();
    quizDTO.id = quiz.id;
    quizDTO.content = quiz.content;
    quizDTO.questions = _.map(quiz.questions, ques => {
      return QuestionTranform.toQuestionDTO(ques);
    });
    quizDTO.createAt = quiz.createdAt;
    return quizDTO;
  }
}

export class QuestionTranform {
  public static toQuestionEntity(questionDTO: QuestionDTO, userCreate: User, quiz: Quiz, order: number) {
    const question = new Question();
    question.id = questionDTO.id || generateUUIDV4();
    question.content = questionDTO.content;
    question.order = questionDTO.order;
    question.type = questionDTO.type;
    question.quiz = quiz;
    question.userCreate = userCreate;
    question.order = _.isNil(order) ? questionDTO.order : order;
    const listOption: Option[] = [];
    for (let i = 0; i < questionDTO.options.length; i++) {
      const option = questionDTO.options[i];
      listOption.push(OptionTranform.toOptionEntity(option, userCreate, question, i));
    }
    return { question, listOption };
  }
  public static toQuestionDTO(question: Question) {
    const questionDTO = new QuestionDTO();
    questionDTO.id = question.id;
    questionDTO.content = question.content;
    questionDTO.order = question.order;
    questionDTO.type = question.type;
    questionDTO.options = _.map(question.options, option => {
      return OptionTranform.toOptionDTO(option);
    });
    return questionDTO;
  }
}

export class OptionTranform {
  public static toOptionEntity(optionDTO: OptionDTO, userCreate: User, question: Question, order: number) {
    const option = new Option();
    option.id = optionDTO.id || generateUUIDV4();
    option.content = optionDTO.content;
    option.order = _.isNil(order) ? optionDTO.order : order;
    option.isCorrect = optionDTO.isCorrect;
    option.question = question;
    option.userCreate = userCreate;
    return option;
  }
  public static toOptionDTO(option: Option) {
    const optionDTO = new OptionDTO();
    optionDTO.id = option.id;
    optionDTO.content = option.content;
    optionDTO.order = option.order;
    optionDTO.isCorrect = option.isCorrect;
    return optionDTO;
  }
}
