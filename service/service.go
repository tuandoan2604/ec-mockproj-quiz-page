package service

import (
	"Quiz/auth"

	"github.com/gin-gonic/gin"
)

type LoginController interface {
	Login(ctx *gin.Context) (string, string)
}

type Token struct {
	token   string
	refresh string
}
type loginController struct {
	jWtService auth.JWTService
}

func LoginHandler(jWtService auth.JWTService) LoginController {
	return &loginController{
		jWtService: jWtService,
	}
}

/*
func (controller *loginController) Login(c *gin.Context) string {
	//var info auth.TokenInfo
	username := c.PostForm("username")
	token := controller.jWtService.GenerateToken(username, true)

	return token
} */
func (controller *loginController) Login(c *gin.Context) (string, string) {
	username := c.PostForm("username")
	token := controller.jWtService.GenerateToken(username, true)
	refresh := controller.jWtService.GenerateRefreshToken(username, true)
	return token, refresh
}
