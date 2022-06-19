package controller

import (
	"Quiz/auth"
	"Quiz/model"
	"Quiz/service"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func CheckError(err error) {
	if err != nil {
		panic(err)
	}
}

var jwtService auth.JWTService = auth.JWTAuthService()
var loginController service.LoginController = service.LoginHandler(jwtService)

//// Post Login ///
func PostLogin(c *gin.Context) {
	db, _ := model.ConnectDataBase()
	Username := c.PostForm("username")
	Password := c.PostForm("password")

	isUserAuthenticated := false

	var password string
	var id int
	row, _ := db.Query(`SELECT "Password", "Id" FROM "User"."User" WHERE "Username" = $1`, Username)
	for row.Next() {

		row.Scan(&password, &id)
		if password == Password {
			isUserAuthenticated = true
		}
	}
	var status string
	if isUserAuthenticated {
		token, refreshToken := loginController.Login(c)
		status = "success"

		c.JSON(http.StatusOK, gin.H{"Status": status, "token": token, "refreshToken": refreshToken, "UserId": id})
		//tocken = auth.JWTService.GenerateToken(auth.JWTService, Username, tru)
	} else {
		//token = ""
		status = "error"
		c.JSON(http.StatusUnauthorized, gin.H{"status": status, "tocken": nil})
	}
}

////GET Question /////
func GetQuestion(c *gin.Context) {
	db, err := model.ConnectDataBase()
	CheckError(err)

	number := c.Param("number")
	rows, err := db.Query(`SELECT "Question", "A", "B"  FROM "User"."Question" WHERE "Id" = $1`, number)
	CheckError(err)
	//defer rows.Close(
	for rows.Next() {
		var Question string
		var A string
		var B string
		rows.Scan(&Question, &A, &B)
		//CheckError(err)

		fmt.Println(Question, A, B)

		c.JSON(http.StatusOK, gin.H{"Question": Question, "Choice": gin.H{"A": A, "B": B}})
	}

}

////GET the correct answer ////

func GetQuestionAnswer(c *gin.Context) {
	db, err := model.ConnectDataBase()
	CheckError(err)

	row, err := db.Query(`SELECT "Question", "Answer" FROM "User"."Question" `)
	CheckError(err)

	for row.Next() {
		var question string
		var answer string

		row.Scan(&question, &answer)

		c.JSON(http.StatusOK, gin.H{"Question": question, "Answer": answer})
	}
}

////GET Point of User ////

func GetPoint(c *gin.Context) {
	db, err := model.ConnectDataBase()
	CheckError(err)
	userID := c.Param("id")
	CheckError(err)
	row, err := db.Query(`SELECT "Point" FROM "User"."UserAnswer" WHERE "UserId" =$1`, userID)
	CheckError(err)
	point := 0

	for row.Next() {
		var p int
		row.Scan(&p)
		if p == 1 {
			point++
		}
	}
	fmt.Println("point: ", point)
	c.JSON(http.StatusOK, gin.H{"UserId": userID, "Point": point})
}

////Post Answer from User ////

func PostQuestion(c *gin.Context) {
	db, err := model.ConnectDataBase()
	CheckError(err)

	userId := c.Query("id")
	question, _ := strconv.Atoi(c.Query("quest"))
	answer := c.Query("ans")
	time := time.Now().Format("2006-01-02 15:04:05")

	var point int
	//time := time.Now().Format("2020.16.06 14:29:00")
	fmt.Println(userId, question, answer, time)

	row, _ := db.Query(`SELECT "Answer" FROM "User"."Question" WHERE "Id" = $1`, question)

	for row.Next() {
		var a string
		row.Scan(&a)

		fmt.Println("a", a)
		if a == answer {
			point = 1
		} else {
			point = 0
		}
	}

	row, err = db.Query(`SELECT "UserId", "Question" FROM "User"."UserAnswer" WHERE "UserId" = $1 AND "Question" = $2`, userId, question)
	CheckError(err)
	b := 0
	for row.Next() {
		b++
	}

	fmt.Println("b", b)

	if b != 0 {
		update := `UPDATE "User"."UserAnswer" SET "Answer" = $1, "TimeStamp" = $2, "Point" =$3 WHERE "UserId" = $4 AND "Question" = $5 `
		_, e := db.Exec(update, answer, time, point, userId, question)
		CheckError(e)
	} else {
		insert := `insert into "User"."UserAnswer" ("UserId", "Question", "Answer", "TimeStamp", "Point") values($1,$2,$3,$4,$5)`
		_, e := db.Exec(insert, userId, question, answer, time, point)
		CheckError(e)
	}

	fmt.Println(userId, question, answer, time, point)

}
