import { Request, Response, Router } from "express";
import { parseISO } from "date-fns";
import { AppDataSource } from "../database/app-data-source";
import AppointmentsRepository from "../repositories/Appointments.repository";
import CreateAppointmentService from "../service/CreateAppointment.service";

const appointmentsRouter = Router();

appointmentsRouter.get('/', (request: Request, response: Response) => {
    const appointmentsRepository = AppDataSource.getRepository(AppointmentsRepository);
    const appointments = appointmentsRepository.find();

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
