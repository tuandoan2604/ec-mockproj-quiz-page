module.exports = function(sequelize, DataTypes) {
    return sequelize.define('question', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question: {
        type: DataTypes.TEXT
      },
      answer: {
        type: DataTypes.TEXT
      }
    });
  };