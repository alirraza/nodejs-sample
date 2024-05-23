import Joi from 'joi';

import {
  PASSWORD_PATTERN,
  PASSWORD_PATTERN_ERROR,
  STRING_REQUIRED_ERROR,
  OBJECT_REQUIRED_ERROR
} from '../routes/utils/constants';

const validateName = Joi
  .string()
  .required()
  .messages(STRING_REQUIRED_ERROR)
  .label('Name');

const validateEmail = Joi
  .string()
  .required()
  .email()
  .messages(STRING_REQUIRED_ERROR)
  .label('Email');

const validatePassword = Joi
  .string()
  .min(8)
  .required()
  .pattern(PASSWORD_PATTERN)
  .messages({ ...STRING_REQUIRED_ERROR, ...PASSWORD_PATTERN_ERROR })
  .label('Password');

const signUpSchema = Joi.object({
  name: validateName,
  email: validateEmail,
  password: validatePassword
})
  .required()
  .messages(OBJECT_REQUIRED_ERROR)
  .label('Body');

const signInSchema = Joi.object({
  email: validateEmail,
  password: validatePassword
})
  .required()
  .messages(OBJECT_REQUIRED_ERROR)
  .label('Body');

const forgotPasswordSchema = Joi.object({
  email: validateEmail
})
  .required()
  .messages(OBJECT_REQUIRED_ERROR)
  .label('Body');

const resetPasswordSchema = Joi.object({
  password: validatePassword,
  cPassword: validatePassword
});

export {
  signUpSchema,
  signInSchema,
  forgotPasswordSchema,
  resetPasswordSchema
};
