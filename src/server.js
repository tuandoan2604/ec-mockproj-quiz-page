const express = require("express");
const app = express();

var bodyParser = require('body-parser')
var path = require('path');

var pathh = path.resolve(__dirname,'public');
app.use(express.static(pathh));
app.use(bodyParser.urlencoded({extended:false}));

// var adminRoute = require('./routes/admin.route')

// app.use('/admin', adminRoute);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

