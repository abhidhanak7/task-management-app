const { model, DataTypes } = require("sequelize");
const sequelize = require("sequelize");
const { Sequelize } = require("sequelize-typescript");
require("dotenv").config();

const UserModel = require("../models/userModel")
const TaskMasterModel = require("../models/taskMasterModel");
const UserTaskMappingModel = require("../models/userTaskMapping");


//let create the userTask by assigning userID and taskMaster
async function createUserTaskMapping(data) {
    try {
        let createUserTask = await UserTaskMappingModel.create(data);
        return createUserTask;
    } catch (error) {
        console.log("Error in creating the userTask====>>>", error);
    }
}


//let get all the task by userID
async function getAllTaskByUserID(userID) {
    try {
        let sequalize = new Sequelize({
            dialect: process.env.dialect,
            host: process.env.host,
            port: 3306,
            username: 'root',
            password: process.env.password,
            database: process.env.database,
        });
        let result = await sequalize.query(
            "CALL getAllUserTask (:userID)",
            {
                replacements: {
                    userID: userID
                },
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((userdata) => {
            var userDetail = userdata[0];
            if (Object.keys(userdata[0]).length != 0) {
                let  taskDetails = Object.keys(userdata[0]);
                let task = []
                for (var i = 0; i < taskDetails.length; i++) {
                    task.push(userdata[0][i]);
                }

                return task;
            }
        });
            return result;
       
    } catch (error) {
        console.log("Error in getting all the task by userID====>>>", error);
    }
}


//let delete the task 
async function deleteTask(taskID,userID) {
    try {
        let deleteTask = await UserTaskMappingModel.update({
            active: false
        },{
            where: {
                id: taskID,
                userID: userID
            }
        });
        return deleteTask;
    } catch (error) {
        console.log("Error in deleting the task====>>>", error);
    }
}

//let update the task
async function updateTask(taskID,userID,data) {
    try {
        let updateTask = await UserTaskMappingModel.update(data,{
            where: {
                id: taskID,
                userID: userID
            }
        });
        return updateTask;
    } catch (error) {
        console.log("Error in updating the task====>>>", error);
    }
}

//let find the task by id
async function findTaskByID(taskID) {
    try {
        let findTask = await UserTaskMappingModel.findOne({
            where: {
                id: taskID,
                active: true
            }
        });
        return findTask;
    } catch (error) {
        console.log("Error in finding the task by id====>>>", error);
    }
}

//validate the task by the title if the title exist then do not create it 
async function validateDataifDuplicate(userTask) {
    try {
        let validateTask = await UserTaskMappingModel.findOne({
            where: {
                title:userTask?.title,
                userID: userTask?.userID,
                description: userTask?.description,
                active: true
            }
        });
        return validateTask;
    } catch (error) {
        console.log("Error in validating the task by title====>>>", error);
    }
}


//let get alll the task by the userId and status
async function getAllTaskByUserIDandTaskStatus(userID,status) {
    try {
        let sequalize = new Sequelize({
            dialect: process.env.dialect,
            host: process.env.host,
            port: 3306,
            username: 'root',
            password: process.env.password,
            database: process.env.database,
        });
        let result = await sequalize.query(
            "CALL taskFilter (:userID, :status)",
            {
                replacements: {
                    userID: userID,
                    status: status
                },
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((userdata) => {
            var userDetail = userdata[0];
            if (Object.keys(userdata[0]).length != 0) {
                let  taskDetails = Object.keys(userdata[0]);
                let task = []
                for (var i = 0; i < taskDetails.length; i++) {
                    task.push(userdata[0][i]);
                }

                return task;
            }
        });
            return result;
       
    } catch (error) {
        console.log("Error in getting all the task by userID====>>>", error);
    }
}


module.exports = {
    createUserTaskMapping,
    getAllTaskByUserID,
    deleteTask,
    updateTask,
    findTaskByID,
    validateDataifDuplicate,
    getAllTaskByUserIDandTaskStatus
}
