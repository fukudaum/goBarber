import "reflect-metadata";
import AppError from "../../../shared/errors/AppErrors";
import { FakeUsersRepository } from  "../../users/repositories/fakes/FakeUsers.repository";
import { FakeAppointmentRepository } from "../repositories/fakes/FakeAppointment.repository";
import CreateAppointmentService from "./CreateAppointment.service";

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentRepository();
        const fakeUsersRepository = new FakeUsersRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository, fakeUsersRepository);

        const provider = await fakeUsersRepository.create({
            name: 'Provider Test',
            password: '123123',
            email: 'provider_teste@gmail.com'
        })

        if(provider?.id) {
            const appointment = await createAppointmentService.execute({
                date: new Date(),
                provider: provider.email,
            });

            expect(appointment).toHaveProperty('id');
        }
    });

    it('should not be able to create a new appointment because provider doesnt exists', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentRepository();
        const fakeUsersRepository = new FakeUsersRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository, fakeUsersRepository);

        expect(createAppointmentService.execute({
            date: new Date(),
            provider: 'provider_teste@gmail.com',
        })).rejects.toBeInstanceOf(AppError);;

    });

    it('should not be able to create a new appointment on the same time', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentRepository();
        const fakeUsersRepository = new FakeUsersRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository, fakeUsersRepository);

        const provider = await fakeUsersRepository.create({
            name: 'Provider Test',
            password: '123123',
            email: 'provider_teste@gmail.com'
        })

        if(provider?.id) {
            const date = new Date();
            await createAppointmentService.execute({
                date: date,
                provider: provider.email,
            });

            expect(createAppointmentService.execute({
                date: date,
                provider: provider.email,
            })).rejects.toBeInstanceOf(AppError);
        }
    });
});
