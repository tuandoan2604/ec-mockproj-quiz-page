module.exports = function(sequelize, DataTypes) {
    return sequelize.define('quiz', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    });
  };