import express from 'express';

import auth from './auth';

import { AuthenticateAuthToken } from '../middlewares/auth';

import { API_ENDPOINTS } from './utils/constants';

const router = express.Router();

router.use(API_ENDPOINTS.AUTH.INDEX, auth);

export default router;
