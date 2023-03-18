import { Request, Response, Router } from "express";
import { PrismaAppointmentRepository } from "modules/appointments/repositories/prisma/prismaAppointments.repository";
import ensureAuthenticated from "shared/infra/http/middleware/ensureAuthenticated";
import AppointmentsController from "../controllers/Appointments.controller";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

const appointmentsRepository = new PrismaAppointmentRepository();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async(request: Request, response: Response) => {
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
