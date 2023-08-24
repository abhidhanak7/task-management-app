const { model, DataTypes } = require("sequelize");
const sequelize = require("sequelize");
const { Sequelize } = require("sequelize-typescript");
require("dotenv").config();

const UserModel = require("../models/userModel")
const TaskMasterModel = require("../models/taskMasterModel");
const UserTaskMappingModel = require("../models/userTaskMapping");


//let check the taskMaster if it is exist or not
async function validateTaskMaster(status) {
    try {
        let validateTaskMaster = await TaskMasterModel.findOne({
            where: {
                id: status,
                active: true
            }
        });
        return validateTaskMaster;
    } catch (error) {
        console.log("Error in validating the taskMaster====>>>", error);
    }
}

module.exports = {
    validateTaskMaster
}