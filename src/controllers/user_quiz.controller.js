

const { UserQuiz, UserAnswer, Quiz, sequelize } = require('../config/db');

let getAllUserQuiz =  async (req, res) => {
    const user_quizzes = await UserQuiz.findAll();
    res.send(user_quizzes);
  }

let createUserQuiz = async (req, res) => {
    let user_quiz = UserQuiz.build({
      score: req.score,
      userId: req.user.id,
      quizId: req.params.id
    });
    
    console.log(user_quiz);
    return sequelize.transaction( t => {
      return user_quiz.save({ transaction: t }).then( uq => {
        // console.log(uq.userId);
          if (req.body.user_answers.length) {
            req.body.user_answers.forEach( a => { a.user_quiz_id = uq.id, a.userQuizId = uq.id, a.questionId = a.question_id });
            console.log(req.body.user_answers);
            return UserAnswer.bulkCreate(req.body.user_answers, { transaction: t });
          }
          return user_quiz;
        });
      }).then( result => {
        return res.status(200).json({
          message: "Create UserQuiz successfully",
          status: 200,
          user_quiz,
          // answer
      })
      }).catch( err =>  {
        console.log(err);
        res.status(400).send(err);
      });
  }

  let chooseUserQuiz = async (req, res) => {
    const user_quiz_id = req.params.id;
    const user_quiz = await UserQuiz.findByPk(user_quiz_id, {
      include: {
        model: UserAnswer,
        where: { userQuizId: user_quiz_id },
        required: false
      }
    });
    if (!user_quiz) {
      res.status(404).send(' ID not found');
    } else {
        res.send(user_quiz);
      }
    
  }


let deleteUserQuiz = async (req, res) => {
    const user_quiz = await UserQuiz.findOne({ where: { id: req.params.id } });
    if (!user_quiz) {
      res.status(404).send('UserQuiz ID not found');
    } else {
      await user_quiz.destroy();
      res.send(user_quiz);
    }
  }



module.exports = {
    deleteUserQuiz,
    createUserQuiz,
    getAllUserQuiz,
    chooseUserQuiz
};