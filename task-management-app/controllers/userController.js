const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    saveUser,
    validateEmail,
    validatePassword,
} = require("../service/userService");
const { validationResult } = require("express-validator");

async function userRegistration(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //let validate the email if it is exist or not
        let checkEmailIFExist = await validateEmail(req.body.userEmail);

        if (checkEmailIFExist) {
            return res.status(400).json({
                statusCode: 400,
                message: "Email already exist",
            });
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        //let store the user in our system
        let saveUseRequest = await saveUser(req.body);
        if (saveUseRequest != null) {
            return res.status(200).json({
                statusCode: 200,
                message: "User created successfully",
                data: saveUseRequest,
            });
        }
    } catch (error) {
        console.log("Error in saving the user====>>>", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while processing your request",
        });
    }
}

async function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //let validate the email if it is exist or not
        let checkEmailIFExist = await validateEmail(req.body.userEmail);

        if (checkEmailIFExist == null || checkEmailIFExist == undefined) {
            return res.status(401).json({
                statusCode: 401,
                message: "Incorrect username or password",
            });
        }

        //let comparing the password
        const validPassword = await validatePassword(
            checkEmailIFExist.password,
            req.body.password
        );
        if (validPassword == false) {
            return res.status(400).json({
                statusCode: 400,
                message: "Invalid Password!",
            });
        }

      
      
        //let genrate the jwt token
        const token = jwt.sign(
            {
                userID: checkEmailIFExist.id,
                userEmail: checkEmailIFExist.userEmail,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d'}
        );
        console.log("token====>>>", token);

        return res.status(200).json({
            statusCode: 200,
            message: "User logged in successfully",
            data: token,
        });
    } catch (error) {
        console.log("Error in login the user====>>>", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while processing your request",
        });
    }
}


module.exports = {
    userRegistration,
    login,
};
