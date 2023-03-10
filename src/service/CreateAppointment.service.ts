import { startOfHour } from "date-fns";
import Appointment from "../entities/Appointment";
import { AppointmentsRepository } from "../repositories/appointments.repository";
import { UsersRepository } from "../repositories/users.repository";

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
            throw Error('Provider not found!');
        }

        if(findAppointmentInSameDate) {
            throw Error('This appointment is already booked!');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id: findUser.id,
            date });

        return appointment;
    }
}

export default CreateAppointmentService;
