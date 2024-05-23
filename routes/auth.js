import express from 'express';

import {
  SignIn,
  SignUp,
  ForgotPassword,
  ResetPassword
} from '../controllers/auth';

import { AuthenticateAuthToken, LoginCheck } from '../middlewares/auth';
import SchemaValidator from '../middlewares/schema-validator';

import { API_ENDPOINTS, HTTP_CODES } from './utils/constants';
import { CatchResponse, SuccessResponse } from './utils/helpers';

const validateRequest = SchemaValidator(true);

const router = express.Router();

router.post(
  API_ENDPOINTS.AUTH.SIGN_IN,
  validateRequest,
  LoginCheck,
  async (req, res) => {
    try {
      const {
        user: {
          _id: userId,
          email,
          name = ''
        }
      } = req;

      const err = new Error();
      if (req?.error) {
        err.statusCode = HTTP_CODES.UNAUTHORIZED;
        err.error = req.error;

        throw err;
      }

      const { token, message } = await SignIn({
        userId,
        email
      });

      SuccessResponse({
        res,
        message,
        token,
        user: {
          userId,
          email,
          name
        }
      });
    } catch (err) {
      CatchResponse({
        res,
        err
      });
    }
  }
);

router.post(
  API_ENDPOINTS.AUTH.SIGN_UP,
  validateRequest,
  async (req, res) => {
    try {
      const {
        name,
        email,
        password
      } = req.body;

      const { message } = await SignUp({
        name,
        email,
        password
      });

      SuccessResponse({ res, message });
    } catch (err) {
      CatchResponse({
        res,
        err
      });
    }
  }
);

router.post(
  API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
  validateRequest,
  async (req, res) => {
    try {
      const {
        email
      } = req.body;

      const {
        token,
        message,
        timeStamp
      } = await ForgotPassword({
        email
      });

      SuccessResponse({
        res,
        message,
        token,
        timeStamp
      });
    } catch (err) {
      CatchResponse({
        res,
        err
      });
    }
  }
);

router.post(
  API_ENDPOINTS.AUTH.RESET_PASSWORD,
  validateRequest,
  AuthenticateAuthToken,
  async (req, res) => {
    try {
      const {
        body: {
          password,
          cPassword
        }
      } = req;

      const { _id: userId } = req.user;

      const { message } = await ResetPassword({
        userId,
        password,
        cPassword
      });

      SuccessResponse({
        res,
        message
      });
    } catch (err) {
      CatchResponse({
        res,
        err
      });
    }
  }
);

export default router;
