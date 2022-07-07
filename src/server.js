const express = require("express");
const app = express();
var bodyParser = require('body-parser')
var path = require('path');
require("dotenv").config()


var pathh = path.resolve(__dirname,'public');
app.use(express.static(pathh));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

const AccountRoutes = require('./routes/account')
const QuizzRoutes = require('./routes/quiz.route')
const QuestionRoutes = require('./routes/question.route')
const UserQuizRoutes = require('./routes/user_quizz')
// const UserAnswerRoutes = require('./routes/user_answer')


app.use('/account',AccountRoutes)
app.use('/quizz',QuizzRoutes)
app.use('/questions/',QuestionRoutes)
app.use('/user_quizz/',UserQuizRoutes)
// app.use('/user-answers/',UserAnswerRoutes)



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

