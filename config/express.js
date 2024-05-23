import express from 'express';

import ApplyMiddlewares from '../middlewares';

import router from '../routes';

const { PORT } = process.env;

const app = express();

ApplyMiddlewares(app);

app.use(router);

app.listen({ port: PORT }, () => {
  console.log(`app listening on port ${PORT}!`);
});

export default app;
