const { Quiz ,Question } = require('../config/db');

async function findQuiz(req, res, next) {
  const quiz_id = req.params.id;
  console.log("id day", quiz_id);
  const quiz = await Quiz.findByPk(quiz_id, {
    include: {
      model: Question,
      where: { quizId: quiz_id },
      required: false
    }
  });
  if (!quiz) {
    return res.status(400).send('Invalid Quiz');
  }
  req.quiz = quiz;
  next();
}
function getScore(req, res, next) {
  let answers = {};
  let count = 0;
  let correct = 0;  
    req.quiz.questions.forEach((question) => {
      count++;
      answers[question.id] = question.answer;
    });
    
    req.body.user_answers.forEach((user_answer) => {
      if (user_answer.answer === answers[user_answer.question_id]) {
        user_answer.correct = true;
        correct++;
      } else {
        user_answer.correct = false;
      }
    });

    const score = correct/count;

    req.score = score;
    next();
  }
  module.exports = {getScore,findQuiz};