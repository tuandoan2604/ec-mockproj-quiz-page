const express = require("express");
const app = express();
var bodyParser = require('body-parser')
var path = require('path');

var pathh = path.resolve(__dirname,'public');
app.use(express.static(pathh));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

const AccountRoutes = require('./routes/account')
const QuizzRoutes = require('./routes/quiz.route')

app.use('/account',AccountRoutes)
app.use('/quizz',QuizzRoutes)




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

