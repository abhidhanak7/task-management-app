const sequelize = require("../dbConfig/dbSetup");
const { Model, DataTypes } = require("sequelize");

const TaskMasterModel = sequelize.define(
    "taskMaster",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        modifiedDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    },
    {
        tableName: "taskMaster",
        timestamps: false,

    }
);

module.exports = TaskMasterModel;
