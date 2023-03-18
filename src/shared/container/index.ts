import { AppointmentsRepository } from 'modules/appointments/repositories/appointments.repository';
import { PrismaAppointmentRepository } from 'modules/appointments/repositories/prisma/prismaAppointments.repository';
import { PrismaUserRepository } from 'modules/users/repositories/prisma/prismaUsers.repository';
import { UsersRepository } from 'modules/users/repositories/users.repository';
import { container } from 'tsyringe';


container.registerSingleton<AppointmentsRepository>('AppointmentsRepository', PrismaAppointmentRepository);

container.registerSingleton<UsersRepository>('UsersRepository', PrismaUserRepository);
