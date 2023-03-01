import { Request, Response, Router } from "express";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../repositories/Appointments.repository";
import CreateAppointmentService from "../service/CreateAppointment.service";

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request: Request, response: Response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request: Request, response: Response) => {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(appointmentsRepository);
    try {
        const appointment = createAppointmentService.execute({
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
