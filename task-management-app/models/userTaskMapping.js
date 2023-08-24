const sequelize = require("../dbConfig/dbSetup");
const { Model, DataTypes } = require("sequelize");
const UserModel = require("./userModel");
const TaskMasterModel = require("./taskMasterModel");

const UserTaskMappingModel = sequelize.define(
    "usertaskmapping",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: true,
    
        },
        description:{
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
        taskMasterId:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
        userID:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references:{
                model: UserModel,
                key: 'id'
            }
        },
        status:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references:{
                model: TaskMasterModel,
                key: 'id'
            }
        },
       
    },{
        timestamps: false,
        tableName: "usertaskmapping",
    }
)


module.exports = UserTaskMappingModel;