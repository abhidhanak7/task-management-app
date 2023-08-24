const { model, DataTypes } = require("sequelize");
const sequelize = require("sequelize");
const { Sequelize } = require("sequelize-typescript");
require("dotenv").config();

const UserModel = require("../models/userModel")
const TaskMasterModel = require("../models/taskMasterModel");
const UserTaskMappingModel = require("../models/userTaskMapping");
const bcrypt = require("bcrypt");

const { Op } = require("sequelize");

//let store the user in our system
async function saveUser(data) {
    try {
        //let save displayname = firstname + lastname
        data = {
            ...data,
            displayName: data.firstName + " " + data.lastName,
        }
        let saveUser = await UserModel.create(data);
        return saveUser;
    } catch (error) {
        console.log("Error in saving the user====>>>", error);
    }
}

//let check the email if it is exist or not
async function validateEmail(email) {
    try {
        let findEmail = await UserModel.findOne({
            where: {
                userEmail: email,
                active: true,
            },
        });
        return findEmail;
    } catch (error) {
        console.log("Error in validating the email====>>>", error);
    }
}

//let check the password and compare it with the database
async function validatePassword(hashedPassword, password) {
    try {
        let comparePassword = await bcrypt.compare(password, hashedPassword);
        if (comparePassword == true)
            console.log("Compare====>>>", comparePassword);
        return comparePassword;
    } catch (error) {
        console.log("Error in comparing the password====>>>", error);
    }
}


//let validate the user by id if it is active or not
async function validateUser(userID) {
    try {
        let validateUserRequest = await UserModel.findOne({
            where: {
                id: userID,
                active: true,
            },
        });
        return validateUserRequest;
    } catch (error) {
        console.log("Error in validating the user====>>>", error);
    }
}

//let get all the task of user by id 
async function getAllTaskByUserID(userID) {
    try {
        let getAllTask = await UserTaskMappingModel.findAll({
            where: {
                userID: parseInt(userID),
                active: true
            },
            include: [{
                model: TaskMasterModel,
                // as: "TaskMasterModel",
                // attributes: ["status"]
            }]
        });
        return getAllTask;
    } catch (error) {
        console.log("Error in getting all the task by userID====>>>", error);
    }
}

module.exports = {
    saveUser,
    validateEmail,
    validatePassword,
    validateUser,
    getAllTaskByUserID
};
