import { Router } from 'express';
import appointmentsRouter from './appointments.routes'
import sessionsRouter from './sessions.routes';
import usersRouter from './users.route';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
