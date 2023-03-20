import Appointment from "../../entities/Appointment";
import { AppointmentsRepository } from "../appointments.repository";
import { uuid } from 'uuidv4';

export interface CreateParams {
    date: Date,
    provider_id: string
}

export class FakeAppointmentRepository implements AppointmentsRepository {
    private appointments: Appointment[] = [];

    async find(): Promise<Appointment[]> {
        return this.appointments;
    }

    async findUnique(): Promise<Appointment> {
        throw new Error("Method not implemented.");
    }

    async findByDate(date: Date): Promise<Appointment | null> {
        const appointmentIndex = this.appointments.findIndex((item) => {
            return  new Date(item.date).getTime() === new Date(date).getTime()
        });

        if(appointmentIndex < 0) {
            return null;
        }

        return this.appointments[appointmentIndex];
    }

    async create({ date, provider_id }: CreateParams): Promise<Appointment> {
        let appointment: Appointment = {
            date,
            provider_id,
            id: uuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.appointments.push(appointment);
        console.log('create', this.appointments);
        return appointment;
    }

    async delete(): Promise<Appointment> {
        throw new Error("Method not implemented.");
    }

    async update(): Promise<Appointment> {
        throw new Error("Method not implemented.");
    }
}
