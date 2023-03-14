import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.route';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
