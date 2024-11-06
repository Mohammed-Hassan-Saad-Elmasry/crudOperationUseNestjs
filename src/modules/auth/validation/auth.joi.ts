import * as Joi from 'Joi';

export const singup = {
  body: Joi.object({
    username: Joi.string().min(6).max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8) // Password must be at least 8 characters long
      .max(30) // Maximum password length is 30 characters
      .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')) // Pattern ensures at least one lowercase, one uppercase, one number, and one special character
      .required() // Field is required
      .messages({
        'string.min': 'Password must be at least 8 characters long', // Message for failing the minimum length
        'string.max': 'Password cannot exceed 30 characters', // Message for exceeding the maximum length
        'string.pattern.base':
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character', // Message for failing the pattern check
        'any.required': 'Password is required', // Message when the field is missing
      }),
  }).required(),
};
