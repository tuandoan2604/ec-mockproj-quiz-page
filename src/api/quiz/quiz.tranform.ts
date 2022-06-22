import _ from 'lodash';
import { Option } from '@biz/option/Option';
import { Question } from '@biz/question/Question';
import { Quiz } from '@biz/quiz/Quiz';
import { User } from '@biz/user/User';
import { OptionDTO, QuestionDTO, QuizDTO, UserChooseOptionDTO, UserTakeQuizDTO } from './quiz.dto';
import { generateUUIDV4 } from 'src/utils/helper';
import { UserTakeQuiz } from '@biz/userTakeQuiz/UserTakeQuiz';
import { UserChooseOption } from '@biz/userChooseOption/UserChooseOption';
import { HttpException, HttpStatus, Req } from '@nestjs/common';

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

export class UserTakeQuizTranform {
  static getMapDataQuiz = (quizDTO: QuizDTO) => {
    const mapQuestionDetail = new Map<string, QuestionDTO>();
    const mapOptionDetail = new Map<string, OptionDTO>();
    _.forEach(quizDTO.questions, question => {
      mapQuestionDetail.set(question.id, question);
      _.forEach(question.options, option => {
        mapOptionDetail.set(`${option.id}.${question.id}`, option);
      });
    });
    return { mapQuestionDetail, mapOptionDetail };
  };
  public static toUserTakeQuizEntity(userTakeQuizDTO: UserTakeQuizDTO, userId: number, quiz: Quiz) {
    const quizDTO = QuizTranform.toQuizDTO(quiz);
    const { mapQuestionDetail, mapOptionDetail } = this.getMapDataQuiz(quizDTO);

    const user = new User();
    const userTakeQuiz = new UserTakeQuiz();
    user.id = userId;
    userTakeQuiz.id = generateUUIDV4();
    userTakeQuiz.userCreate = user;
    userTakeQuiz.createdAt = new Date();
    userTakeQuiz.quiz = quiz;

    const listUserChooseOption: UserChooseOption[] = [];
    let totalScore = 0;
    _.forEach(userTakeQuizDTO.questions, question => {
      const questionId = question.id;
      if (_.isNil(questionId)) throw new HttpException('question id is missing', HttpStatus.BAD_REQUEST);
      const detailQuestion = mapQuestionDetail.get(questionId);
      // co detail question da luu thi moi xet tiep
      if (!detailQuestion) throw new HttpException('question id is invalid', HttpStatus.BAD_REQUEST);
      // tinh diem cho 1 cau hoi khi: tat ca cac phuong an da chon deu dung AND tong so phuong an chon == tong so phuong an dung
      let countChoise = 0;
      let checkCorrect = true;
      let countCorrect = 0;

      _.forEach(detailQuestion.options, option => {
        if (option.isCorrect == true) countCorrect += 1;
      });
      _.forEach(question.options, option => {
        const optionId = option.id;
        if (_.isNil(optionId)) throw new HttpException('option id is missing', HttpStatus.BAD_REQUEST);
        const detailOption = mapOptionDetail.get(`${optionId}.${questionId}`);
        if (!detailQuestion) throw new HttpException('option id is invalid', HttpStatus.BAD_REQUEST);
        if (option.isChose == true) {
          countChoise += 1;
          checkCorrect = checkCorrect && detailOption.isCorrect == true;
          detailOption.isChose = true;
          listUserChooseOption.push(this.toUserChooseOptionEntity(userTakeQuiz, option.id));
        }
      });
      if (countChoise == countCorrect && checkCorrect == true) {
        totalScore += 1;
        detailQuestion.isHasPoint = true;
      }
    });
    userTakeQuiz.totalScore = totalScore;
    return { userTakeQuiz, listUserChooseOption, quizDTO };
  }
  public static toUserChooseOptionEntity(userTakeQuiz: UserTakeQuiz, optionId: string) {
    const userChooseOption = new UserChooseOption();
    const option = new Option();
    option.id = optionId;
    userChooseOption.id = generateUUIDV4();
    userChooseOption.userCreate = userTakeQuiz.userCreate;
    userChooseOption.userTakeQuiz = userTakeQuiz;
    userChooseOption.option = option;
    return userChooseOption;
  }
}
