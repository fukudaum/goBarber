import { Router } from 'express';
import appointmentsRouter from 'modules/appointments/infra/http/routes/appointments.routes';
import passwordRouter from 'modules/users/infra/http/routes/password.routes';
import profileRouter from 'modules/users/infra/http/routes/profile.routes';
import sessionsRouter from 'modules/users/infra/http/routes/sessions.routes';
import usersRouter from 'modules/users/infra/http/routes/users.route';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
