import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';

import { LocalLoginStrategy, AuthenticationStrategy } from './auth';

const ApplyMiddlewares = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(passport.initialize());
  passport.use(LocalLoginStrategy);
  passport.use(AuthenticationStrategy);
};

export default ApplyMiddlewares;
