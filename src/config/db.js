const { Sequelize } = require('sequelize');

const UserModel = require('../models/user');
const UserQuizModel = require('../models/user_quiz');
const UserAnswerModel = require('../models/user_answer');
const QuizModel = require('../models/quiz');
const QuestionModel = require('../models/question');

const sequelize = new Sequelize('mock_1', process.env.NAME, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = UserModel(sequelize, Sequelize);
const UserQuiz = UserQuizModel(sequelize, Sequelize);
const UserAnswer = UserAnswerModel(sequelize, Sequelize);
const Quiz = QuizModel(sequelize, Sequelize);
const Question = QuestionModel(sequelize, Sequelize);

User.hasMany(UserQuiz);
Quiz.hasMany(UserQuiz);
Quiz.hasMany(Question);
UserQuiz.hasMany(UserAnswer);
Question.hasMany(UserAnswer);

sequelize.sync().then(() => {
    console.log("Database and tables created");
});

module.exports = {
    sequelize,
    User,
    Quiz,
    UserQuiz,
    Question,
    UserAnswer,

};