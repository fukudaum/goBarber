import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/Appointments.repository";

interface Request {
    provider: string,
    date: Date
}

class CreateAppointmentService {
    constructor(private appointmentsRepository: AppointmentsRepository) {}

    public async execute({ provider, date }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(date);

        if(findAppointmentInSameDate) {
            throw Error('This appointment is already booked!');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        await this.appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
