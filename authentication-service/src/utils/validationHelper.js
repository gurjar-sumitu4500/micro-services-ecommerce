const { body, validationResult } = require('express-validator');
const validateRegistration = [
    // Validate name
    body('name').trim().notEmpty().withMessage('Name is required'),

    // Validate email
    body('email').trim().isEmail().withMessage('Invalid email'),

    // Validate password
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = {
    validateClient,
    validateRegistration
};
