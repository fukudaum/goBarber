import { parseISO } from "date-fns";
import { Request, Response } from "express";
import CreateAppointmentService from "modules/appointments/services/CreateAppointment.service";
import { container } from 'tsyringe';

export default class AppointmentsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { provider, date } = request.body;
        let user_id = request.user.id;
        const parsedDate = parseISO(date);

        const createAppointmentService = container.resolve(CreateAppointmentService);

        const appointment = await createAppointmentService.execute({
            provider,
            date: parsedDate,
            userId: user_id
        });
        return response.json(appointment);
    }
}
