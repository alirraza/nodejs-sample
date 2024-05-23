import { isEqual } from 'lodash';

import { GetUser, UpdateUser } from '../../services/db';

import { HTTP_CODES } from '../../routes/utils/constants';

const ResetPassword = async ({
  userId,
  password,
  cPassword
}) => {
  if (!isEqual(password, cPassword)) {
    const err = new Error();
    err.statusCode = HTTP_CODES.BAD_REQUEST;
    err.errorMessage = 'Password and Confirm Password Should Be Match';

    throw err;
  }

  const user = await GetUser({
    filterParams: { _id: userId }
  });

  if (user) {
    if (user.token === null) {
      const err = new Error();
      err.statusCode = HTTP_CODES.UNAUTHORIZED;
      err.statusMessage = 'Password Reset Link Has Already Been Used.';

      throw err;
    }

    await UpdateUser({
      filterParams: {
        user,
        updateFields: {
          password,
          token: null
        }
      }
    });
    return {
      message: 'Password Changed Successfully'
    };
  }

  const err = new Error();
  err.statusCode = HTTP_CODES.UNAUTHORIZED;
  err.errorMessage = 'Account Not Found';

  throw err;
};
export default ResetPassword;
