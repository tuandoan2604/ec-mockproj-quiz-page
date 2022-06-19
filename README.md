
I. Run API 
Dowload the the full folder, insall PostGreSQL DB. Creat a schema name "User", then create 3 table "User"( store user name, password and user ID), "Question" (store Question with choice A,B,C,D and the corrected answer). Password for current DB is Ha2101994. 

To run the API, using command " go run main.go"

II. Explain the API 
1. Login 

to Login, using send a Post request with Username and Password to "localhost:8080/login" (Username and password send in Post body using x-www-form-urlencode)
API will answer with UserID and token, refresh token. Token will expire after 1 hour, after that, have to use refresh token. 

2. Get the question and choice
send GET request to "localhost:8080/question/:number" (:number is the question number).
ex: "localhost/question/1" to get the first question and the choice. 

API will answer with Question and all the Choice

3. Get the point of user 
send GET request to "localhost/point/:id" (:id is the UserID, get UserID when user login)
ex: "localhost:8080/point/:1" get the point of the user with UserID :1 

4. To send the user answer 
send Post request to "localhost/question/?id=&quest=&ans"
ex: "localhost:8080/question/?id=1&quest=2&ans=A" is user (userID) 1 chose answer A of question 2

5. To get the correct answer
send GET request to "localhost:8080/question/ans" to get the correct answer of all the question. 

all the action (send and get answer of API) will be store in the "out.log" file in the main folder. 
