import { startOfHour } from "date-fns";
import { AppDataSource } from "../data-source";
import Appointment from "../models/Appointment";

interface Request {
    provider: string,
    date: Date
}

class CreateAppointmentService {
    constructor() {}

    public async execute({ provider, date }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date);
        const appointmentsRepository = AppDataSource.getRepository(Appointment);
        const findAppointmentInSameDate = await appointmentsRepository.findOne({
            where: {
                date
            }
        });

        if(findAppointmentInSameDate) {
            throw Error('This appointment is already booked!');
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
