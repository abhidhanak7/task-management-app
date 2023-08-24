const express = require('express');
const { body, validationResult } = require('express-validator');


const validateUser = [
    body('userEmail').isString().withMessage('email must be a string').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),

    body('password').isString().withMessage('password must be a string').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').notEmpty().withMessage('Password is required'),

    body('firstName').isString().withMessage('firstName must be a string').notEmpty().withMessage('firstName is required'),

    body('lastName').isString().withMessage('lastName must be a string').notEmpty().withMessage('lastName is required'),

]

const validateLoginRequest = [
    body('userEmail').isString().withMessage('email must be a string').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),

    body('password').isString().withMessage('password must be a string').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').notEmpty().withMessage('Password is required')
]

module.exports = {
    validateUser,
    validateLoginRequest
}