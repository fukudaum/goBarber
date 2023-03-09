import { Request, Response, Router } from "express";
import { parseISO } from "date-fns";
import CreateAppointmentService from "../service/CreateAppointment.service";
import { PrismaAppointmentRepository } from "../repositories/prisma/prismaAppointments.repository";
import { PrismaUserRepository } from "../repositories/prisma/prismaUsers.repository";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

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

    const createAppointmentService = new CreateAppointmentService(appointmentsRepository, usersRepository);
    try {
        const appointment = await createAppointmentService.execute({
            provider,
            date: parsedDate
        });

        return response.json(appointment);
    } catch (error) {
        return response.status(400).json({
            error
        });
    }
});

export default appointmentsRouter;
