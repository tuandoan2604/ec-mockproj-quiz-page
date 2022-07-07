const { JsonWebTokenError } = require('jsonwebtoken');
const {User} = require('../config/db');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
let refreshTokens = []
const saltRounds = 10;


let signUpController = async(req,res)=>{
    try {
        let name = req.body.name;
        let password = req.body.password;
        let email = req.body.email;
        if(name && password){
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
             let user1 =await User.create({
                name,
                password :hash,
                email:email,
                role: "user"
            });
            console.log(user1);

        } 
        let token = jwt.sign({_id: req.body._id},'minh');
        res.cookie("token",token,{maxAge: 60*60*10000});
        return res.status(200).json({
            message : "Sign Up success",
            error : false
        })
    }catch(error) {
        if(error){
            console.log(error);
            return res.status(400).json({
                message : "Sign Up fail",
                error: true
            })
        }
    }
}

let loginController = function(req,res){
    bcrypt.compare(req.body.password, req.user.password, function(err,result){
        if(err){
            return res.status(500).json({
                message : "loi sever",
                status: 500,
                error : true
            })
        }
        if(result){
            let accessToken = jwt.sign({_id : req.user._id},process.env.JWT_ACCESS_KEY,{expiresIn :'1d'})

            res.cookie("token",accessToken,{maxAge: 24*60*60*10000});
            let user = req.user 


            if(user.role === "admin"){
                return res.status(200).json({
                    message : "success admin login",
                    status: 200,
                    error : false,
                    user
                })

            }
            if(user.role === "user"){
                return res.status(200).json({
                    message : "success user login",
                    status: 200,
                    error : false,
                    user
                })
            }
                               
            }else{
                var message= "Username or password is invalid"
                res.json(message)
            }
        }
    )
}

let reqestRefreshToken = async(req,res)=>{
    const refreshToken = req.cookie.refreshToken
    if(!refreshToken){
        return res.status(401).json("Not Auth")
    }
    if(!refreshTokens.include(refreshToken)){
        return res.status(400).json("Not Valid")
    }
    jwt.verify(refreshToken,"minh",(err,user)=>{
        if(err){
            console.log(err)
        }
        refreshTokens = refreshTokens.filter((token)=> token !== refreshToken)
        let newRefreshToken = jwt.sign({_id : req.user._id},process.env.JWT_ACCESS_KEY,{expiresIn :'1d'})
        refreshTokens.push(newRefreshToken)
        res.cookie("RefreshToken",newRefreshToken,{maxAge: 24*60*60*10000});
        res.status(200).json("refresh token")
    })
}

module.exports ={
    signUpController,
    loginController,
    reqestRefreshToken
   
}