import { startOfHour } from "date-fns";
import Appointment from "@modules/appointments/entities/Appointment";
import AppError from "@shared/errors/AppErrors";
import { AppointmentsRepository } from "@modules/appointments/repositories/appointments.repository";
import { UsersRepository } from "@modules/users/repositories/users.repository";

interface Request {
    provider: string,
    date: Date
}

class CreateAppointmentService {
    constructor(private appointmentsRepository: AppointmentsRepository,
        private usersRepository: UsersRepository) {}

    public async execute({ provider, date }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        const findUser = await this.usersRepository.findByEmail(provider);

        if(!findUser) {
            throw new AppError('Provider not found!');
        }

        if(findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked!');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id: findUser.id,
            date });

        return appointment;
    }
}

export default CreateAppointmentService;
