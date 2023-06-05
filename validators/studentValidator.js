const { body, validationResult } = require('express-validator');
const checkForValidationErrors = require('../middlewares/checkForValidationErrors');

let studentValidators = [
    body('surname').isLength({ min: 3, max: 20 }).withMessage('Surname must be between 3 and 20 characters'),
    body('first_name').isLength({ min: 3, max: 20 }).withMessage('First name must be between 3 and 20 characters'),
    body('other_name').isLength({ min: 3, max: 20 }).withMessage('Other name must be between 3 and 20 characters'),
    body('dob').isBefore(new Date().toISOString().slice(10)).withMessage('Date of birth cannot be in the future'),
    body('date_joined').isAfter(new Date().toISOString().slice(10)).withMessage('Date of joining cannot be in the past'),
    body('disability').isAlpha().withMessage('Only alphabets are allowed'),
    body('phone').isMobilePhone('en-NG').withMessage('Invalid phone number'),
    body('gender').matches(/(Male|Female)/),
    body('email').isEmail(),
    body('password').isStrongPassword(),
    body('plan_id').isInt().withMessage('Plan must be selected from options given'),   
    checkForValidationErrors, 
]
module.exports = studentValidators