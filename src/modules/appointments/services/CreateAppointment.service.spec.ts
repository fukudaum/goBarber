import "reflect-metadata";
import AppError from "../../../shared/errors/AppErrors";
import { FakeUsersRepository } from  "../../users/repositories/fakes/FakeUsers.repository";
import { FakeAppointmentRepository } from "../repositories/fakes/FakeAppointment.repository";
import CreateAppointmentService from "./CreateAppointment.service";

let fakeAppointmentsRepository: FakeAppointmentRepository;
let fakeUsersRepository: FakeUsersRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentRepository();
        fakeUsersRepository = new FakeUsersRepository();
        createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository, fakeUsersRepository);
    })

    it('should be able to create a new appointment', async () => {
        const provider = await fakeUsersRepository.create({
            name: 'Provider Test',
            password: '123123',
            email: 'provider_teste@gmail.com'
        })

        if(provider?.id) {
            const appointment = await createAppointmentService.execute({
                date: new Date(),
                provider: provider.email,
                userId: provider.id
            });

            expect(appointment).toHaveProperty('id');
        }
    });

    it('should not be able to create a new appointment because provider doesnt exists', async () => {
        await expect(createAppointmentService.execute({
            date: new Date(),
            provider: 'provider_teste@gmail.com',
            userId: 'teste'
        })).rejects.toBeInstanceOf(AppError);;

    });

    it('should not be able to create a new appointment on the same time', async () => {
        const provider = await fakeUsersRepository.create({
            name: 'Provider Test',
            password: '123123',
            email: 'provider_teste@gmail.com'
        });

        const user = await fakeUsersRepository.create({
            name: 'Provider Test',
            password: '123123',
            email: 'provider_teste@gmail.com'
        });

        if(user.id) {
            if(provider?.id) {
                const date = new Date();
                await createAppointmentService.execute({
                    date: date,
                    provider: provider.email,
                    userId: user?.id
                });

                await expect(createAppointmentService.execute({
                    date: date,
                    provider: provider.email,
                    userId: user?.id
                })).rejects.toBeInstanceOf(AppError);
            }
        }
    });
});
