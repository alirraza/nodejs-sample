import {
  signUpSchema,
  signInSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from './auth';

import { API_ENDPOINTS } from '../routes/utils/constants';

const Schemas = {
  [API_ENDPOINTS.AUTH.SIGN_IN]: signInSchema,
  [API_ENDPOINTS.AUTH.SIGN_UP]: signUpSchema,
  [API_ENDPOINTS.AUTH.FORGOT_PASSWORD]: forgotPasswordSchema,
  [API_ENDPOINTS.AUTH.RESET_PASSWORD]: resetPasswordSchema
};

export default Schemas;
