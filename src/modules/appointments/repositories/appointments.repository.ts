import Appointment from "../entities/Appointment";


export interface AppointmentsRepository {
    find(): Promise<Appointment[]>;
    findUnique(): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | null>;
    create(data: any): Promise<Appointment>;
    delete(): Promise<Appointment>;
    update(): Promise<Appointment>;
}

