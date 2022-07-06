const express = require('express');
const router = express.Router();
let {findQuiz,getScore} = require('../middleware/count')
const { UserQuiz, UserAnswer, Quiz, sequelize } = require('../config/db');

let {chooseUserQuiz,deleteUserQuiz,createUserQuiz,getAllUserQuiz} = require('../controllers/user_quiz.controller');


router.get('/', getAllUserQuiz);

router.post('/:id', findQuiz,getScore,createUserQuiz);


router.get('/:id', chooseUserQuiz);


router.delete('/:id', deleteUserQuiz);

module.exports = router;