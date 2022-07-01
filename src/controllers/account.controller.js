const { JsonWebTokenError } = require('jsonwebtoken');
const {User} = require('../config/db');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

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
            let token = jwt.sign({_id : req.user._id},'minh',{expiresIn :'1d'})
            res.cookie("token",token,{maxAge: 24*60*60*10000});
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

module.exports ={
    signUpController,
    loginController,
 
   
}