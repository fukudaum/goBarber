import { container } from 'tsyringe';

import '../../modules/users/providers';
import '../container/provider';

import { PrismaAppointmentRepository } from 'modules/appointments/repositories/prisma/prismaAppointments.repository';
import { PrismaUserRepository } from 'modules/users/repositories/prisma/prismaUsers.repository';

import { AppointmentsRepository } from 'modules/appointments/repositories/appointments.repository';
import { UsersRepository } from 'modules/users/repositories/users.repository';


container.registerSingleton<AppointmentsRepository>('AppointmentsRepository', PrismaAppointmentRepository);

container.registerSingleton<UsersRepository>('UsersRepository', PrismaUserRepository);
