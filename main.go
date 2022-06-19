package main

import (
	"Quiz/auth"
	"Quiz/controller"

	"github.com/gin-gonic/gin"
)

func main() {

	//db, err := model.ConnectDataBase()

	router := gin.Default()

	router.POST("/login", controller.PostLogin)

	router.GET("question/:number", auth.AuthorizeJWT(), controller.GetQuestion)
	router.GET("question/ans", auth.AuthorizeJWT(), controller.GetQuestionAnswer)
	router.GET("point/:id", auth.AuthorizeJWT(), controller.GetPoint)
	router.POST("question/", auth.AuthorizeJWT(), controller.PostQuestion)
	router.Run()
}
