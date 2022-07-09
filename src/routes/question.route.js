const express = require('express');
const router = express.Router();
let {deleteQuestion,updateQuestion,createQuestion,getAllQuestion} = require('../controllers/question.controller')

const {checkAuth , checkAdmin} = require('../middleware/auth');
router.get('/:quizId',getAllQuestion)
router.use(checkAuth)
router.use(checkAdmin)

router.post('/:quizId/questions',createQuestion );


router.put('/:quizId/questions/:id',updateQuestion);

router.delete('/:quizId/questions/:id',deleteQuestion);

module.exports = router;