import { AddNewUser } from '../../services/db';

const SignUp = async ({
  name,
  email,
  password
}) => {
  const message = await AddNewUser({
    filterParams: {
      name,
      email,
      password
    }
  });

  return message;
};

export default SignUp;
