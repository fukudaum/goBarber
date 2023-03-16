import CreateAppointmentService from "@modules/appointments/services/CreateAppointment.service";
import { parseISO } from "date-fns";
import { Request, Response } from "express";
import { container } from 'tsyringe';

export default class AppointmentsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = container.resolve(CreateAppointmentService);

        const appointment = await createAppointmentService.execute({
            provider,
            date: parsedDate
        });
        return response.json(appointment);
    }
}
