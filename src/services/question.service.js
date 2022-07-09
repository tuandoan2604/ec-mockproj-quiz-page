const { Question, Quiz } = require('../config/db');

let findAllQuestion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const questions = await Question.findAll({
                where: { id: data }
            });
            if (questions) {
                resolve(questions)
            }
        } catch (error) {
            reject(error)
        }
    })

}

let createNewQuestion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const question = await Question.create({
                quizId: data.quizId,
                quiz_id: data.quizId,
                question: data.question,
                answer: data.answer
            });
            if (question) {
                resolve(question)
            }
        } catch (error) {
            reject(error)
        }
    })

}

let doUpdateQuestion = (data1, data2) => {
    return new Promise(async (resolve, reject) => {
        try {
            const question = await Question.findByPk(data1);
            console.log(question);
            if (question) {
                question.set({
                    question: data2.question,
                    answer: data2.answer
                })
                await question.save()
                resolve(question)


            }

        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

let destroyQuestion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const question = await Question.findByPk(data);
            await question.destroy();

            resolve()
        } catch (error) {
            reject(error)
        }
        
    })
  }
module.exports = {
    findAllQuestion,
    createNewQuestion,
    doUpdateQuestion,
    destroyQuestion
}