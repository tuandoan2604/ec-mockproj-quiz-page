const express = require('express');
const router = express.Router();
var {indexQuiz,chooseQuiz, createQuiz, updateQuiz,deleteQuiz} = require('../controllers/quiz.controller');
const {checkAuth , checkAdmin} = require('../middleware/auth');


router.get('/',indexQuiz)
router.get('/:id',chooseQuiz)

router.use(checkAdmin)
router.use(checkAuth)

router.post('/docreate', createQuiz )
router.put('/:id', updateQuiz)
router.delete('/:id',deleteQuiz)


module.exports = router
