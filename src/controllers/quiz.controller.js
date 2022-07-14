const { Quiz, Question, } = require('../config/db');
let { findAllQuiz, createNewQuiz, findQuiz, saveQuiz, destroyQuiz } = require('../services/quizz.sercive')
const { customError } = require('../ultilities/customErr')
const errHandel = require('../middleware/errorHandle')

let indexQuiz = errHandel(async (req, res) => {
    const quizzes = await findAllQuiz();
    if (quizzes) {
        return res.status(200).json({
            message: "Get quizzes successfully",
            status: 200,
            quizzes
        })
    } else {
        const error = new customError('Not found', 404)
        return res.status(error.statusCode).json({
            message: error.message,
            error: true
        })
        // return res.status(404).json({
        //     message: "not found",
        //     status: 404,
        //     quizzes
        // })
    }
});

let createQuiz = errHandel(async (req, res) => {
    const data = req.body.title
    const quiz = await createNewQuiz(data)
    if (quiz) {
        return res.status(200).json({
            message: "Create quizz successfully",
            status: 200,
            error: false,
        })
    } else {
        const error = new customError('Create Fail', 404)
        return res.status(error.statusCode).json({
            message: error.message,
            error: true
        })
    }
})

let chooseQuiz = errHandel(async (req, res) => {
    const id = req.params.id
    const quiz = await findQuiz(id);
    if (!quiz) {
        const error = new customError('Quizz not found', 404)
        return res.status(error.statusCode).json({
            message: error.message,
            error: true
        })
    } else {

        res.send(quiz);
    }
})


let updateQuiz = errHandel(async (req, res) => {
    const quiz = await saveQuiz(req.params.id, req.body.title);
    if (quiz) {
        return res.status(200).json({
            message: "Updated Quiz",
            status: 200,
            error: false,

        })
    } else {
        const error = new customError('Update Quizz fail', 400)
        return res.status(error.statusCode).json({
            message: error.message,
            error: true
        })
    }
})

let deleteQuiz = errHandel(async (req, res) => {
    const quiz = await destroyQuiz(req.params.id)
    if (quiz) {
        return res.status(200).json({
            message: "Delete successfully",
            status: 200,
            error: false,
        })
    } else {
        const error = new customError('Delete Quizz fail', 400)
        return res.status(error.statusCode).json({
            message: error.message,
            error: true
        })
    }
})

module.exports = {
    indexQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    chooseQuiz
};