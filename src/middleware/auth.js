let {User} = require('../config/db');
var jwt = require('jsonwebtoken');

let isEmail = async (req,res,next)=>{
    try {
        let user = req.body.email;
        await User.findOne({
             where: { email: user } 
        }).then(user=>{
            if(!user){
                next();
            }else{
                return res.status(400).json({
                    message : "Email already exists",
                    status: 400,
                    error : true,
                })
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "loi sever",
            status: 500,
            error : true
        })

    }
}

let checkLogin = async (req,res,next)=>{
    try {
        let user = req.body.email;
        await User.findOne({
            where: { email: user }
        })
        .then(user=>{
            if(!user){
                var message= "Username or password is invalid"
                res.render("login",{message:message}) 
            }else{
                req.user = user

                next();
            }
        }) 
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "loi sever",
            status: 500,
            error : true
        })
    }
}


let checkAdmin = (req,res,next)=>{
    if (req.user.role === "admin"){
        next()
    }else{
        return res.status(400).json({
            message : "no permission",
            status: 400,
            error : true,
        })
    }
}
let getUserById = function getUserById(id){
    return User.findByPk({where :{id:id}})
}
let checkAuth = async (req,res,next)=>{
    try {
        var token = req.cookies.token || req.body.token
        let decodeAccount = jwt.verify(token,process.env.JWT_ACCESS_KEY)
        let user = await getUserById(decodeAccount.id)
        console.log(user)
        if(user){
            req.user = user;
        console.log("hello user ", user)

            next();
        }else{
            return res.status(400).json({
                message : "tk k ton tai",
                status: 400,
                error : true,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "hay dang nhap",
            status: 500,
            error : true
        })
    }
}

module.exports ={
    isEmail,
    checkLogin,
    checkAdmin,
    checkAuth

}