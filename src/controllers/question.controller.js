const { Question, Quiz } = require('../config/db');
let { findAllQuestion, createNewQuestion ,doUpdateQuestion, destroyQuestion } = require('../services/question.service')
const {customError} = require('../ultilities/customErr')
const errHandel = require('../middleware/errorHandle')

let getAllQuestion = errHandel(async (req, res) => {
  let quizId = req.params.quizId
  const questions = await findAllQuestion(quizId)
  return res.status(200).json({
    message: "Get question successfully",
    status: 200,
    questions
  })
})

let createQuestion = errHandel( async (req, res) => {
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

    }else{
    const error = new customError('create Question fail',400)
            return res.status(error.statusCode).json({
                message: error.message,
                error: true
            })
    }
  
})

let updateQuestion = errHandel(async (req, res) => {
 
    let data1 = req.params.id
    let data2 = {
      question : req.body.question,
      answer : req.body.answer
    }
    const updated_question = await doUpdateQuestion(data1, data2)
    if(updated_question){
      return res.status(200).json({
        message: "Update question successfully",
        status: 200,
        updated_question
      })
    }else{
      const error = new customError('Update Question fail',400)
            return res.status(error.statusCode).json({
                message: error.message,
                error: true
            })

    }


  
})

let deleteQuestion = errHandel(async (req, res) => {
    const question = await destroyQuestion(req.params.id);
    if (question) {
      return res.status(200).json({
        message: "Delete question successfully",
        status: 200,
      })
    } else {
      const error = new customError('ID not found',404)
            return res.status(error.statusCode).json({
                message: error.message,
                error: true
            })
    }
})

module.exports = {
  deleteQuestion,
  updateQuestion,
  createQuestion,
  getAllQuestion
};