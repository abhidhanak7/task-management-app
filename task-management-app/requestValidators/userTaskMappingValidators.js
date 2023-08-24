const express = require('express');
const { body, validationResult } = require('express-validator');

const validateUserTaskMapping = [
    body('title').isString().withMessage('title must be a string').notEmpty().withMessage('title is required'),

    body('description').isString().withMessage('password must be a string').notEmpty().withMessage('description is required'),

    body('status').isNumeric().withMessage('status must be a number').notEmpty().withMessage('status is required'),
]

const needTaskID = [
    body('taskID').isNumeric().withMessage('taskID must be a number').notEmpty().withMessage('taskID is required'),

]

const status = [
    body('status').isNumeric().withMessage('status must be a number').notEmpty().withMessage('status is required'),
]


module.exports = {
    validateUserTaskMapping,
    needTaskID,
    status
}