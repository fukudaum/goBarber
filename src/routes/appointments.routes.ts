import { Request, Response, Router } from "express";
import { parseISO } from "date-fns";
import CreateAppointmentService from "../service/CreateAppointment.service";
import Appointment from "../entities/Appointment";
import { AppDataSource } from "../data-source";

const appointmentsRouter = Router();

appointmentsRouter.get('/', (request: Request, response: Response) => {
    const appointmentsRepository = AppDataSource.getRepository(Appointment);
    const appointments = appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async(request: Request, response: Response) => {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();
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
