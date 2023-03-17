import { FakeUsersRepository } from "@modules/users/repositories/fakes/FakeUsers.repository";
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
                provider: provider.id,
            });

            expect(appointment).toHaveProperty('id');
        }
    });

    // it('should not be able to create a new appointment on the same time', () => {

    // });
});
