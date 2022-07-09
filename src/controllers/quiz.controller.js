const { Quiz, Question,  } = require('../config/db');
let {findAllQuiz, createNewQuiz, findQuiz, saveQuiz, destroyQuiz} = require('../services/quizz.sercive')

let indexQuiz = async (req, res) => {
    const quizzes = await findAllQuiz();
    if(quizzes){
        return res.status(200).json({
            message: "Get quizzes successfully",
            status: 200,
            quizzes
        })
    }else{
        return res.status(404).json({
            message: "not found",
            status: 404,
            quizzes
        })
    }
};

let createQuiz = async (req, res) => {
    try {
        const data = req.body.title
        const quiz = await createNewQuiz(data)
        if(quiz){
            return res.status(200).json({
                message: "Create quizz successfully",
                status: 200,
                error: false,
            })
        }

    } catch (err) {
        return res.status(400).json({
            message: "err",
            status: 400,
            error: true,

        })

    }
}

let chooseQuiz = async (req, res) => {
    const id = req.params.id
    const quiz = await findQuiz(id);
    if (!quiz) {
        return res.status(404).json({
            message: "Quizz not found",
            status: 404,
            error: true,

        })
    } else {

        res.send(quiz);
    }
}


let updateQuiz = async (req, res) => {
    try {
        const quiz = await saveQuiz(req.params.id, req.body.title);
        if (quiz) 
        return res.status(200).json({
            message: "Updated Quiz",
            status: 200,
            error: false,

        })
    } catch (err) {
        return res.status(400).json({
            message: "Quizz not found",
            status: 404,
            error: true,

        })
    }
}

let deleteQuiz = async (req, res) => {
    try {
        const quiz = await destroyQuiz(req.params.id)
        return res.status(200).json({
            message: "Delete successfully",
            status: 200,
            error: false,
    
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Quizz not found",
            status: 404,
            error: true,

        })
    }
}

module.exports = {
    indexQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    chooseQuiz
};