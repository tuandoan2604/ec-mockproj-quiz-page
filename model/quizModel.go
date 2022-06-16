package model

import "github.com/jinzhu/gorm"

type User struct {
	Id       uint   `json:"id" gorm:"primary_key"`
	Name     string `json:"Name"`
	Password string `json:"Password"`
}

type Question struct {
	gorm.Model
	Id       int    `json:"id" gorm:"primary_key"`
	Question string `json:"Question" gorm:"primary_key"`
	Answer   string `json:"Answer"`
	Choice   string `json:"Choice"`
}

type UserAnswer struct {
	Id     uint   `json:"id" gorm:"primary_key"`
	Point  string `json:"Point"`
	Answer string `json:"Answer"`
}
