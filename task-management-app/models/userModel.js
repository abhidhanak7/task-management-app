const sequelize = require("../dbConfig/dbSetup");
const { Model, DataTypes } = require("sequelize");
const UserTaskMappingModel = require("./userTaskMapping");
const TaskMasterModel = require("./taskMasterModel");

const UserModel = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        userEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        displayName: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        createdDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        createdBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        modifiedDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        modifiedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    },
    {
        tableName: "user",
        timestamps: false,
    }
);


UserModel.hasMany(UserTaskMappingModel)
UserTaskMappingModel.belongsTo(UserModel)

TaskMasterModel.hasMany(UserTaskMappingModel)
UserTaskMappingModel.belongsTo(TaskMasterModel)




module.exports = UserModel;