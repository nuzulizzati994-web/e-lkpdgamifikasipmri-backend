const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Progress = sequelize.define(
  "Progress",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    point: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    stage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    tableName: "progress",
    timestamps: true,
  }
);

Progress.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', as: 'users' })

module.exports = Progress;
