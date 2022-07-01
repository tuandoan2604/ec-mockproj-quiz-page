const { Quiz, Question,  } = require('../config/db');

// tách file service


let indexQuiz = async (req, res) => {
    const quizzes = await Quiz.findAll();
    return res.status(200).json({
        message: "Get quizzes successfully",
        status: 200,
        quizzes
    })
};

let createQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.create({
            title: req.body.title,
        });
        return res.status(200).json({
            message: "Create quizz successfully",
            status: 200,
            error: false,
        })

    } catch (err) {
        return res.status(400).json({
            message: "err",
            status: 400,
            error: true,

        })

    }
}

let chooseQuiz = async (req, res) => {
    const id = req.params.id;
    const quiz = await Quiz.findByPk(id, {
        include: {
            model: Question,
            where: { id: id },
            required: false
        }
    });
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
        const quiz = await Quiz.findOne({ where: { id: req.params.id } });
        if (!quiz) 
        return res.status(404).json({
            message: "Quizz not found",
            status: 404,
            error: true,

        })
        const updated_quiz = await quiz.update({
            title: req.body.title
        });
        res.send(updated_quiz);
    } catch (err) {
        return res.status(400).json({
            message: "Quizz not found",
            status: 404,
            error: true,

        })
    }
}

let deleteQuiz = async (req, res) => {
    const quiz = await Quiz.findOne({ where: { id: req.params.id } });
    if (!quiz) return res.status(404).send('Quiz ID not found');

    await quiz.destroy(); 
    return res.status(200).json({
        message: "Delete successfully",
        status: 200,
        error: false,

    })
}

module.exports = {
    indexQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    chooseQuiz
};