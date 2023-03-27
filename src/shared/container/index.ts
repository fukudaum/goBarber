import { container } from 'tsyringe';

import '../../modules/users/providers';
import '../container/provider';

import { PrismaAppointmentRepository } from 'modules/appointments/repositories/prisma/prismaAppointments.repository';
import { PrismaUserRepository } from 'modules/users/repositories/prisma/prismaUsers.repository';
import PrismaUserTokenRepository from 'modules/users/repositories/prisma/prismaUserToken.repository';

import { AppointmentsRepository } from 'modules/appointments/repositories/appointments.repository';
import { UsersRepository } from 'modules/users/repositories/users.repository';
import { UserTokenRepository } from 'modules/users/repositories/userToken.repository';


container.registerSingleton<AppointmentsRepository>('AppointmentsRepository', PrismaAppointmentRepository);

container.registerSingleton<UsersRepository>('UsersRepository', PrismaUserRepository);

container.registerSingleton<UserTokenRepository>('UserTokenRepository', PrismaUserTokenRepository);
