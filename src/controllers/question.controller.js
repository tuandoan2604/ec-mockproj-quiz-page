const { Question, Quiz } = require('../config/db');

let getAllQuestion = async (req, res) => {
  const questions = await Question.findAll({
    where: { id: req.params.quizId }
  });
  return res.status(200).json({
    message: "Get question successfully",
    status: 200,
    questions
})
}

let createQuestion = async (req, res) => {
    try {
      console.log(req.params.quizId);
      const question = await Question.create({
        quizId: req.params.quizId,
        quiz_id: req.params.quizId,
        question: req.body.question,
        answer: req.body.answer
      });
      return res.status(200).json({
        message: "Create question successfully",
        status: 200,
        question
    })
    } catch (err) {
      res.status(400).send(err);
    }
  }

let updateQuestion = async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  if (!question) {
    return res.status(404).send('Question with submitted ID not found');
  }
  try {
    const updated_question = await question.update({
      question: req.body.question,
      answer: req.body.answer
    });
    return res.status(200).json({
      message: "Update question successfully",
      status: 200,
      updated_question
  })
  } catch(err) {
    return res.status(400).json({
      message: err,
      status: 400,
  })
  }
}

let deleteQuestion = async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  if (!question) {
    return res.status(404).json({
      message: "ID not found",
      status: 404,
  })

  }
  await question.destroy();
  return res.status(200).json({
    message: "Delete question successfully",
    status: 200,
    
})
}

module.exports = {
  deleteQuestion,
  updateQuestion,
  createQuestion,
  getAllQuestion
};