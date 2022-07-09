const { Quiz, Question,  } = require('../config/db');

let findAllQuiz =  (data) => {
    return new Promise(async(resolve,reject)=>{
        try {
            const quizzes = await Quiz.findAll();
            resolve(quizzes)
        } catch (error) {
            reject(error)
        }
    })
};

let createNewQuiz =  (data) => {
    return new Promise(async(resolve,reject)=>{
        try {
            const quiz = await Quiz.create({
                title: data,
            })
            resolve(quiz)
        } catch (error) {
            reject(error)
        }
    })
}

let findQuiz = (data) => {
    return new Promise(async(resolve,reject)=>{
        try {
            const quiz = await Quiz.findByPk(data, {
                include: {
                    model: Question,
                    where: { quizId: data },
                    required: false
                }
            })
            resolve(quiz)
        } catch (error) {
            reject(error)
        }
    })
}

let saveQuiz =  (data1, data2) => {
    return new Promise(async(resolve,reject)=>{
        try {
            const quiz = await Quiz.findOne({ where: { id: data1 } });
            if (quiz) {
                quiz.set({
                    title: data2
                });
                await quiz.save()
                resolve(quiz)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let destroyQuiz =  (data) => {
    return new Promise(async(resolve,reject)=>{
        try {
            const quiz = await Quiz.findOne({ where: { id:data } });
            await quiz.destroy(); 
            resolve()
        } catch (error) {
            reject(error)
        }
    })

}


module.exports = {
    findAllQuiz,
    createNewQuiz,
    findQuiz,
    saveQuiz,
    destroyQuiz
}