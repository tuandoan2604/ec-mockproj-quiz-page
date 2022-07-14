const {User} = require('../config/db');

let refreshTokens = []
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
let createUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let name = data.name;
            let password = data.password;
            let email = data.email;
            if (name && password) {
                // const salt = bcrypt.genSaltSync(saltRounds);
                // const hash = bcrypt.hashSync(password, salt);
                let user = await User.create({
                    name,
                    password: password,
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