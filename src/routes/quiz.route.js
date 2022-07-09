const express = require('express');
const router = express.Router();
var {indexQuiz,chooseQuiz, createQuiz, updateQuiz,deleteQuiz} = require('../controllers/quiz.controller');
const {checkAuth , checkAdmin} = require('../middleware/auth');

router.use(checkAuth)
router.use(checkAdmin)

router.get('/:id',chooseQuiz)
router.get('/',indexQuiz)


router.post('/docreate', createQuiz )
router.put('/:id', updateQuiz)
router.delete('/:id',deleteQuiz)


module.exports = router
