const express = require("express");
const bodyParser = require("body-parser");
const {
    validateUser,
    validateLoginRequest,
} = require("./requestValidators/userValidators");
const userController = require("./controllers/userController");

const { validateUserTaskMapping,needTaskID,status } = require("./requestValidators/userTaskMappingValidators");

const authMiddleware= require("./requestValidators/authMiddleware");

const userTaskMappingController = require("./controllers/userTaskMappingController");

const app = express();
const PORT = 3000;


app.use(bodyParser.json());

//Registration Endpoint
app.post("/register", validateUser, userController.userRegistration);

//Login Endpoint and genrate the jwt token
app.post("/login", validateLoginRequest, userController.login);


//let save the user task with authentication and authorization with validation
app.post("/createUserTask",authMiddleware.authMiddleware, validateUserTaskMapping,userTaskMappingController.createUserTask);

// //let get all the task by userID with authentication and authorization
// app.get("/getAllUserTask",authMiddleware.authMiddleware,userTaskMappingController.getAllUserTask);

//let update the task
app.put("/updateUserTask",authMiddleware.authMiddleware,userTaskMappingController.updateUserTask);


//let delete the task
app.delete("/deleteUserTask",authMiddleware.authMiddleware,needTaskID,userTaskMappingController.deleteUserTask);

//let fetch all the task by the task status
app.post("/getAllTaskByStatus",authMiddleware.authMiddleware,userTaskMappingController.getAllTaskByStatus);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
