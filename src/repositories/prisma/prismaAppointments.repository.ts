import Appointment from "../../entities/Appointment";
import { prismaClient } from "../../database/prisma.service";
import { AppointmentsRepository } from "../appointments.repository";

export class PrismaAppointmentRepository implements AppointmentsRepository {
    async find(): Promise<Appointment[]> {
        return await prismaClient.appointment.findMany();
    }

    async findUnique(): Promise<Appointment> {
        throw new Error("Method not implemented.");
    }

    async findByDate(date: Date): Promise<Appointment | null> {
        return await prismaClient.appointment.findFirst({
            where: {
                date: date
            }
        })
    }

    async create(data: any): Promise<Appointment> {
        return await prismaClient.appointment.create(data);
    }

    async delete(): Promise<Appointment> {
        throw new Error("Method not implemented.");
    }

    async update(): Promise<Appointment> {
        throw new Error("Method not implemented.");
    }
}
