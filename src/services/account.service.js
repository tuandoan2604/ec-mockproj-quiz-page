const {User} = require('../config/db');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
let refreshTokens = []
const saltRounds = 10;
let createUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let name = data.name;
            let password = data.password;
            let email = data.email;
            if (name && password) {
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(password, salt);
                let user = await User.create({
                    name,
                    password: hash,
                    email: email,
                    role: "user"
                });

                resolve(user)
            }
        } catch (error) {
            reject(error)
        }
    })
    
}
module.exports = {
    createUser
}