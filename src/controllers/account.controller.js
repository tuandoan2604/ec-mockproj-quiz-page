const { JsonWebTokenError } = require('jsonwebtoken');
const { User } = require('../config/db');
var cookie = require('cookie');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const {customError} = require('../ultilities/customErr')
const errHandel = require('../middleware/errorHandle')
let { createUser } = require('../services/account.service')

let signUpController = errHandel(async (req, res , next) => {
    
        
        let createNewUser = await createUser(req.body)
        if (createNewUser) {
            let token = jwt.sign({ id: req.body.id }, process.env.JWT_ACCESS_KEY);
            res.cookie("token", token, { maxAge: 60 * 60 * 10000 });
            return res.status(200).json({
                message: "Sign Up success",
                error: false
            })   
        
        
         }else{
             const error = new customError('Sign Up fail',400)
                 return res.status(error.statusCode).json({
                     message: error.message,
                     error: true
                 })

        }
        
    
})

let loginController = errHandel (function (req, res) {
    bcrypt.compare(req.body.password, req.user.password, function (err, result) {
        if (err) {
            const error = new customError('loi sever',500)
            return res.status(error.statusCode).json({
                message: error.message,
                error: true
            })
        }
        if (result) {
            let accessToken = jwt.sign({ id: req.user.id }, process.env.JWT_ACCESS_KEY, { expiresIn: '1d' })
            refreshTokens.push(accessToken)
            res.cookie("token", accessToken, { maxAge: 24 * 60 * 60 * 10000 });
            console.log(accessToken)
            let user = req.user


            if (user.role === "admin") {
                return res.status(200).json({
                    message: "success admin login",
                    status: 200,
                    error: false,
                    user
                })

            }
            if (user.role === "user") {
                return res.status(200).json({
                    message: "success user login",
                    status: 200,
                    error: false,
                    user
                })
            }

        } else {
            const error = new customError('Username or password is invalid',400)
            return res.status(error.statusCode).json({
                message: error.message,
                error: true
            })
        }
    }
    )
})
let refreshTokens = []

let reqestRefreshToken = errHandel( async (req, res) => {
    const refreshToken = req.cookies.token || req.body.token 
    if (!refreshToken) {
        return res.status(401).json("Not Auth")
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(400).json("Not Valid")
    }
    let decodeAccount = jwt.verify(refreshToken, process.env.JWT_ACCESS_KEY)
        let user = await User.findByPk(decodeAccount.id)
        if (user) {
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            let newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_KEY, { expiresIn: '1d' })
            refreshTokens.push(newRefreshToken)
            res.cookie("RefreshToken", newRefreshToken, { maxAge: 24 * 60 * 60 * 10000 });
            res.status(200).json("refresh token")
           
        }else{
            const error = new customError('tk k ton tai',400)
            return res.status(error.statusCode).json({
                message: error.message,
                error: true
            })
        
        }
        
    
})

module.exports = {
    signUpController,
    loginController,
    reqestRefreshToken

}