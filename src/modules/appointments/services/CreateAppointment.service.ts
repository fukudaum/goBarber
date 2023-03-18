import { startOfHour } from "date-fns";
import { UsersRepository } from "../../users/repositories/users.repository";
import AppError from "../../../shared/errors/AppErrors";
import { injectable, inject } from 'tsyringe';
import Appointment from "../entities/Appointment";
import { AppointmentsRepository } from "../repositories/appointments.repository";


interface Request {
    provider: string,
    date: Date
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: AppointmentsRepository,
        @inject('UsersRepository')
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
