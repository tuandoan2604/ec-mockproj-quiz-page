package controller

import (
	"Quiz/model"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func CheckError(err error) {
	if err != nil {
		panic(err)
	}
}

////GET Question /////
func GetQuestion(c *gin.Context) {

	db, err := model.ConnectDataBase()
	CheckError(err)

	number := c.Param("number")
	rows, err := db.Query(`SELECT "Question", "Answer", "A", "B"  FROM "User"."Question" WHERE "Id" = $1`, number)
	CheckError(err)
	//defer rows.Close)
	for rows.Next() {
		var Question string
		var Answer string
		var A string
		var B string
		err = rows.Scan(&Question, &Answer, &A, &B)
		//CheckError(err)

		fmt.Println(Question, Answer, A, B)

		c.JSON(http.StatusOK, gin.H{"Question": Question, "Answer": Answer, "Choice": gin.H{"A": A, "B": B}})
	}
}
