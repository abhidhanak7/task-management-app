const {
    createUserTaskMapping,
    getAllTaskByUserID,
    deleteTask,
    updateTask,
    findTaskByID,
    validateDataifDuplicate,
    getAllTaskByUserIDandTaskStatus
} = require("../service/userTaskMapping");

const {
    saveUser,
    validateEmail,
    validatePassword,
    validateUser,
    // getAllTaskByUserID
} = require("../service/userService");

const { validateTaskMaster } = require("../service/taskMasterService");

const { validationResult } = require("express-validator");

//let create the userTask by assigning userID and taskMaster
async function createUserTask(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //validate the user by id if it is active or not
        let validateUserRequest = await validateUser(req.user.userID);
        if (validateUserRequest == null || validateUser == undefined) {
            return res.status(401).json({
                statusCode: 401,
                message: "User not found",
            });
        }

      
        //let verify the tasMaster if it is exist or not
        let verifyTaskMaster = await validateTaskMaster(req.body.status);
        if (verifyTaskMaster == null || verifyTaskMaster == undefined) {
            return res.status(401).json({
                statusCode: 401,
                message: "Task not found",
            });
        }

        //let assigning to the object to save
        let userTask = {
            userID: req.user.userID,
            status: req.body.status,
            title: req.body.title,
            description: req.body.description,
            createdBy: req.user.userID,
            modifiedBy: req.user.userID,
        };

          //let check the task if it is exist than do not create the task
          let checkTask = await validateDataifDuplicate(userTask);
          if(checkTask != null){
                return res.status(400).json({
                    statusCode: 400,
                    message: "Task already exist",
                });
          }

        //let save the user task
        let saveUserTask = await createUserTaskMapping(userTask);
        if (saveUserTask != null) {
            return res.status(200).json({
                statusCode: 200,
                message: "Task created successfully",
                data: saveUserTask,
            });
        }
    } catch (error) {
        console.log("Error in saving the user task====>>>", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while processing your request",
        });
    }
}

//let get all the task by userID
async function getAllUserTask(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //validate the user by id if it is active or not
        let validateUserRequest = await validateUser(req.user.userID);
        if (validateUserRequest == null || validateUserRequest == undefined) {
            return res.status(401).json({
                statusCode: 401,
                message: "User not found",
            });
        }

        //let get all the task by userID
        let getAllTask = await getAllTaskByUserID(req.user.userID);
        console.log("getAllTask====>>>", getAllTask);
        if (getAllTask == null) {
            return res.status(401).json({
                statusCode: 401,
                message: "Task not found",
                count: 0,
                data: [],
            });
        }

        return res.status(200).json({
            statusCode: 200,
            message: "Task fetched successfully",
            data: getAllTask,
            count: getAllTask.length,
        });
    } catch (error) {
        console.log("Error in saving the user task====>>>", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while processing your request",
        });
    }
}

//let delete the task
async function deleteUserTask(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //validate the user by id if it is active or not
        let validateUserRequest = await validateUser(req.user.userID);
        if (validateUserRequest == null || validateUser == undefined) {
            return res.status(401).json({
                statusCode: 401,
                message: "User not found",
            });
        }

        //let find the task if it is exist or not
        let findTask = await findTaskByID(req.body.taskID);
        if (findTask == null || findTask == undefined) {
            return res.status(400).json({
                statusCode: 400,
                message: "Task not found",
            });
        }

        //let delete the task
        let deleteTaskRequest = await deleteTask(
            req.body.taskID,
            req.user.userID
        );

        return res.status(200).json({
            statusCode: 200,

            message: "Task deleted successfully",
        });
    } catch (error) {
        console.log("Error in saving the user task====>>>", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while processing your request",
        });
    }
}

//let update the task
async function updateUserTask(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //validate the user by id if it is active or not
        let validateUserRequest = await validateUser(req.user.userID);
        if (validateUserRequest == null || validateUser == undefined) {
            return res.status(401).json({
                statusCode: 401,
                message: "User not found",
            });
        }

        //let find the task if it is exist or not
        let findTask = await findTaskByID(req.body.taskID);
        if (findTask == null || findTask == undefined) {
            return res.status(400).json({
                statusCode: 400,
                message: "Task not found",
            });
        }

        //let update the task by taskID and userID
        let updateTaskRequest = await updateTask(req.body.taskID, req.user.userID, req.body);

        return res.status(200).json({
            statusCode: 200,
            message: "Task updated successfully",
        });
    } catch (error) {
        console.log("Error in saving the user task====>>>", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while processing your request",
        });
    }
}

//let get all the task by the task status
async function getAllTaskByStatus(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //validate the user by id if it is active or not
        let validateUserRequest = await validateUser(req.user.userID);
        if (validateUserRequest == null || validateUserRequest == undefined) {
            return res.status(401).json({
                statusCode: 401,
                message: "User not found",
            });
        }

        //let get all the task by userID
        let getAllTask = await getAllTaskByUserIDandTaskStatus(req.user.userID,req.body.status);
        console.log("getAllTask====>>>", getAllTask);
        if (getAllTask == null) {
            return res.status(401).json({
                statusCode: 401,
                message: "Task not found",
                count: 0,
                data: [],
            });
        }

        return res.status(200).json({
            statusCode: 200,
            message: "Task fetched successfully",
            data: getAllTask,
            count: getAllTask.length,
        });


    } catch (error) {
        console.log("Error in saving the user task====>>>", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while processing your request",
        });
    }
}

module.exports = {
    createUserTask,
    getAllUserTask,
    deleteUserTask,
    updateUserTask,
    getAllTaskByStatus

};
