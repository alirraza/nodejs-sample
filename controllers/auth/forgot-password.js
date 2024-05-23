import { GetUser, UpdateUser } from '../../services/db';

import { GenerateToken } from '../../middlewares/auth';

import { HTTP_CODES } from '../../routes/utils/constants';

import { sendEmail } from '../../utils/send-email';

const ForgotPassword = async ({ email }) => {
  const user = await GetUser({
    filterParams: { email }
  });

  if (!user) {
    const err = new Error();
    err.statusCode = HTTP_CODES.UNAUTHORIZED;
    err.errorMessage = 'Account Not Found';
    throw err;
  }

  const {
    _id,
    name
  } = user;

  const token = await GenerateToken({
    _id,
    email,
    expireTime: '1h'
  });

  await UpdateUser({
    filterParams: {
      user,
      updateFields: { token }
    }
  });

  await sendEmail(
    email,
    'Password Recovery',
    'forgotPassword',
    name,
    token
  );

  return ({
    message: 'Token Sent To Your Email Successfully',
    token
  });
};

export default ForgotPassword;
