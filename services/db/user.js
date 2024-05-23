import { User } from '../../models';

import { HTTP_CODES } from '../../routes/utils/constants';

const GetUser = async ({
  filterParams = {},
  selectParams = {}
}) => {
  const user = await User
    .findOne(filterParams, selectParams);
  return user;
};

const AddNewUser = async ({
  filterParams = {},
  selectParams = {}
}) => {
  const {
    name,
    email,
    password
  } = filterParams;

  const exitingUser = await User
    .findOne({ email }, selectParams);

  if (!exitingUser) {
    const newUser = new User({
      name,
      email,
      password,
      token: null
    });

    await newUser.save();

    return ({ message: 'New User Added Successfully' });
  }

  const err = new Error();
  err.statusCode = HTTP_CODES.CONFLICT_ERROR;
  err.errorMessage = 'Email Is Already Exists';

  throw err;
};

const UpdateUser = async ({
  filterParams = {}
}) => {
  const {
    user,
    updateFields
  } = filterParams;

  if (user && updateFields) {
    Object.keys(updateFields).forEach((field) => {
      user[field] = updateFields[field];
    });

    await user.save();

    return { message: 'User Updated Successfully' };
  }

  const err = new Error();
  err.statusCode = HTTP_CODES.BAD_REQUEST;
  err.errorMessage = 'Invalid parameters for user update';

  throw err;
};

export {
  GetUser,
  AddNewUser,
  UpdateUser
};
