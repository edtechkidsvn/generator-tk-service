import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import athn from './api/controllers/authn';
import authz from './api/controllers/authz';

export default function routes(app: Application): void {
  app.use(athn.check);
  app.use(authz.check);
  app.use('<%= apiRoot %>/examples', examplesRouter);
};