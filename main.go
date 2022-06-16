package main

import (
	"Quiz/controller"

	"github.com/gin-gonic/gin"
)

func main() {

	//db, err := model.ConnectDataBase()

	router := gin.Default()

	router.GET("question/:number", controller.GetQuestion)
	router.POST("question/", controller.PostQuestion)

	router.Run()
}
