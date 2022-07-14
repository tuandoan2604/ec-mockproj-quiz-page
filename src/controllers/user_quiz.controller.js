const { customError } = require('../ultilities/customErr')
const errHandel = require('../middleware/errorHandle')
const { UserQuiz, UserAnswer, Quiz, sequelize } = require('../config/db');

let getAllUserQuiz = errHandel(async (req, res) => {
  const user_quizzes = await UserQuiz.findAll();
  if (user_quizzes) {
    res.send(user_quizzes);
  } else {
    const error = new customError('Not found', 404)
    return res.status(error.statusCode).json({
      message: error.message,
      error: true
    })
  }
})

let createUserQuiz = errHandel(async (req, res) => {
  let user_quiz = UserQuiz.build({
    score: req.score,
    userId: req.user.id,
    quizId: req.params.id
  });
  return sequelize.transaction(t => {
    return user_quiz.save({ transaction: t }).then(uq => {
      // console.log(uq.userId);
      if (req.body.user_answers.length) {
        req.body.user_answers.forEach(a => { a.user_quiz_id = uq.id, a.userQuizId = uq.id, a.questionId = a.question_id });
        console.log(req.body.user_answers);
        return UserAnswer.bulkCreate(req.body.user_answers, { transaction: t });
      }
      return user_quiz;
    });
  }).then(result => {
    return res.status(200).json({
      message: "Create UserQuiz successfully",
      status: 200,
      user_quiz,
      // answer
    })
  }).catch(err => {
    const error = new customError('Create user-quizz fail', 400)
    return res.status(error.statusCode).json({
      message: error.message,
      error: true
    })
  });
})

let chooseUserQuiz = errHandel(async (req, res) => {
  const user_quiz_id = req.params.id;
  const user_quiz = await UserQuiz.findByPk(user_quiz_id, {
    include: {
      model: UserAnswer,
      where: { userQuizId: user_quiz_id },
      required: false
    }
  });
  if (!user_quiz) {
    const error = new customError('ID not found', 404)
    return res.status(error.statusCode).json({
      message: error.message,
      error: true
    })
  } else {
    res.send(user_quiz);
  }

})


let deleteUserQuiz = errHandel(async (req, res) => {
  const user_quiz = await UserQuiz.findOne({ where: { id: req.params.id } });
  if (!user_quiz) {
    const error = new customError('UserQuiz ID not found', 404)
    return res.status(error.statusCode).json({
      message: error.message,
      error: true
    })
  } else {
    await user_quiz.destroy();
    res.send(user_quiz);
  }
})



module.exports = {
  deleteUserQuiz,
  createUserQuiz,
  getAllUserQuiz,
  chooseUserQuiz
};