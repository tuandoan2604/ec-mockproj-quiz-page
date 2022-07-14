var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const customError = require('../ultilities/customErr')

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validatePassword: function (password) {
          if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))) {
            throw new Error('Minimum eight characters, at least one letter and one number');
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: false
    },

  }
  )

  User.beforeCreate(async function (data, option, next) {
    let user = await User.findOne({ where: { email: data.email } })
    if (user) {
      throw new Error("Duplicate email")
    } else {
      const salt = await bcrypt.genSaltSync(saltRounds);
      const hash = await bcrypt.hashSync(data.password, salt);
      data.password = hash
    }
  })
  return User
};

