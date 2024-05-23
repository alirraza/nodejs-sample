import jwt from 'jsonwebtoken';
import LocalStrategy from 'passport-local';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { GetUser } from '../services/db';

const { HASHING_SECRET_KEY } = process.env;

const LoginCheck = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (!user) {
      req.error = info.error;
    } else {
      req.user = user;
    }
    next();
  })(req, res, next);
};

const GenerateToken = ({
  _id,
  email,
  expireTime
}) => {
  try {
    const token = jwt.sign({
      _id,
      email
    }, HASHING_SECRET_KEY, {
      expiresIn: expireTime
    });

    return token;
  } catch (err) {
    err.errorMessage = 'Error While Generating Token';

    throw err;
  }
};

const AuthenticateAuthToken = passport.authenticate('jwt', {
  session: false
});

const LocalLoginStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    try {
      const user = await GetUser({
        filterParams: { email }
      });
      if (!user) {
        return done(null, false, {
          error: 'Your Login Credentials Could Not Be Verified. Please Try Again.'
        });
      }

      const isValid = user.ValidatePassword(password);
      if (!isValid) {
        return done(null, false, {
          error: 'Your Login Credentials Could Not Be Verified. Please Try Again.'
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

const AuthenticationStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: HASHING_SECRET_KEY
  },
  async (jwtPayload, done) => {
    try {
      const user = await GetUser({
        filterParams: { _id: jwtPayload._id }
      });

      if (!user) {
        return done(null, false);
      }

      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (jwtPayload.exp && jwtPayload.exp < currentTimestamp) {
        return done(
          null,
          false,
          { message: 'Token has expired' }
        );
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
);

export {
  AuthenticationStrategy,
  AuthenticateAuthToken,
  GenerateToken,
  LoginCheck,
  LocalLoginStrategy
};
