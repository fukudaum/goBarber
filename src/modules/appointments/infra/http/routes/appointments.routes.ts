import { Request, Response, Router } from "express";
import { parseISO } from "date-fns";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointment.service";
import { PrismaAppointmentRepository } from "@modules/appointments/repositories/prisma/prismaAppointments.repository";
import { PrismaUserRepository } from "@modules/users/repositories/prisma/prismaUsers.repository";
import ensureAuthenticated from "@shared/infra/http/middleware/ensureAuthenticated";
import { container } from 'tsyringe';

const appointmentsRouter = Router();
const appointmentsRepository = new PrismaAppointmentRepository();
const usersRepository = new PrismaUserRepository();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async(request: Request, response: Response) => {
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async(request: Request, response: Response) => {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(CreateAppointmentService);

    const appointment = await createAppointmentService.execute({
        provider,
        date: parsedDate
    });
    return response.json(appointment);
});

export default appointmentsRouter;
