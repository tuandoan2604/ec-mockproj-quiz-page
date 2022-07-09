const { Question, Quiz } = require('../config/db');
let { findAllQuestion, createNewQuestion ,doUpdateQuestion, destroyQuestion } = require('../services/question.service')
let getAllQuestion = async (req, res) => {
  let quizId = req.params.quizId
  const questions = await findAllQuestion(quizId)
  return res.status(200).json({
    message: "Get question successfully",
    status: 200,
    questions
  })
}

let createQuestion = async (req, res) => {
  try {
    // console.log(req.params.quizId);
    let data = {
      quizId: req.params.quizId,
      quiz_id: req.params.quizId,
      question: req.body.question,
      answer: req.body.answer
    }
    const question = await createNewQuestion(data)
    if (question) {
      return res.status(200).json({
        message: "Create question successfully",
        status: 200,
        question
      })

    }
  } catch (err) {
    res.status(400).send(err);
  }
}

let updateQuestion = async (req, res) => {
  try {
    let data1 = req.params.id
    let data2 = {
      question : req.body.question,
      answer : req.body.answer
    }
    const updated_question = await doUpdateQuestion(data1, data2)
    return res.status(200).json({
      message: "Update question successfully",
      status: 200,
      updated_question
    })
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: err,
      status: 400,
    })
  }
}

let deleteQuestion = async (req, res) => {
  try {
    const question = await destroyQuestion(req.params.id);
    return res.status(200).json({
      message: "Delete question successfully",
      status: 200,
    })
  } catch (error) {
    console.log(error);
      return res.status(404).json({
        message: "ID not found",
        status: 404,
      })
  }
}

module.exports = {
  deleteQuestion,
  updateQuestion,
  createQuestion,
  getAllQuestion
};