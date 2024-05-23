import { GenerateToken } from '../../middlewares/auth';

import { HTTP_CODES } from '../../routes/utils/constants';

const SignIn = async ({ userId, email }) => {
  const token = GenerateToken({
    _id: userId,
    email,
    expireTime: '365d'
  });

  if (token) {
    return ({
      token,
      message: 'Sign In Successfully'
    });
  }

  const err = new Error();
  err.statusCode = HTTP_CODES.UNAUTHORIZED;
  err.errorMessage = 'Issue in token generation failed';

  throw err;
};

export default SignIn;
