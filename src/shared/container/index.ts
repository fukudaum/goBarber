import { container } from 'tsyringe';

import { AppointmentsRepository } from '@modules/appointments/repositories/appointments.repository';
import { PrismaAppointmentRepository } from '@modules/appointments/repositories/prisma/prismaAppointments.repository';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { PrismaUserRepository } from '@modules/users/repositories/prisma/prismaUsers.repository';

container.registerSingleton<AppointmentsRepository>('AppointmentsRepository', PrismaAppointmentRepository);

container.registerSingleton<UsersRepository>('UsersRepository', PrismaUserRepository);
